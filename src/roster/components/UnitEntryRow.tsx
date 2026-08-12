import type { Roster, RosterUnitEntry, UnitCard } from '../../types'
import { useRosterStore } from '../RosterContext'
import { resolveScaledCost, unitEntryMineralCost } from '../rosterCalc'
import { StatBoxes } from '../../components/card/StatBoxes'

export function UnitEntryRow({
  roster,
  unit,
  entry,
  onEdit,
}: {
  roster: Roster
  unit: UnitCard
  entry: RosterUnitEntry
  onEdit: () => void
}) {
  const store = useRosterStore()
  const tier = unit.squad[entry.squadTierIndex]
  const cost = unitEntryMineralCost(unit, entry)
  const equippedUpgrades = entry.upgradeIndexes
    .map((i) => unit.upgrades[i])
    .filter((u): u is NonNullable<typeof u> => u !== undefined)

  return (
    <div
      className="roster-entry"
      role="button"
      tabIndex={0}
      onClick={onEdit}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onEdit()
      }}
    >
      <div className="roster-entry-header">
        <div className="roster-entry-title">
          <span className="roster-entry-name">{unit.name}</span>
          {unit.isUnique && <span className="card-unique-badge">UNIQUE</span>}
        </div>
        <StatBoxes unit={unit} />
        <button
          type="button"
          className="roster-btn-remove"
          onClick={(e) => {
            e.stopPropagation()
            store.removeUnitEntry(roster.id, entry.id)
          }}
          aria-label="제거"
        >
          ✕
        </button>
      </div>

      {unit.abilities.length > 0 && (
        <div className="roster-entry-ability-chips">
          {unit.abilities.map((a, i) => (
            <span className="roster-chip" key={i}>
              {a.name}
            </span>
          ))}
        </div>
      )}

      {equippedUpgrades.length > 0 && (
        <div className="roster-entry-ability-chips">
          {equippedUpgrades.map((upgrade, i) => (
            <span className="roster-chip roster-chip-upgrade" key={i}>
              {upgrade.ability.name} (+{resolveScaledCost(upgrade.pts, entry.squadTierIndex)})
            </span>
          ))}
        </div>
      )}

      <div className="roster-entry-summary">
        Models: {tier?.modelMax ?? '-'} | Supply: {tier?.supply ?? '-'} | Cost: {cost}
      </div>
    </div>
  )
}
