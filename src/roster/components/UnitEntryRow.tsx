import type { Ability, Roster, RosterUnitEntry, UnitCard } from '../../types'
import { useRosterStore } from '../RosterContext'
import {
  FIRE_LABEL,
  MELEE_LABEL,
  unitAbilityChipEntries,
  unitEntryMineralCost,
  unitForLabelResolver,
  unitMeleeWeaponEntries,
  unitRangedWeaponEntries,
  upgradeExclusiveWith,
} from '../rosterCalc'
import { StatBoxes } from '../../components/card/StatBoxes'
import { KeywordList } from '../../components/card/KeywordText'
import { useLocalize } from '../../LangContext'
import { AbilityChipsRow, type AbilitySelectionRef, type UpgradeToggleRef, type WeaponSummaryInput } from './AbilityChipsRow'
import { SquadTierSelector } from './SquadTierSelector'

export function UnitEntryRow({
  roster,
  unit,
  entry,
  active,
  onEdit,
  onSelectAbility,
}: {
  roster: Roster
  unit: UnitCard
  entry: RosterUnitEntry
  /** 이 유닛이 지금 오른쪽 상세 패널에 표시되고 있는지 */
  active?: boolean
  onEdit: () => void
  onSelectAbility: (ref: AbilitySelectionRef) => void
}) {
  const store = useRosterStore()
  const localize = useLocalize()
  const cost = unitEntryMineralCost(unit, entry)
  const abilityEntries = unitAbilityChipEntries(unit, entry)
  const upgradeStateByAbility = new Map<Ability, 'active' | 'inactive'>(
    abilityEntries
      .filter((e) => e.upgradeActive !== undefined)
      .map((e) => [e.ability, e.upgradeActive ? 'active' : 'inactive']),
  )
  const upgradeCostByAbility = new Map<Ability, number>(
    abilityEntries.filter((e) => e.upgradePts !== undefined).map((e) => [e.ability, e.upgradePts as number]),
  )
  const forFor = unitForLabelResolver(unit, localize)
  const rangedSummary = unitRangedWeaponEntries(unit, entry, localize)
  const meleeSummary = unitMeleeWeaponEntries(unit, entry, localize)
  const weaponSummaries: WeaponSummaryInput[] = [
    { entryId: entry.id, phase: 'Assault', label: FIRE_LABEL, entries: rangedSummary },
    { entryId: entry.id, phase: 'Combat', label: MELEE_LABEL, entries: meleeSummary },
  ]
  const nonWeaponSummaryAbilities = abilityEntries
    .map((e) => e.ability)
    .filter((a) => !(a.kind === 'weapon' && (a.phase === 'Assault' || a.phase === 'Combat')))
  const upgradeIndexByAbility = new Map<Ability, number>(unit.upgrades.map((u, i) => [u.ability, i]))
  const upgradeToggleFor = (ability: Ability): UpgradeToggleRef | undefined => {
    const i = upgradeIndexByAbility.get(ability)
    if (i === undefined) return undefined
    return { entryId: entry.id, upgradeIndex: i, pts: unit.upgrades[i].pts, exclusiveWith: upgradeExclusiveWith(unit, i) }
  }
  const index = roster.units.findIndex((e) => e.id === entry.id)

  return (
    <div
      className={`roster-entry ${active ? 'roster-entry-active' : ''}`}
      role="button"
      tabIndex={0}
      onClick={onEdit}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onEdit()
      }}
    >
      <div className="roster-entry-header">
        <div className="roster-entry-title">
          <span className="roster-entry-name">{localize(unit.name)}</span>
          {unit.isUnique && <span className="card-unique-badge">UNIQUE</span>}
        </div>
        <div className="roster-entry-meta">
          <StatBoxes unit={unit} />
          <SquadTierSelector roster={roster} unit={unit} entry={entry} />
        </div>
        <button
          type="button"
          className="btn btn-danger roster-entry-remove"
          onClick={(e) => {
            e.stopPropagation()
            store.removeUnitEntry(roster.id, entry.id)
          }}
          aria-label="제거"
        >
          ✕
        </button>
      </div>

      <AbilityChipsRow
        abilities={nonWeaponSummaryAbilities}
        weaponSummaries={weaponSummaries}
        sourceId={unit.id}
        sourceLabel={localize(unit.name)}
        unitType={unit.type}
        roster={roster}
        onSelectAbility={onSelectAbility}
        localize={localize}
        upgradeStateFor={(ability) => upgradeStateByAbility.get(ability)}
        costFor={(ability) => upgradeCostByAbility.get(ability)}
        forFor={forFor}
        upgradeToggleFor={upgradeToggleFor}
      />

      <div className="roster-entry-footer">
        <div className="roster-entry-tags">
          <KeywordList keywords={unit.tags.filter((t) => t.name !== 'Unique')} />
        </div>
        <div className="roster-entry-footer-right">
          <span className="roster-entry-cost">{cost}</span>
          <div className="roster-entry-move">
            <button
              type="button"
              className="roster-entry-move-btn"
              disabled={index <= 0}
              onClick={(e) => {
                e.stopPropagation()
                store.moveUnitEntry(roster.id, entry.id, 'up')
              }}
              aria-label="위로 이동"
            >
              ▲
            </button>
            <button
              type="button"
              className="roster-entry-move-btn"
              disabled={index === -1 || index === roster.units.length - 1}
              onClick={(e) => {
                e.stopPropagation()
                store.moveUnitEntry(roster.id, entry.id, 'down')
              }}
              aria-label="아래로 이동"
            >
              ▼
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
