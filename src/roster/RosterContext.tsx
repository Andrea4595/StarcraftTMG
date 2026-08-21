import { createContext, useContext, useEffect, useReducer, useRef, type ReactNode } from 'react'
import { collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore'
import type { Roster, RosterUnitEntry } from '../types'
import { makeId } from './makeId'
import { useAuth } from '../AuthContext'
import { db } from '../firebase'

const STORAGE_KEY = 'tmg-roster-builder-state'

function createEmptyRoster(name: string): Roster {
  return {
    id: makeId(),
    name,
    raceId: null,
    factionCardId: null,
    mineralCap: 2000,
    tacticalCardIds: [],
    units: [],
    favoriteAbilities: [],
  }
}

type Action =
  | { type: 'createRoster'; name: string }
  | { type: 'deleteRoster'; rosterId: string }
  | { type: 'renameRoster'; rosterId: string; name: string }
  | { type: 'selectRoster'; rosterId: string }
  | { type: 'setRosterRace'; rosterId: string; raceId: string }
  | { type: 'setFactionCard'; rosterId: string; factionCardId: string | null }
  | { type: 'setMineralCap'; rosterId: string; mineralCap: number }
  | { type: 'addTacticalCard'; rosterId: string; cardId: string }
  | { type: 'removeTacticalCard'; rosterId: string; cardId: string }
  | { type: 'addUnitEntry'; rosterId: string; unitId: string; squadTierIndex: number; id: string }
  | { type: 'removeUnitEntry'; rosterId: string; entryId: string }
  | { type: 'moveUnitEntry'; rosterId: string; entryId: string; direction: 'up' | 'down' }
  | { type: 'setUnitEntrySquadTier'; rosterId: string; entryId: string; squadTierIndex: number }
  | {
      type: 'toggleUnitUpgrade'
      rosterId: string
      entryId: string
      upgradeIndex: number
      /** 이 업그레이드를 켤 때 함께 꺼야 하는 다른 업그레이드 인덱스들 (같은 무기를 대체하는 상호 배타 업그레이드) */
      exclusiveWith?: number[]
    }
  | { type: 'toggleFavoriteAbility'; rosterId: string; sourceId: string; abilityId: string }
  | { type: 'applyCloudChanges'; changes: CloudChange[] }

/** Firestore users/{uid}/rosters 컬렉션 구독에서 오는 문서 단위 변경 사항 */
interface CloudChange {
  docId: string
  type: 'added' | 'modified' | 'removed'
  roster?: Roster
}

interface State {
  rosters: Roster[]
  activeRosterId: string | null
}

const emptyState: State = { rosters: [], activeRosterId: null }

/**
 * 이전 버전(카드/능력 name이 곧 식별자였던 시절)에 저장된 로스터를 새 스키마로 옮긴다.
 * 그때의 name 문자열은 지금의 id 값과 동일하므로, 필드 이름만 바꿔주면 된다.
 */
function migrateLegacyRoster(r: Record<string, unknown>): Roster {
  const legacyUnits = Array.isArray(r.units) ? (r.units as Record<string, unknown>[]) : []
  const legacyFavorites = Array.isArray(r.favoriteAbilities) ? (r.favoriteAbilities as Record<string, unknown>[]) : []
  return {
    id: r.id as string,
    name: r.name as string,
    raceId: (r.raceId as string | null) ?? null,
    factionCardId: ((r.factionCardId ?? r.factionCardName) as string | null) ?? null,
    mineralCap: r.mineralCap as number,
    tacticalCardIds: (r.tacticalCardIds as string[] | undefined) ?? (r.tacticalCardNames as string[] | undefined) ?? [],
    units: legacyUnits.map((u) => ({
      id: u.id as string,
      unitId: (u.unitId ?? u.unitName) as string,
      squadTierIndex: u.squadTierIndex as number,
      upgradeIndexes: u.upgradeIndexes as number[],
    })),
    favoriteAbilities: legacyFavorites.map((f) => ({
      sourceId: (f.sourceId ?? f.source) as string,
      abilityId: (f.abilityId ?? f.name) as string,
    })),
  }
}

/** localStorage에 저장된 이전 상태를 불러온다. 없거나 손상됐으면 빈 상태로 시작한다 */
function loadState(): State {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyState
    const parsed = JSON.parse(raw)
    if (!parsed || !Array.isArray(parsed.rosters)) return emptyState
    const rosters: Roster[] = parsed.rosters.map((r: Record<string, unknown>) => migrateLegacyRoster(r))
    return { rosters, activeRosterId: parsed.activeRosterId ?? null }
  } catch {
    return emptyState
  }
}

function mapRoster(state: State, rosterId: string, fn: (r: Roster) => Roster): State {
  return { ...state, rosters: state.rosters.map((r) => (r.id === rosterId ? fn(r) : r)) }
}

function mapUnitEntry(roster: Roster, entryId: string, fn: (e: RosterUnitEntry) => RosterUnitEntry): Roster {
  return { ...roster, units: roster.units.map((e) => (e.id === entryId ? fn(e) : e)) }
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'createRoster': {
      const roster = createEmptyRoster(action.name)
      return { rosters: [...state.rosters, roster], activeRosterId: roster.id }
    }
    case 'deleteRoster': {
      const rosters = state.rosters.filter((r) => r.id !== action.rosterId)
      const activeRosterId =
        state.activeRosterId === action.rosterId ? (rosters[0]?.id ?? null) : state.activeRosterId
      return { rosters, activeRosterId }
    }
    case 'renameRoster':
      return mapRoster(state, action.rosterId, (r) => ({ ...r, name: action.name }))
    case 'selectRoster':
      return { ...state, activeRosterId: action.rosterId }
    case 'setRosterRace':
      // 종족이 바뀌면 이전 종족 풀에 속했던 팩션 카드/택티컬 카드/유닛 선택은 전부 무효화된다
      return mapRoster(state, action.rosterId, (r) => ({
        ...r,
        raceId: action.raceId,
        factionCardId: null,
        tacticalCardIds: [],
        units: [],
      }))
    case 'setFactionCard':
      return mapRoster(state, action.rosterId, (r) => ({ ...r, factionCardId: action.factionCardId }))
    case 'setMineralCap':
      return mapRoster(state, action.rosterId, (r) => ({ ...r, mineralCap: action.mineralCap }))
    case 'addTacticalCard':
      return mapRoster(state, action.rosterId, (r) => ({
        ...r,
        tacticalCardIds: [...r.tacticalCardIds, action.cardId],
      }))
    case 'removeTacticalCard':
      return mapRoster(state, action.rosterId, (r) => {
        const idx = r.tacticalCardIds.indexOf(action.cardId)
        if (idx === -1) return r
        const tacticalCardIds = [...r.tacticalCardIds]
        tacticalCardIds.splice(idx, 1)
        return { ...r, tacticalCardIds }
      })
    case 'addUnitEntry':
      return mapRoster(state, action.rosterId, (r) => ({
        ...r,
        units: [
          ...r.units,
          {
            id: action.id,
            unitId: action.unitId,
            squadTierIndex: action.squadTierIndex,
            upgradeIndexes: [],
          },
        ],
      }))
    case 'removeUnitEntry':
      return mapRoster(state, action.rosterId, (r) => ({
        ...r,
        units: r.units.filter((e) => e.id !== action.entryId),
      }))
    case 'moveUnitEntry':
      return mapRoster(state, action.rosterId, (r) => {
        const idx = r.units.findIndex((e) => e.id === action.entryId)
        const swapIdx = action.direction === 'up' ? idx - 1 : idx + 1
        if (idx === -1 || swapIdx < 0 || swapIdx >= r.units.length) return r
        const units = [...r.units]
        ;[units[idx], units[swapIdx]] = [units[swapIdx], units[idx]]
        return { ...r, units }
      })
    case 'setUnitEntrySquadTier':
      return mapRoster(state, action.rosterId, (r) =>
        mapUnitEntry(r, action.entryId, (e) => ({ ...e, squadTierIndex: action.squadTierIndex })),
      )
    case 'toggleUnitUpgrade':
      return mapRoster(state, action.rosterId, (r) =>
        mapUnitEntry(r, action.entryId, (e) => {
          if (e.upgradeIndexes.includes(action.upgradeIndex)) {
            return { ...e, upgradeIndexes: e.upgradeIndexes.filter((i) => i !== action.upgradeIndex) }
          }
          // 같은 무기를 대체하는 다른 업그레이드가 켜져 있었다면, 이 업그레이드를 켜는 순간 그것들은 꺼진다
          const exclusiveWith = action.exclusiveWith ?? []
          return {
            ...e,
            // 활성화한 순서가 아니라 유닛 카드에 나열된 순서(index 오름차순)로 정렬해 둔다
            upgradeIndexes: [
              ...e.upgradeIndexes.filter((i) => !exclusiveWith.includes(i)),
              action.upgradeIndex,
            ].sort((a, b) => a - b),
          }
        }),
      )
    case 'toggleFavoriteAbility':
      return mapRoster(state, action.rosterId, (r) => {
        const exists = r.favoriteAbilities.some(
          (f) => f.sourceId === action.sourceId && f.abilityId === action.abilityId,
        )
        return {
          ...r,
          favoriteAbilities: exists
            ? r.favoriteAbilities.filter((f) => !(f.sourceId === action.sourceId && f.abilityId === action.abilityId))
            : [...r.favoriteAbilities, { sourceId: action.sourceId, abilityId: action.abilityId }],
        }
      })
    case 'applyCloudChanges': {
      let rosters = state.rosters
      let changed = false
      for (const c of action.changes) {
        if (c.type === 'removed') {
          if (rosters.some((r) => r.id === c.docId)) {
            rosters = rosters.filter((r) => r.id !== c.docId)
            changed = true
          }
        } else if (c.roster) {
          const idx = rosters.findIndex((r) => r.id === c.docId)
          if (idx === -1) {
            rosters = [...rosters, c.roster]
            changed = true
          } else if (JSON.stringify(rosters[idx]) !== JSON.stringify(c.roster)) {
            rosters = rosters.map((r, i) => (i === idx ? c.roster! : r))
            changed = true
          }
        }
      }
      // 내용이 실제로 안 바뀌었으면 이전 state를 그대로 반환한다. 그래야 로컬 편집 -> Firestore 업로드
      // -> 동일한 내용의 onSnapshot 콜백 -> 다시 dispatch로 이어지는 흐름이 여기서 끊긴다 (무한 루프 방지)
      if (!changed) return state
      const activeRosterId = state.activeRosterId ?? rosters[0]?.id ?? null
      return { rosters, activeRosterId }
    }
    default:
      return state
  }
}

interface RosterStore extends State {
  activeRoster: Roster | undefined
  createRoster: (name: string) => void
  deleteRoster: (rosterId: string) => void
  renameRoster: (rosterId: string, name: string) => void
  selectRoster: (rosterId: string) => void
  setRosterRace: (rosterId: string, raceId: string) => void
  setFactionCard: (rosterId: string, factionCardId: string | null) => void
  setMineralCap: (rosterId: string, mineralCap: number) => void
  addTacticalCard: (rosterId: string, cardId: string) => void
  removeTacticalCard: (rosterId: string, cardId: string) => void
  addUnitEntry: (rosterId: string, unitId: string, squadTierIndex: number, id: string) => void
  removeUnitEntry: (rosterId: string, entryId: string) => void
  moveUnitEntry: (rosterId: string, entryId: string, direction: 'up' | 'down') => void
  setUnitEntrySquadTier: (rosterId: string, entryId: string, squadTierIndex: number) => void
  toggleUnitUpgrade: (rosterId: string, entryId: string, upgradeIndex: number, exclusiveWith?: number[]) => void
  toggleFavoriteAbility: (rosterId: string, sourceId: string, abilityId: string) => void
}

const RosterStoreContext = createContext<RosterStore | null>(null)

export function RosterProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState)
  const { user } = useAuth()

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // 저장 공간이 꽉 찼거나(예: 시크릿 모드) 접근이 막힌 경우, 앱 동작에는 지장이 없으므로 조용히 무시한다
    }
  }, [state])

  // 로그인 중일 때만 Firestore users/{uid}/rosters 컬렉션을 구독한다. 로그아웃 상태에서는 이 effect가
  // 아무 일도 하지 않으므로, 로그인 안 한 사용자는 지금까지와 100% 동일하게 localStorage만 쓰는 셈이다.
  // docChanges()는 마지막 스냅샷 이후 무엇이 추가/수정/삭제됐는지만 알려줘서, 다른 기기에서의 삭제가
  // 자동으로 전파되고 아직 한 번도 업로드 안 한 로컬 전용 로스터는 애초에 여기 안 잡혀 안전하다.
  useEffect(() => {
    if (!user) return
    const colRef = collection(db, 'users', user.uid, 'rosters')
    const unsub = onSnapshot(
      colRef,
      (snap) => {
        const changes: CloudChange[] = snap.docChanges().map((c) => ({
          docId: c.doc.id,
          type: c.type,
          roster: c.type === 'removed' ? undefined : (c.doc.data() as Roster),
        }))
        if (changes.length > 0) dispatch({ type: 'applyCloudChanges', changes })
      },
      (err) => console.error(err),
    )
    return unsub
  }, [user])

  // 로그인 중일 때, 실제로 내용이 바뀐 로스터만 Firestore에 올린다. 리듀서가 불변성을 지키기 때문에
  // (안 바뀐 로스터는 객체 참조가 그대로 유지됨) 참조 비교만으로 싼값에 "무엇이 바뀌었는지" 알 수 있다.
  // 최초 로그인 시점에는 prevRostersRef가 비어있는 상태([])와 비교되므로, 그 시점의 로컬 로스터 전부가
  // "바뀐 것"으로 잡혀 업로드된다 - 이게 곧 "로그인하면 로컬 로스터가 계정에 합쳐진다"는 동작이다.
  const prevRostersRef = useRef<Roster[]>([])
  useEffect(() => {
    // 로그아웃 상태에서는 prevRostersRef를 절대 갱신하지 않고 그대로 둔다(초기값 []). 그래야 로그인하는
    // 순간 "지금까지의 로컬 로스터 전부가 비어있던 이전 상태와 다르다"로 잡혀서 전부 업로드된다.
    // 여기서 매 렌더마다 prevRostersRef를 state.rosters로 갱신해버리면, 로그인 시점엔 이미 prev와
    // state.rosters가 같은 참조가 되어버려서 아무것도 "바뀐 것"으로 안 잡히는 버그가 생긴다.
    if (!user) return
    const prev = prevRostersRef.current
    for (const roster of state.rosters) {
      const prevRoster = prev.find((r) => r.id === roster.id)
      if (prevRoster !== roster) {
        setDoc(doc(db, 'users', user.uid, 'rosters', roster.id), roster).catch(console.error)
      }
    }
    prevRostersRef.current = state.rosters
  }, [state.rosters, user])

  const store: RosterStore = {
    ...state,
    activeRoster: state.rosters.find((r) => r.id === state.activeRosterId),
    createRoster: (name) => dispatch({ type: 'createRoster', name }),
    deleteRoster: (rosterId) => {
      dispatch({ type: 'deleteRoster', rosterId })
      if (user) deleteDoc(doc(db, 'users', user.uid, 'rosters', rosterId)).catch(console.error)
    },
    renameRoster: (rosterId, name) => dispatch({ type: 'renameRoster', rosterId, name }),
    selectRoster: (rosterId) => dispatch({ type: 'selectRoster', rosterId }),
    setRosterRace: (rosterId, raceId) => dispatch({ type: 'setRosterRace', rosterId, raceId }),
    setFactionCard: (rosterId, factionCardId) => dispatch({ type: 'setFactionCard', rosterId, factionCardId }),
    setMineralCap: (rosterId, mineralCap) => dispatch({ type: 'setMineralCap', rosterId, mineralCap }),
    addTacticalCard: (rosterId, cardId) => dispatch({ type: 'addTacticalCard', rosterId, cardId }),
    removeTacticalCard: (rosterId, cardId) => dispatch({ type: 'removeTacticalCard', rosterId, cardId }),
    addUnitEntry: (rosterId, unitId, squadTierIndex, id) =>
      dispatch({ type: 'addUnitEntry', rosterId, unitId, squadTierIndex, id }),
    removeUnitEntry: (rosterId, entryId) => dispatch({ type: 'removeUnitEntry', rosterId, entryId }),
    moveUnitEntry: (rosterId, entryId, direction) => dispatch({ type: 'moveUnitEntry', rosterId, entryId, direction }),
    setUnitEntrySquadTier: (rosterId, entryId, squadTierIndex) =>
      dispatch({ type: 'setUnitEntrySquadTier', rosterId, entryId, squadTierIndex }),
    toggleUnitUpgrade: (rosterId, entryId, upgradeIndex, exclusiveWith) =>
      dispatch({ type: 'toggleUnitUpgrade', rosterId, entryId, upgradeIndex, exclusiveWith }),
    toggleFavoriteAbility: (rosterId, sourceId, abilityId) =>
      dispatch({ type: 'toggleFavoriteAbility', rosterId, sourceId, abilityId }),
  }

  return <RosterStoreContext.Provider value={store}>{children}</RosterStoreContext.Provider>
}

export function useRosterStore(): RosterStore {
  const ctx = useContext(RosterStoreContext)
  if (!ctx) throw new Error('useRosterStore must be used within RosterProvider')
  return ctx
}
