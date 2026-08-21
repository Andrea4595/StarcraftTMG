import type { Roster, RosterUnitEntry, UnitCard } from '../../types'
import { useRosterStore } from '../RosterContext'
import { UnitCardView } from '../../components/card/UnitCardView'
import { catalogSquadTierIndexes } from '../rosterCalc'

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

  /** 이 업그레이드와 같은 무기(for)를 대체하는 다른 무기 업그레이드들의 인덱스. 하나를 켜면 이들은 자동으로 꺼진다 */
  const exclusiveWithFor = (index: number) => {
    const target = unit.upgrades[index]
    if (target.ability.kind !== 'weapon' || !target.forId) return []
    return unit.upgrades
      .map((_, i) => i)
      .filter((i) => i !== index && unit.upgrades[i].ability.kind === 'weapon' && unit.upgrades[i].forId === target.forId)
  }

  return (
    <div className="unit-configure">
      <UnitCardView
        unit={unit}
        resourceLabel={resourceLabel}
        upgradeToggle={{
          squadTierIndex: entry.squadTierIndex,
          activeIndexes: entry.upgradeIndexes,
          onToggle: (index) => store.toggleUnitUpgrade(roster.id, entry.id, index, exclusiveWithFor(index)),
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
