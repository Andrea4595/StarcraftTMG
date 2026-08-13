import { useState } from 'react'
import type { RaceData, Roster, UnitType } from '../../types'
import { useRosterStore } from '../RosterContext'
import { TacticalCardView } from '../../components/card/TacticalCardView'
import { rosterGasCap, rosterGasTotal, rosterResourceTotal, rosterSlotUsage, TRACKED_UNIT_TYPES } from '../rosterCalc'
import { Modal } from './Modal'
import { SlotUsageRow } from './SlotUsageRow'

export function TacticalCardModal({
  race,
  roster,
  onClose,
}: {
  race: RaceData
  roster: Roster
  onClose: () => void
}) {
  const store = useRosterStore()
  const [typeFilter, setTypeFilter] = useState<UnitType | null>(null)
  const gasTotal = rosterGasTotal(race, roster)
  const gasCap = rosterGasCap(roster)
  const overGasCap = gasTotal > gasCap
  const resourceTotal = rosterResourceTotal(race, roster)
  /** 아직 수용량이 없는 타입도 빠짐없이 보여준다 (0인 타입은 회색으로 표시되지만, 눌러서 그 타입을 채워주는 카드를 찾을 수 있다) */
  const slotUsageByType = rosterSlotUsage(race, roster)
  const slotUsage = TRACKED_UNIT_TYPES.map(
    (unitType) => slotUsageByType.find((s) => s.unitType === unitType) ?? { unitType, budget: 0, used: 0 },
  )

  const factionCards = typeFilter
    ? race.factionCards.filter((card) => card.slot.some((s) => s.unitType === typeFilter))
    : race.factionCards

  const cards = typeFilter
    ? race.tacticalCards.filter((card) => card.slot.some((s) => s.unitType === typeFilter))
    : race.tacticalCards

  return (
    <Modal
      title="택티컬 카드 선택"
      onClose={onClose}
      subHeader={
        <>
          <div className="roster-resource-row">
            <div className={`roster-resource-pill roster-resource-gas ${overGasCap ? 'roster-budget-over' : ''}`}>
              <span className="roster-resource-label">가스</span>
              <span className="roster-resource-value">
                {gasTotal} / {gasCap}
              </span>
            </div>
            <div className="roster-resource-pill roster-resource-cp">
              <span className="roster-resource-label">{race.resourceLabel.abbr}</span>
              <span className="roster-resource-value">{resourceTotal}</span>
            </div>
          </div>
          <SlotUsageRow
            slotUsage={slotUsage}
            activeFilter={typeFilter}
            onFilterClick={(unitType) => setTypeFilter((current) => (current === unitType ? null : unitType))}
          />
        </>
      }
    >
      <span className="roster-section-title">팩션 카드</span>
      <div className="gallery-grid">
        {factionCards.map((card) => {
          const selected = roster.factionCardName === card.name
          return (
            <div key={card.name} className={`gallery-card-wrap ${selected ? 'gallery-card-selected' : ''}`}>
              <TacticalCardView card={card} resourceLabel={race.resourceLabel} isFactionCard />
              <button
                type="button"
                className={`gallery-select-toggle ${selected ? 'gallery-select-toggle-active' : ''}`}
                onClick={() => store.setFactionCard(roster.id, selected ? null : card.name)}
              >
                {selected ? '선택 해제' : '선택'}
              </button>
            </div>
          )
        })}
      </div>

      <hr className="modal-section-divider" />

      <span className="roster-section-title">택티컬 카드</span>
      <div className="gallery-grid">
        {cards.map((card) => {
          const count = roster.tacticalCardNames.filter((n) => n === card.name).length
          const atMax = card.isUnique && count > 0
          return (
            <div key={card.name} className={`gallery-card-wrap ${count > 0 ? 'gallery-card-selected' : ''}`}>
              <TacticalCardView card={card} resourceLabel={race.resourceLabel} />
              <div className="gallery-qty-stepper">
                {count > 0 && (
                  <>
                    <button
                      type="button"
                      className="gallery-qty-btn"
                      onClick={() => store.removeTacticalCard(roster.id, card.name)}
                      aria-label={`${card.name} 1장 빼기`}
                    >
                      −
                    </button>
                    <span className="gallery-qty-count">{count}</span>
                  </>
                )}
                <button
                  type="button"
                  className="gallery-qty-btn gallery-qty-btn-add"
                  disabled={atMax}
                  onClick={() => store.addTacticalCard(roster.id, card.name)}
                  aria-label={`${card.name} 추가`}
                >
                  +
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </Modal>
  )
}
