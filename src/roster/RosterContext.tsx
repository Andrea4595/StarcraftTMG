import { createContext, useContext, useEffect, useReducer, type ReactNode } from 'react'
import type { Roster, RosterUnitEntry } from '../types'
import { makeId } from './makeId'

const STORAGE_KEY = 'tmg-roster-builder-state'

function createEmptyRoster(name: string): Roster {
  return {
    id: makeId(),
    name,
    raceId: null,
    factionCardName: null,
    mineralCap: 2000,
    tacticalCardNames: [],
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
  | { type: 'setFactionCard'; rosterId: string; factionCardName: string | null }
  | { type: 'setMineralCap'; rosterId: string; mineralCap: number }
  | { type: 'addTacticalCard'; rosterId: string; cardName: string }
  | { type: 'removeTacticalCard'; rosterId: string; cardName: string }
  | { type: 'addUnitEntry'; rosterId: string; unitName: string; squadTierIndex: number; id: string }
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
  | { type: 'toggleFavoriteAbility'; rosterId: string; source: string; name: string }

interface State {
  rosters: Roster[]
  activeRosterId: string | null
}

const emptyState: State = { rosters: [], activeRosterId: null }

/** localStorage에 저장된 이전 상태를 불러온다. 없거나 손상됐으면 빈 상태로 시작한다 */
function loadState(): State {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyState
    const parsed = JSON.parse(raw)
    if (!parsed || !Array.isArray(parsed.rosters)) return emptyState
    // favoriteAbilities는 즐겨찾기 기능 추가 이전에 저장된 로스터엔 없을 수 있어 기본값을 채워준다
    const rosters: Roster[] = parsed.rosters.map((r: Roster) => ({ ...r, favoriteAbilities: r.favoriteAbilities ?? [] }))
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
        factionCardName: null,
        tacticalCardNames: [],
        units: [],
      }))
    case 'setFactionCard':
      return mapRoster(state, action.rosterId, (r) => ({ ...r, factionCardName: action.factionCardName }))
    case 'setMineralCap':
      return mapRoster(state, action.rosterId, (r) => ({ ...r, mineralCap: action.mineralCap }))
    case 'addTacticalCard':
      return mapRoster(state, action.rosterId, (r) => ({
        ...r,
        tacticalCardNames: [...r.tacticalCardNames, action.cardName],
      }))
    case 'removeTacticalCard':
      return mapRoster(state, action.rosterId, (r) => {
        const idx = r.tacticalCardNames.indexOf(action.cardName)
        if (idx === -1) return r
        const tacticalCardNames = [...r.tacticalCardNames]
        tacticalCardNames.splice(idx, 1)
        return { ...r, tacticalCardNames }
      })
    case 'addUnitEntry':
      return mapRoster(state, action.rosterId, (r) => ({
        ...r,
        units: [
          ...r.units,
          {
            id: action.id,
            unitName: action.unitName,
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
        const exists = r.favoriteAbilities.some((f) => f.source === action.source && f.name === action.name)
        return {
          ...r,
          favoriteAbilities: exists
            ? r.favoriteAbilities.filter((f) => !(f.source === action.source && f.name === action.name))
            : [...r.favoriteAbilities, { source: action.source, name: action.name }],
        }
      })
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
  setFactionCard: (rosterId: string, factionCardName: string | null) => void
  setMineralCap: (rosterId: string, mineralCap: number) => void
  addTacticalCard: (rosterId: string, cardName: string) => void
  removeTacticalCard: (rosterId: string, cardName: string) => void
  addUnitEntry: (rosterId: string, unitName: string, squadTierIndex: number, id: string) => void
  removeUnitEntry: (rosterId: string, entryId: string) => void
  moveUnitEntry: (rosterId: string, entryId: string, direction: 'up' | 'down') => void
  setUnitEntrySquadTier: (rosterId: string, entryId: string, squadTierIndex: number) => void
  toggleUnitUpgrade: (rosterId: string, entryId: string, upgradeIndex: number, exclusiveWith?: number[]) => void
  toggleFavoriteAbility: (rosterId: string, source: string, name: string) => void
}

const RosterStoreContext = createContext<RosterStore | null>(null)

export function RosterProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // 저장 공간이 꽉 찼거나(예: 시크릿 모드) 접근이 막힌 경우, 앱 동작에는 지장이 없으므로 조용히 무시한다
    }
  }, [state])

  const store: RosterStore = {
    ...state,
    activeRoster: state.rosters.find((r) => r.id === state.activeRosterId),
    createRoster: (name) => dispatch({ type: 'createRoster', name }),
    deleteRoster: (rosterId) => dispatch({ type: 'deleteRoster', rosterId }),
    renameRoster: (rosterId, name) => dispatch({ type: 'renameRoster', rosterId, name }),
    selectRoster: (rosterId) => dispatch({ type: 'selectRoster', rosterId }),
    setRosterRace: (rosterId, raceId) => dispatch({ type: 'setRosterRace', rosterId, raceId }),
    setFactionCard: (rosterId, factionCardName) => dispatch({ type: 'setFactionCard', rosterId, factionCardName }),
    setMineralCap: (rosterId, mineralCap) => dispatch({ type: 'setMineralCap', rosterId, mineralCap }),
    addTacticalCard: (rosterId, cardName) => dispatch({ type: 'addTacticalCard', rosterId, cardName }),
    removeTacticalCard: (rosterId, cardName) => dispatch({ type: 'removeTacticalCard', rosterId, cardName }),
    addUnitEntry: (rosterId, unitName, squadTierIndex, id) =>
      dispatch({ type: 'addUnitEntry', rosterId, unitName, squadTierIndex, id }),
    removeUnitEntry: (rosterId, entryId) => dispatch({ type: 'removeUnitEntry', rosterId, entryId }),
    moveUnitEntry: (rosterId, entryId, direction) => dispatch({ type: 'moveUnitEntry', rosterId, entryId, direction }),
    setUnitEntrySquadTier: (rosterId, entryId, squadTierIndex) =>
      dispatch({ type: 'setUnitEntrySquadTier', rosterId, entryId, squadTierIndex }),
    toggleUnitUpgrade: (rosterId, entryId, upgradeIndex, exclusiveWith) =>
      dispatch({ type: 'toggleUnitUpgrade', rosterId, entryId, upgradeIndex, exclusiveWith }),
    toggleFavoriteAbility: (rosterId, source, name) => dispatch({ type: 'toggleFavoriteAbility', rosterId, source, name }),
  }

  return <RosterStoreContext.Provider value={store}>{children}</RosterStoreContext.Provider>
}

export function useRosterStore(): RosterStore {
  const ctx = useContext(RosterStoreContext)
  if (!ctx) throw new Error('useRosterStore must be used within RosterProvider')
  return ctx
}
