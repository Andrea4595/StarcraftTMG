import type { Roster, RosterUnitEntry, UnitCard } from '../../types'
import { useRosterStore } from '../RosterContext'
import { resolveScaledCost, unitEntryMineralCost } from '../rosterCalc'
import { StatBoxes } from '../../components/card/StatBoxes'

export function UnitEntryRow({
  roster,
  unit,
  entry,
}: {
  roster: Roster
  unit: UnitCard
  entry: RosterUnitEntry
}) {
  const store = useRosterStore()
  const tier = unit.squad[entry.squadTierIndex]
  const cost = unitEntryMineralCost(unit, entry)

  return (
    <div className="roster-entry">
      <div className="roster-entry-header">
        <div className="roster-entry-title">
          <span className="roster-entry-name">{unit.name}</span>
          {unit.isUnique && <span className="card-unique-badge">UNIQUE</span>}
        </div>
        <StatBoxes unit={unit} />
        <button
          type="button"
          className="roster-btn-remove"
          onClick={() => store.removeUnitEntry(roster.id, entry.id)}
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

      {unit.upgrades.length > 0 && (
        <div className="roster-entry-upgrades">
          {unit.upgrades.map((upgrade, i) => {
            const upgradePts = resolveScaledCost(upgrade.pts, entry.squadTierIndex)
            const checked = entry.upgradeIndexes.includes(i)
            return (
              <button
                key={i}
                type="button"
                className={`roster-upgrade-pill ${checked ? 'roster-upgrade-pill-active' : ''}`}
                onClick={() => store.toggleUnitUpgrade(roster.id, entry.id, i)}
              >
                {checked ? '✓' : '+'} {upgrade.ability.name} (+{upgradePts})
              </button>
            )
          })}
        </div>
      )}

      <div className="roster-entry-summary">
        Models: {tier?.modelMax ?? '-'} | Supply: {tier?.supply ?? '-'} | Cost: {cost}
      </div>
    </div>
  )
}
