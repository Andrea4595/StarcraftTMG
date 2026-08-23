import type { RaceData, Roster } from '../../types'
import { useRosterStore } from '../RosterContext'
import { catalogSquadTierIndexes, rosterMineralTotal, rosterSlotUsage } from '../rosterCalc'
import { makeId } from '../makeId'
import { UNIT_TYPE_COLORS } from '../unitTypeColor'
import { useLocalize } from '../../LangContext'
import { Modal } from './Modal'
import { SlotUsageRow } from './SlotUsageRow'

export function UnitModal({
  race,
  roster,
  onAdded,
  onClose,
}: {
  race: RaceData
  roster: Roster
  /** 유닛을 로스터에 추가한 직후 호출 */
  onAdded: () => void
  onClose: () => void
}) {
  const store = useRosterStore()
  const localize = useLocalize()

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

  return (
    <Modal title="유닛 선택" subHeader={subHeader} onClose={onClose}>
      <div className="unit-picker-grid">
        {race.units.map((unit) => {
          const alreadyIncluded = unit.isUnique && roster.units.some((e) => e.unitId === unit.id)
          /** 'Other'는 어떤 카드로도 슬롯을 부여받지 않아 예산 개념이 없으므로 강조하지 않는다 */
          const typeColor = unit.type === 'Other' ? undefined : UNIT_TYPE_COLORS[unit.type]
          return (
            <div
              key={unit.id}
              className={`game-card unit-picker-tile ${alreadyIncluded ? 'unit-picker-tile-disabled' : ''}`}
              style={typeColor ? { borderLeftWidth: 3, borderLeftColor: typeColor } : undefined}
            >
              <div className="unit-picker-name">
                {localize(unit.name)}
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
                        store.addUnitEntry(roster.id, unit.id, tierIndex, makeId())
                        onAdded()
                      }}
                    >
                      <span className="catalog-tier-btn-top">
                        <span className="roster-squad-tier-supply">
                          {tier.supply === 0 ? (
                            <span className="roster-squad-tier-supply-empty">×</span>
                          ) : (
                            Array.from({ length: tier.supply }).map((_, j) => (
                              <span className="roster-squad-tier-supply-square" key={j} />
                            ))
                          )}
                        </span>
                        {tier.modelMax}
                      </span>
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
