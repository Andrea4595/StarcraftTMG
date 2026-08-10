import { createContext, useContext, useReducer, type ReactNode } from 'react'
import type { Roster, RosterUnitEntry } from '../types'

function makeId(): string {
  return Math.random().toString(36).slice(2, 10)
}

function createEmptyRoster(factionId: string, name: string): Roster {
  return {
    id: makeId(),
    name,
    factionId,
    mineralCap: 500,
    tacticalCardNames: [],
    units: [],
  }
}

type Action =
  | { type: 'createRoster'; factionId: string; name: string }
  | { type: 'deleteRoster'; rosterId: string }
  | { type: 'renameRoster'; rosterId: string; name: string }
  | { type: 'selectRoster'; rosterId: string }
  | { type: 'setMineralCap'; rosterId: string; mineralCap: number }
  | { type: 'toggleTacticalCard'; rosterId: string; cardName: string }
  | { type: 'addUnitEntry'; rosterId: string; unitName: string; squadTierIndex: number }
  | { type: 'removeUnitEntry'; rosterId: string; entryId: string }
  | { type: 'toggleUnitUpgrade'; rosterId: string; entryId: string; upgradeIndex: number }

interface State {
  rosters: Roster[]
  activeRosterId: string | null
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
      const roster = createEmptyRoster(action.factionId, action.name)
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
    case 'setMineralCap':
      return mapRoster(state, action.rosterId, (r) => ({ ...r, mineralCap: action.mineralCap }))
    case 'toggleTacticalCard':
      return mapRoster(state, action.rosterId, (r) => ({
        ...r,
        tacticalCardNames: r.tacticalCardNames.includes(action.cardName)
          ? r.tacticalCardNames.filter((n) => n !== action.cardName)
          : [...r.tacticalCardNames, action.cardName],
      }))
    case 'addUnitEntry':
      return mapRoster(state, action.rosterId, (r) => ({
        ...r,
        units: [
          ...r.units,
          {
            id: makeId(),
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
    case 'toggleUnitUpgrade':
      return mapRoster(state, action.rosterId, (r) =>
        mapUnitEntry(r, action.entryId, (e) => ({
          ...e,
          upgradeIndexes: e.upgradeIndexes.includes(action.upgradeIndex)
            ? e.upgradeIndexes.filter((i) => i !== action.upgradeIndex)
            : [...e.upgradeIndexes, action.upgradeIndex],
        })),
      )
    default:
      return state
  }
}

interface RosterStore extends State {
  activeRoster: Roster | undefined
  createRoster: (factionId: string, name: string) => void
  deleteRoster: (rosterId: string) => void
  renameRoster: (rosterId: string, name: string) => void
  selectRoster: (rosterId: string) => void
  setMineralCap: (rosterId: string, mineralCap: number) => void
  toggleTacticalCard: (rosterId: string, cardName: string) => void
  addUnitEntry: (rosterId: string, unitName: string, squadTierIndex: number) => void
  removeUnitEntry: (rosterId: string, entryId: string) => void
  toggleUnitUpgrade: (rosterId: string, entryId: string, upgradeIndex: number) => void
}

const RosterStoreContext = createContext<RosterStore | null>(null)

export function RosterProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { rosters: [], activeRosterId: null })

  const store: RosterStore = {
    ...state,
    activeRoster: state.rosters.find((r) => r.id === state.activeRosterId),
    createRoster: (factionId, name) => dispatch({ type: 'createRoster', factionId, name }),
    deleteRoster: (rosterId) => dispatch({ type: 'deleteRoster', rosterId }),
    renameRoster: (rosterId, name) => dispatch({ type: 'renameRoster', rosterId, name }),
    selectRoster: (rosterId) => dispatch({ type: 'selectRoster', rosterId }),
    setMineralCap: (rosterId, mineralCap) => dispatch({ type: 'setMineralCap', rosterId, mineralCap }),
    toggleTacticalCard: (rosterId, cardName) => dispatch({ type: 'toggleTacticalCard', rosterId, cardName }),
    addUnitEntry: (rosterId, unitName, squadTierIndex) =>
      dispatch({ type: 'addUnitEntry', rosterId, unitName, squadTierIndex }),
    removeUnitEntry: (rosterId, entryId) => dispatch({ type: 'removeUnitEntry', rosterId, entryId }),
    toggleUnitUpgrade: (rosterId, entryId, upgradeIndex) =>
      dispatch({ type: 'toggleUnitUpgrade', rosterId, entryId, upgradeIndex }),
  }

  return <RosterStoreContext.Provider value={store}>{children}</RosterStoreContext.Provider>
}

export function useRosterStore(): RosterStore {
  const ctx = useContext(RosterStoreContext)
  if (!ctx) throw new Error('useRosterStore must be used within RosterProvider')
  return ctx
}
