import type { Roster, RosterUnitEntry, UnitCard } from '../../types'
import { useRosterStore } from '../RosterContext'
import { UnitCardView } from '../../components/card/UnitCardView'
import { catalogSquadTierIndexes, upgradeExclusiveWith } from '../rosterCalc'

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
        squadSelection={{
          activeIndex: entry.squadTierIndex,
          selectableIndexes: catalogSquadTierIndexes(unit),
          onSelect: (index) => store.setUnitEntrySquadTier(roster.id, entry.id, index),
        }}
      />
    </div>
  )
}
