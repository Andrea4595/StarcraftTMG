import type { Faction } from '../types'
import { useRosterStore } from './RosterContext'
import { RosterSwitcher } from './components/RosterSwitcher'
import { RosterPanel } from './components/RosterPanel'
import { CatalogPanel } from './components/CatalogPanel'
import './roster.css'

export function RosterBuilderPage({ faction }: { faction: Faction }) {
  const store = useRosterStore()

  return (
    <div className="roster-builder">
      <RosterSwitcher factionId={faction.id} />

      {!store.activeRoster ? (
        <div className="roster-empty-state">
          '+ 새 로스터'를 눌러 {faction.name} 로스터를 시작하세요.
        </div>
      ) : (
        <div className="roster-builder-body">
          <RosterPanel faction={faction} roster={store.activeRoster} />
          <CatalogPanel faction={faction} roster={store.activeRoster} />
        </div>
      )}
    </div>
  )
}
