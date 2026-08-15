import { useState } from 'react'
import type { RaceData, Roster, TacticalCard, UnitType } from '../../types'
import { useRosterStore } from '../RosterContext'
import { TacticalCardView } from '../../components/card/TacticalCardView'
import { rosterGasCap, rosterGasTotal, rosterResourceTotal, rosterSlotUsage, TRACKED_UNIT_TYPES } from '../rosterCalc'
import { UNIT_TYPE_COLORS } from '../unitTypeColor'
import { Modal } from './Modal'
import { SlotUsageRow } from './SlotUsageRow'

export function TacticalCardModal({
  race,
  roster,
  focusCardName,
  onClose,
}: {
  race: RaceData
  roster: Roster
  /** 지정하면 열리자마자 왼쪽 상세 패널에 이 카드를 보여준다 */
  focusCardName?: string
  onClose: () => void
}) {
  const store = useRosterStore()
  const [typeFilter, setTypeFilter] = useState<UnitType | null>(null)
  const [focusedName, setFocusedName] = useState<string | null>(focusCardName ?? null)

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

  const focusedFaction = race.factionCards.find((c) => c.name === focusedName)
  const focusedTactical = !focusedFaction ? race.tacticalCards.find((c) => c.name === focusedName) : undefined

  return (
    <Modal title="택티컬 카드 선택" onClose={onClose}>
      <div className="tactical-picker">
        <div className="tactical-picker-detail">
          <div className="tactical-picker-sticky-top">
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
          </div>
          {focusedFaction ? (
            <TacticalCardView card={focusedFaction} resourceLabel={race.resourceLabel} isFactionCard />
          ) : focusedTactical ? (
            <TacticalCardView card={focusedTactical} resourceLabel={race.resourceLabel} />
          ) : (
            <div className="roster-detail-empty">카드를 선택하면 상세 정보가 여기에 표시됩니다.</div>
          )}
        </div>

        <div className="tactical-picker-list">
          <div className="tactical-picker-sticky-top">
            <SlotUsageRow
              slotUsage={slotUsage}
              activeFilter={typeFilter}
              onFilterClick={(unitType) => setTypeFilter((current) => (current === unitType ? null : unitType))}
            />
          </div>

          <span className="roster-section-title">팩션 카드</span>
          <div className="tactical-picker-rows">
            {factionCards.map((card) => (
              <FactionPickerRow
                key={card.name}
                card={card}
                resourceAbbr={race.resourceLabel.abbr}
                active={roster.factionCardName === card.name}
                focused={focusedName === card.name}
                onSelect={() => {
                  store.setFactionCard(roster.id, card.name)
                  setFocusedName(card.name)
                }}
              />
            ))}
          </div>

          <span className="roster-section-title">택티컬 카드</span>
          <div className="tactical-picker-rows">
            {cards.map((card) => (
              <TacticalPickerRow
                key={card.name}
                card={card}
                resourceAbbr={race.resourceLabel.abbr}
                count={roster.tacticalCardNames.filter((n) => n === card.name).length}
                focused={focusedName === card.name}
                onFocus={() => setFocusedName(card.name)}
                onAdd={() => store.addTacticalCard(roster.id, card.name)}
                onRemove={() => store.removeTacticalCard(roster.id, card.name)}
              />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}

/** 카드가 제공하는 자원(CP/BM/EN)과 유닛 수용량. 팩션/택티컬 카드 공용 */
function CardCapacityMeta({ card, resourceAbbr }: { card: TacticalCard; resourceAbbr: string }) {
  return (
    <div className="tactical-picker-row-meta">
      {card.resource > 0 && (
        <span>
          +{card.resource} {resourceAbbr}
        </span>
      )}
      <span className="tactical-picker-row-slots">
        {card.slot.map((s) => (
          <span key={s.unitType} style={{ color: UNIT_TYPE_COLORS[s.unitType] }}>
            {s.unitType} {s.count}
          </span>
        ))}
      </span>
    </div>
  )
}

/** 팩션 카드는 하나만 고를 수 있어 +/- 대신 클릭으로 바로 선택되는 탭처럼 동작한다: 고른 것만 밝게, 나머지는 어둡게 */
function FactionPickerRow({
  card,
  resourceAbbr,
  active,
  focused,
  onSelect,
}: {
  card: TacticalCard
  resourceAbbr: string
  active: boolean
  focused: boolean
  onSelect: () => void
}) {
  return (
    <div
      className={`tactical-picker-row ${focused ? 'tactical-picker-row-active' : ''} ${
        active ? '' : 'tactical-picker-row-dimmed'
      }`}
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onSelect()
      }}
    >
      <div className="tactical-picker-row-name">
        {card.name}
        {card.isUnique && <span className="tactical-picker-row-unique">UNIQUE</span>}
      </div>
      <CardCapacityMeta card={card} resourceAbbr={resourceAbbr} />
    </div>
  )
}

function TacticalPickerRow({
  card,
  resourceAbbr,
  count,
  focused,
  onFocus,
  onAdd,
  onRemove,
}: {
  card: TacticalCard
  resourceAbbr: string
  count: number
  focused: boolean
  onFocus: () => void
  onAdd: () => void
  onRemove: () => void
}) {
  const atMax = card.isUnique && count > 0

  return (
    <div
      className={`tactical-picker-row ${focused ? 'tactical-picker-row-active' : ''}`}
      role="button"
      tabIndex={0}
      onClick={onFocus}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onFocus()
      }}
    >
      <div className="tactical-picker-row-name">
        {card.name}
        {card.isUnique && <span className="tactical-picker-row-unique">UNIQUE</span>}
      </div>
      <CardCapacityMeta card={card} resourceAbbr={resourceAbbr} />
      {/*
        가스와 증감 버튼은 항상 같이 붙어 있어야 하는 한 덩어리다. 폭이 좁아 줄바꿈이 필요해지면
        이 덩어리 전체가 통째로 다음 줄로 내려가 깔끔하게 오른쪽 정렬된 채 표시된다 (가스만 먼저
        떨어지거나 증감 버튼만 따로 떨어져 흐트러지는 것을 막는다).
      */}
      <div className="tactical-picker-row-cost">
        {/* 카드를 고르는 데 드는 가스는 중요한 정보라 +/- 버튼 앞에 항상 같은 위치로 열을 맞춰 강조한다 */}
        <div className="tactical-picker-row-gas">{card.gasPts !== undefined ? `${card.gasPts} Gas` : ''}</div>
        <div className="tactical-picker-row-qty">
          {count > 0 && (
            <>
              <button
                type="button"
                className="gallery-qty-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  onFocus()
                  onRemove()
                }}
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
            onClick={(e) => {
              e.stopPropagation()
              onFocus()
              onAdd()
            }}
            aria-label={`${card.name} 추가`}
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}
