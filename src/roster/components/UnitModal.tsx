import type { RaceData, Roster } from '../../types'
import { useRosterStore } from '../RosterContext'
import { catalogSquadTierIndexes, rosterMineralTotal, rosterSlotUsage } from '../rosterCalc'
import { makeId } from '../makeId'
import { UNIT_TYPE_COLORS } from '../unitTypeColor'
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
  /** 유닛을 로스터에 추가한 직후 호출. 상세 정보는 모달이 아니라 메인 화면 우측 패널에서 보여준다 */
  onAdded: (entryId: string) => void
  onClose: () => void
}) {
  const store = useRosterStore()

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
                        onAdded(id)
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
