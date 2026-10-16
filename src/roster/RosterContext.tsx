import { createContext, useContext, useEffect, useReducer, useRef, useState, type ReactNode } from 'react'
import { collection, doc, onSnapshot, setDoc, type DocumentData } from 'firebase/firestore'
import type { RaceData, Roster, RosterUnitEntry } from '../types'
import { makeId } from './makeId'
import { syncSummonedUnits } from './rosterCalc'
import { useAuth } from '../AuthContext'
import { db } from '../firebase'
import { terran } from '../data/terran'
import { zerg } from '../data/zerg'
import { protoss } from '../data/protoss'

const RACES: RaceData[] = [terran, zerg, protoss]

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
    updatedAt: Date.now(),
  }
}

type Action =
  | { type: 'createRoster'; name: string }
  /** uid: 지금 로그인 중인 계정. 이미 동기화 기록이 있으면 그 계정이 우선한다 */
  | { type: 'deleteRoster'; rosterId: string; uid: string | null }
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
  /** 로그인 후 서버에서 받은 첫 스냅샷(컬렉션 전체)으로 로컬 로스터와 클라우드를 맞춘다 */
  | { type: 'reconcileCloud'; uid: string; docs: CloudDoc[] }
  /** 그 이후 스냅샷의 문서 단위 변경 사항 */
  | { type: 'applyCloudChanges'; uid: string; changes: CloudDoc[] }
  | { type: 'markSynced'; rosterId: string; uid: string }
  | { type: 'clearPendingDelete'; rosterId: string; uid: string }

/**
 * Firestore users/{uid}/rosters 문서 하나. roster가 null이면 삭제된 로스터다 - 삭제는 문서를 지우는
 * 대신 톰스톤({ deleted: true })으로 남긴다. 문서를 그냥 지워버리면, 삭제 당시 꺼져 있던 기기가 나중에
 * 접속했을 때 "클라우드에 없는 로컬 로스터 = 새로 만든 것"으로 오인해 다시 업로드해버리기 때문이다.
 */
interface CloudDoc {
  id: string
  roster: Roster | null
}

interface PendingDelete {
  rosterId: string
  uid: string
}

interface State {
  rosters: Roster[]
  activeRosterId: string | null
  /**
   * 로스터 id -> 그 로스터가 동기화된 계정 uid. 클라우드에 올라간 게 확인된 로스터만 들어있다.
   * "이 기기에서 새로 만든 로스터"와 "다른 기기에서 삭제된 로스터"는 둘 다 클라우드에 없다는 점에서
   * 똑같아 보이는데, 이 기록으로 둘을 구분한다. 새로고침/로그아웃을 거쳐도 남도록 localStorage에 저장된다.
   */
  syncedUids: Record<string, string>
  /** 아직 클라우드에 톰스톤을 기록하지 못한 삭제 (로그아웃 중에 지웠거나, 쓰기가 서버에 닿기 전에 앱이 닫힌 경우) */
  pendingDeletes: PendingDelete[]
}

const emptyState: State = { rosters: [], activeRosterId: null, syncedUids: {}, pendingDeletes: [] }

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
      // summonedBy가 없는(자동 소환 이전에 저장된) 항목은 필드 자체를 아예 안 만든다 - undefined를
      // 값으로 명시하면 Firestore setDoc이 "Unsupported field value: undefined"로 거부한다
      ...(typeof u.summonedBy === 'string' ? { summonedBy: u.summonedBy } : {}),
    })),
    favoriteAbilities: legacyFavorites.map((f) => ({
      sourceId: (f.sourceId ?? f.source) as string,
      abilityId: (f.abilityId ?? f.name) as string,
    })),
    ...(typeof r.updatedAt === 'number' ? { updatedAt: r.updatedAt } : {}),
  }
}

/** Firestore 문서 데이터를 CloudDoc으로 바꾼다. 톰스톤이면 roster가 null */
function toCloudDoc(id: string, data: DocumentData): CloudDoc {
  if (data.deleted === true) return { id, roster: null }
  return { id, roster: migrateLegacyRoster({ ...data, id }) }
}

/**
 * 키 순서와 무관한 JSON 문자열. Firestore가 돌려주는 객체는 필드 순서가 우리가 올린 것과 다를 수 있어서,
 * 그냥 JSON.stringify로 비교하면 같은 내용도 다르다고 판단해 불필요한 업로드/갱신이 생긴다.
 */
function stableStringify(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`
  if (value && typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>)
      .filter(([, v]) => v !== undefined)
      .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    return `{${entries.map(([k, v]) => `${JSON.stringify(k)}:${stableStringify(v)}`).join(',')}}`
  }
  return JSON.stringify(value)
}

function omitKey(record: Record<string, string>, key: string): Record<string, string> {
  if (!(key in record)) return record
  const next = { ...record }
  delete next[key]
  return next
}

/** 활성 로스터가 목록에서 사라졌으면 첫 로스터(없으면 null)로 옮긴다 */
function validActiveId(rosters: Roster[], activeRosterId: string | null): string | null {
  if (activeRosterId && rosters.some((r) => r.id === activeRosterId)) return activeRosterId
  return rosters[0]?.id ?? null
}

/** localStorage에 저장된 이전 상태를 불러온다. 없거나 손상됐으면 빈 상태로 시작한다 */
function loadState(): State {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyState
    const parsed = JSON.parse(raw)
    if (!parsed || !Array.isArray(parsed.rosters)) return emptyState
    const rosters: Roster[] = parsed.rosters.map((r: Record<string, unknown>) => migrateLegacyRoster(r))
    return {
      rosters,
      activeRosterId: parsed.activeRosterId ?? null,
      syncedUids: parsed.syncedUids && typeof parsed.syncedUids === 'object' ? parsed.syncedUids : {},
      pendingDeletes: Array.isArray(parsed.pendingDeletes) ? parsed.pendingDeletes : [],
    }
  } catch {
    return emptyState
  }
}

/**
 * fn 적용 후, 로스터의 종족을 알 수 있으면(raceId 설정됨) 자동 소환 유닛 개수를 항상 지금 구성에
 * 맞게 다시 맞춘다(syncSummonedUnits). 맞출 게 없으면 원래 객체 참조를 그대로 돌려주므로, 소환과
 * 무관한 변경(이름 변경, 업그레이드 토글 등)에는 실질적으로 아무 영향이 없다.
 */
function mapRoster(state: State, rosterId: string, fn: (r: Roster) => Roster): State {
  return {
    ...state,
    rosters: state.rosters.map((r) => {
      if (r.id !== rosterId) return r
      const updated = fn(r)
      const race = updated.raceId ? RACES.find((race) => race.id === updated.raceId) : undefined
      const synced = race ? syncSummonedUnits(race, updated) : updated
      // 실제로 바뀐 경우에만 수정 시각을 갱신한다 (참조가 그대로면 아무 변경도 없었던 것)
      return synced === r ? r : { ...synced, updatedAt: Date.now() }
    }),
  }
}

function mapUnitEntry(roster: Roster, entryId: string, fn: (e: RosterUnitEntry) => RosterUnitEntry): Roster {
  return { ...roster, units: roster.units.map((e) => (e.id === entryId ? fn(e) : e)) }
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'createRoster': {
      const roster = createEmptyRoster(action.name)
      return { ...state, rosters: [...state.rosters, roster], activeRosterId: roster.id }
    }
    case 'deleteRoster': {
      const rosters = state.rosters.filter((r) => r.id !== action.rosterId)
      // 클라우드에 올라가 있을 수 있는 로스터면 톰스톤을 남기도록 예약한다. 로그아웃 상태라면 다음에
      // 그 계정으로 로그인할 때 기록된다 - 안 그러면 로그인하는 순간 클라우드 사본이 다시 내려온다.
      const uid = state.syncedUids[action.rosterId] ?? action.uid
      const pendingDeletes = uid
        ? [...state.pendingDeletes.filter((p) => p.rosterId !== action.rosterId), { rosterId: action.rosterId, uid }]
        : state.pendingDeletes
      return {
        rosters,
        activeRosterId: validActiveId(rosters, state.activeRosterId),
        syncedUids: omitKey(state.syncedUids, action.rosterId),
        pendingDeletes,
      }
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
    case 'reconcileCloud': {
      const cloud = new Map<string, Roster | null>(action.docs.map((d) => [d.id, d.roster]))
      const pending = new Set(state.pendingDeletes.filter((p) => p.uid === action.uid).map((p) => p.rosterId))
      const syncedUids = { ...state.syncedUids }
      const rosters: Roster[] = []
      for (const local of state.rosters) {
        const owner = syncedUids[local.id]
        // 다른 계정 소속 로스터: 그 계정 클라우드에 그대로 남아 있으니 화면에서만 내린다
        if (owner !== undefined && owner !== action.uid) {
          delete syncedUids[local.id]
          continue
        }
        const remote = cloud.get(local.id)
        if (remote === undefined) {
          // 이 계정과 동기화된 적 있는데 클라우드에 없다 = 다른 곳에서 삭제됐다. 한 번도 동기화된 적
          // 없으면 이 기기에서 새로 만든 로스터이므로 남겨둔다 (push effect가 업로드한다)
          if (owner === action.uid) delete syncedUids[local.id]
          else rosters.push(local)
          continue
        }
        // 톰스톤: 다른 기기에서 삭제됨. 삭제가 이 기기에서의 수정보다 우선한다
        if (remote === null) {
          delete syncedUids[local.id]
          continue
        }
        syncedUids[local.id] = action.uid
        // 양쪽에 다 있으면 더 최근에 고친 쪽을 쓴다. 로컬이 더 최신이면 push effect가 클라우드를 덮어쓴다
        rosters.push((remote.updatedAt ?? 0) >= (local.updatedAt ?? 0) ? remote : local)
      }
      const localIds = new Set(rosters.map((r) => r.id))
      for (const [id, remote] of cloud) {
        if (!remote || localIds.has(id) || pending.has(id)) continue
        rosters.push(remote)
        syncedUids[id] = action.uid
      }
      return { ...state, rosters, activeRosterId: validActiveId(rosters, state.activeRosterId), syncedUids }
    }
    case 'applyCloudChanges': {
      let rosters = state.rosters
      let syncedUids = state.syncedUids
      let changed = false
      const pending = new Set(state.pendingDeletes.filter((p) => p.uid === action.uid).map((p) => p.rosterId))
      for (const c of action.changes) {
        if (c.roster === null) {
          if (rosters.some((r) => r.id === c.id)) {
            rosters = rosters.filter((r) => r.id !== c.id)
            changed = true
          }
          if (c.id in syncedUids) {
            syncedUids = omitKey(syncedUids, c.id)
            changed = true
          }
          continue
        }
        // 이 기기에서 지웠는데 톰스톤이 아직 안 올라간 로스터는 다시 들이지 않는다
        if (pending.has(c.id)) continue
        const remote = c.roster
        const idx = rosters.findIndex((r) => r.id === c.id)
        if (idx === -1) {
          rosters = [...rosters, remote]
          changed = true
        } else if (stableStringify(rosters[idx]) !== stableStringify(remote)) {
          rosters = rosters.map((r, i) => (i === idx ? remote : r))
          changed = true
        }
        if (syncedUids[c.id] !== action.uid) {
          syncedUids = { ...syncedUids, [c.id]: action.uid }
          changed = true
        }
      }
      // 내용이 실제로 안 바뀌었으면 이전 state를 그대로 반환한다. 그래야 로컬 편집 -> Firestore 업로드
      // -> 동일한 내용의 onSnapshot 콜백 -> 다시 dispatch로 이어지는 흐름이 여기서 끊긴다 (무한 루프 방지)
      if (!changed) return state
      return { ...state, rosters, activeRosterId: validActiveId(rosters, state.activeRosterId), syncedUids }
    }
    case 'markSynced': {
      if (state.syncedUids[action.rosterId] === action.uid) return state
      if (!state.rosters.some((r) => r.id === action.rosterId)) return state
      return { ...state, syncedUids: { ...state.syncedUids, [action.rosterId]: action.uid } }
    }
    case 'clearPendingDelete': {
      const pendingDeletes = state.pendingDeletes.filter(
        (p) => !(p.rosterId === action.rosterId && p.uid === action.uid),
      )
      if (pendingDeletes.length === state.pendingDeletes.length) return state
      return { ...state, pendingDeletes }
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
  const uid = user?.uid ?? null

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // 저장 공간이 꽉 찼거나(예: 시크릿 모드) 접근이 막힌 경우, 앱 동작에는 지장이 없으므로 조용히 무시한다
    }
  }, [state])

  // 이 uid 계정에 대해 첫 서버 스냅샷으로 reconcileCloud를 마쳤는지. 그 전에는 업로드를 하지 않는다 -
  // 클라우드 상태를 모르는 채로 올리면, 다른 기기에서 지운 로스터를 되살리거나 최신 수정을 옛 버전으로 덮어쓴다.
  const [readyUid, setReadyUid] = useState<string | null>(null)
  // 로스터 id -> 클라우드에 있다고 알고 있는 내용(stableStringify). push effect가 이것과 다른 로스터만 올린다
  const cloudJsonRef = useRef<Map<string, string>>(new Map())

  // 로그인 중일 때만 Firestore users/{uid}/rosters 컬렉션을 구독한다. 로그아웃 상태에서는 이 effect가
  // 아무 일도 하지 않으므로, 로그인 안 한 사용자는 localStorage만 쓰는 셈이다.
  useEffect(() => {
    if (!uid) return
    const cloudJson = new Map<string, string>()
    cloudJsonRef.current = cloudJson
    const remember = (d: CloudDoc) => {
      if (d.roster) cloudJson.set(d.id, stableStringify(d.roster))
      else cloudJson.delete(d.id)
    }
    let reconciled = false
    const unsub = onSnapshot(
      collection(db, 'users', uid, 'rosters'),
      // 오프라인이면 첫 스냅샷이 서버 확인 없이 (비어있는) 캐시에서 올 수 있다. 그걸 클라우드 전체로 믿고
      // 맞추면 동기화된 로스터가 전부 "삭제됨"으로 처리되므로, 서버에서 온 스냅샷을 기다린다.
      { includeMetadataChanges: true },
      (snap) => {
        if (!reconciled) {
          if (snap.metadata.fromCache) return
          reconciled = true
          const docs = snap.docs.map((d) => toCloudDoc(d.id, d.data()))
          docs.forEach(remember)
          dispatch({ type: 'reconcileCloud', uid, docs })
          setReadyUid(uid)
          return
        }
        const changes = snap
          .docChanges()
          .map((c) => (c.type === 'removed' ? { id: c.doc.id, roster: null } : toCloudDoc(c.doc.id, c.doc.data())))
        changes.forEach(remember)
        if (changes.length > 0) dispatch({ type: 'applyCloudChanges', uid, changes })
      },
      (err) => console.error(err),
    )
    return () => {
      unsub()
      setReadyUid(null)
    }
  }, [uid])

  // 클라우드와 맞춘 뒤로는, 클라우드에 있다고 알고 있는 내용과 다른 로스터만 Firestore에 올린다.
  // reconcile 직후에는 이 기기에서만 만든 로스터와 로컬 쪽이 더 최신인 로스터가 여기 해당한다.
  useEffect(() => {
    if (!uid || readyUid !== uid) return
    const cloudJson = cloudJsonRef.current
    for (const roster of state.rosters) {
      const json = stableStringify(roster)
      if (cloudJson.get(roster.id) === json) continue
      cloudJson.set(roster.id, json)
      // setDoc은 값 검증 실패(예: undefined 필드) 시 프로미스가 아니라 동기적으로 던지기도 해서,
      // .catch()만으로는 못 잡고 그대로 앱을 깨뜨릴 수 있다 - try/catch로 한 번 더 감싼다
      try {
        // 서버가 받았다고 확인해준 뒤에야 "동기화됨"으로 기록한다. 그 전에 앱이 닫혀 쓰기가 사라지면,
        // 다음 로그인 때 이 로스터가 "다른 곳에서 삭제된 것"으로 오인돼 지워질 수 있기 때문이다.
        setDoc(doc(db, 'users', uid, 'rosters', roster.id), roster)
          .then(() => dispatch({ type: 'markSynced', rosterId: roster.id, uid }))
          .catch(console.error)
      } catch (err) {
        console.error(err)
      }
    }
  }, [state.rosters, uid, readyUid])

  // 예약된 삭제를 이 계정 클라우드에 톰스톤으로 기록한다. 서버 확인이 오면 예약을 지운다
  const flushingRef = useRef<Set<string>>(new Set())
  useEffect(() => {
    if (!uid) return
    for (const p of state.pendingDeletes) {
      if (p.uid !== uid || flushingRef.current.has(p.rosterId)) continue
      flushingRef.current.add(p.rosterId)
      setDoc(doc(db, 'users', uid, 'rosters', p.rosterId), { id: p.rosterId, deleted: true, deletedAt: Date.now() })
        .then(() => dispatch({ type: 'clearPendingDelete', rosterId: p.rosterId, uid }))
        .catch(console.error)
        .finally(() => flushingRef.current.delete(p.rosterId))
    }
  }, [state.pendingDeletes, uid])

  const store: RosterStore = {
    ...state,
    activeRoster: state.rosters.find((r) => r.id === state.activeRosterId),
    createRoster: (name) => dispatch({ type: 'createRoster', name }),
    deleteRoster: (rosterId) => dispatch({ type: 'deleteRoster', rosterId, uid }),
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
