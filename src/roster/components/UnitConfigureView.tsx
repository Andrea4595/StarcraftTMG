import type { Ability, Roster, RosterUnitEntry, UnitCard } from '../../types'
import { useRosterStore } from '../RosterContext'
import { useLocalize } from '../../LangContext'
import { UnitCardView } from '../../components/card/UnitCardView'
import { abilitySelectionRefFor, upgradeExclusiveWith } from '../rosterCalc'
import { SquadTierSelector } from './SquadTierSelector'
import type { AbilitySelectionRef } from './AbilityChipsRow'

export function UnitConfigureView({
  roster,
  unit,
  entry,
  resourceLabel,
  onSelectAbility,
}: {
  roster: Roster
  unit: UnitCard
  entry: RosterUnitEntry
  resourceLabel: string
  /** 지정하면 이름 직접 언급으로 찾은 연관 어빌리티/무기 항목을 눌러 그 대상의 상세 모달로 이동할 수 있다 */
  onSelectAbility?: (ref: AbilitySelectionRef) => void
}) {
  const store = useRosterStore()
  const localize = useLocalize()

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
        onSelectAbility={
          onSelectAbility &&
          ((ability: Ability) =>
            onSelectAbility(
              abilitySelectionRefFor(unit, ability, {
                sourceId: unit.id,
                sourceLabel: localize(unit.name),
                unitType: unit.type,
                entryId: entry.id,
                localize,
                interactive: true,
              }),
            ))
        }
      />
    </div>
  )
}
