import type { RaceData } from '../types'
import { useRosterStore } from './RosterContext'
import { RosterSwitcher } from './components/RosterSwitcher'
import { RosterPanel } from './components/RosterPanel'
import './roster.css'

export function RosterBuilderPage({ races }: { races: RaceData[] }) {
  const store = useRosterStore()
  const roster = store.activeRoster
  const race = races.find((r) => r.id === roster?.raceId)

  return (
    <div className="roster-builder">
      <RosterSwitcher />

      {!roster ? (
        <div className="roster-empty-state">'+ 새 로스터'를 눌러 로스터를 시작하세요.</div>
      ) : (
        <div className="roster-builder-body">
          <RosterPanel races={races} race={race} roster={roster} />
        </div>
      )}
    </div>
  )
}
