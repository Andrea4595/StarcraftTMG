import type { Roster, RosterUnitEntry, UnitCard } from '../../types'
import { useRosterStore } from '../RosterContext'
import { resolveScaledCost, unitEntryMineralCost, unitEquippedUpgrades } from '../rosterCalc'
import { StatBoxes } from '../../components/card/StatBoxes'

export function UnitEntryRow({
  roster,
  unit,
  entry,
  active,
  onEdit,
}: {
  roster: Roster
  unit: UnitCard
  entry: RosterUnitEntry
  /** 이 유닛이 지금 오른쪽 상세 패널에 표시되고 있는지 */
  active?: boolean
  onEdit: () => void
}) {
  const store = useRosterStore()
  const tier = unit.squad[entry.squadTierIndex]
  const cost = unitEntryMineralCost(unit, entry)
  const equippedUpgrades = unitEquippedUpgrades(unit, entry)
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
          <span className="roster-entry-name">{unit.name}</span>
          {unit.isUnique && <span className="card-unique-badge">UNIQUE</span>}
        </div>
        <StatBoxes unit={unit} />
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

      <div className="roster-entry-footer">
        <div className="roster-entry-summary">
          Models: {tier?.modelMax ?? '-'} | Supply: {tier?.supply ?? '-'} | Cost: {cost}
        </div>
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
  )
}
