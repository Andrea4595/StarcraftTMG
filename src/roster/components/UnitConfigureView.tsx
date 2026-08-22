import type { Roster, RosterUnitEntry, UnitCard } from '../../types'
import { useRosterStore } from '../RosterContext'
import { UnitCardView } from '../../components/card/UnitCardView'
import { upgradeExclusiveWith } from '../rosterCalc'
import { SquadTierSelector } from './SquadTierSelector'

export function UnitConfigureView({
  roster,
  unit,
  entry,
  resourceLabel,
}: {
  roster: Roster
  unit: UnitCard
  entry: RosterUnitEntry
  resourceLabel: string
}) {
  const store = useRosterStore()

  return (
    <div className="unit-configure">
      <UnitCardView
        unit={unit}
        resourceLabel={resourceLabel}
        upgradeToggle={{
          squadTierIndex: entry.squadTierIndex,
          activeIndexes: entry.upgradeIndexes,
          onToggle: (index) => store.toggleUnitUpgrade(roster.id, entry.id, index, upgradeExclusiveWith(unit, index)),
        }}
        squadTierSelector={<SquadTierSelector roster={roster} unit={unit} entry={entry} />}
      />
    </div>
  )
}
