import { useState } from 'react'
import type { RaceData, Roster, RosterUnitEntry, UnitCard } from '../../types'
import { useRosterStore } from '../RosterContext'
import { UnitCardView } from '../../components/card/UnitCardView'
import { catalogSquadTierIndexes, findUnit, rosterMineralTotal, rosterSlotUsage } from '../rosterCalc'
import { makeId } from '../makeId'
import { UNIT_TYPE_COLORS } from '../unitTypeColor'
import { Modal } from './Modal'
import { SlotUsageRow } from './SlotUsageRow'

export function UnitModal({
  race,
  roster,
  mode,
  onClose,
}: {
  race: RaceData
  roster: Roster
  mode: { kind: 'add' } | { kind: 'edit'; entryId: string }
  onClose: () => void
}) {
  const store = useRosterStore()
  const [activeEntryId, setActiveEntryId] = useState<string | null>(mode.kind === 'edit' ? mode.entryId : null)

  const activeEntry = activeEntryId ? roster.units.find((e) => e.id === activeEntryId) : undefined
  const activeUnit = activeEntry ? findUnit(race, activeEntry.unitName) : undefined

  const mineralTotal = rosterMineralTotal(race, roster)
  const overMineralCap = mineralTotal > roster.mineralCap
  const slotUsage = rosterSlotUsage(race, roster)

  const subHeader = (
    <>
      <div className="roster-resource-row">
        <div className={`roster-resource-pill roster-resource-mineral ${overMineralCap ? 'roster-budget-over' : ''}`}>
          <span className="roster-resource-label">미네랄</span>
          <span className="roster-resource-value">
            {mineralTotal} / {roster.mineralCap}
          </span>
        </div>
      </div>
      <SlotUsageRow slotUsage={slotUsage} />
    </>
  )

  if (activeEntry && activeUnit) {
    return (
      <Modal title={`${activeUnit.name} 편집`} onClose={onClose}>
        <UnitConfigureView roster={roster} unit={activeUnit} entry={activeEntry} resourceLabel={race.resourceLabel.full} />
      </Modal>
    )
  }

  return (
    <Modal title="유닛 선택" subHeader={subHeader} onClose={onClose}>
      <div className="unit-picker-grid">
        {race.units.map((unit) => {
          const alreadyIncluded = unit.isUnique && roster.units.some((e) => e.unitName === unit.name)
          /** 'Other'는 어떤 카드로도 슬롯을 부여받지 않아 예산 개념이 없으므로 강조하지 않는다 */
          const typeColor = unit.type === 'Other' ? undefined : UNIT_TYPE_COLORS[unit.type]
          return (
            <div
              key={unit.name}
              className={`game-card unit-picker-tile ${alreadyIncluded ? 'unit-picker-tile-disabled' : ''}`}
              style={typeColor ? { borderLeftWidth: 3, borderLeftColor: typeColor } : undefined}
            >
              <div className="unit-picker-name">
                {unit.name}
                {unit.isUnique && <span className="card-unique-badge">UNIQUE</span>}
              </div>
              <div className="unit-picker-type" style={typeColor ? { color: typeColor } : undefined}>
                {unit.type}
              </div>
              <div className="unit-picker-tiers">
                {catalogSquadTierIndexes(unit).map((tierIndex) => {
                  const tier = unit.squad[tierIndex]
                  return (
                    <button
                      key={tierIndex}
                      type="button"
                      className="catalog-tier-btn"
                      disabled={alreadyIncluded}
                      onClick={() => {
                        const id = makeId()
                        store.addUnitEntry(roster.id, unit.name, tierIndex, id)
                        setActiveEntryId(id)
                      }}
                    >
                      Models: {tier.modelMax} Supply: {tier.supply}
                      <span className="catalog-tier-btn-pts">{tier.pts}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </Modal>
  )
}

function UnitConfigureView({
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
          onToggle: (index) => store.toggleUnitUpgrade(roster.id, entry.id, index),
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
