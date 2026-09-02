import { useState } from 'react'
import type { RaceData, Roster, TacticalCard, UnitType } from '../../types'
import { useRosterStore } from '../RosterContext'
import {
  rosterGasCap,
  rosterGasTotal,
  rosterResourceTotal,
  rosterSlotUsage,
  tacticalCardFactionMismatch,
  tacticalCardRequiredFactionCardId,
  TRACKED_UNIT_TYPES,
} from '../rosterCalc'
import { useLang, useLocalize } from '../../LangContext'
import { localizeTag } from '../../components/card/tagLabels'
import { UNIT_TYPE_COLORS } from '../unitTypeColor'
import { Modal } from './Modal'
import { SlotUsageRow } from './SlotUsageRow'
import { AbilityChipsRow, type AbilitySelectionRef } from './AbilityChipsRow'
import { AbilityDetailModal } from './AbilityDetailModal'

export function TacticalCardModal({
  race,
  roster,
  focusCardId,
  onClose,
}: {
  race: RaceData
  roster: Roster
  /** 지정하면 열리자마자 목록에서 이 카드 행을 강조 표시한다 (로스터 화면의 카드 칩에서 열었을 때) */
  focusCardId?: string
  onClose: () => void
}) {
  const store = useRosterStore()
  const [typeFilter, setTypeFilter] = useState<UnitType | null>(null)
  const [focusedId, setFocusedId] = useState<string | null>(focusCardId ?? null)
  const [abilityDetail, setAbilityDetail] = useState<AbilitySelectionRef | null>(null)

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
    <Modal title="택티컬 카드 선택" onClose={onClose}>
      <div className="tactical-picker-list">
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
              key={card.id}
              card={card}
              roster={roster}
              resourceAbbr={race.resourceLabel.abbr}
              active={roster.factionCardId === card.id}
              focused={focusedId === card.id}
              onFocusRow={() => setFocusedId(card.id)}
              onSelect={() => store.setFactionCard(roster.id, card.id)}
              onSelectAbility={setAbilityDetail}
            />
          ))}
        </div>

        <span className="roster-section-title">택티컬 카드</span>
        <div className="tactical-picker-rows">
          {cards.map((card) => (
            <TacticalPickerRow
              key={card.id}
              card={card}
              roster={roster}
              resourceAbbr={race.resourceLabel.abbr}
              count={roster.tacticalCardIds.filter((id) => id === card.id).length}
              focused={focusedId === card.id}
              onFocusRow={() => setFocusedId(card.id)}
              onAdd={() => store.addTacticalCard(roster.id, card.id)}
              onRemove={() => store.removeTacticalCard(roster.id, card.id)}
              onSelectAbility={setAbilityDetail}
            />
          ))}
        </div>
      </div>

      {abilityDetail?.kind === 'ability' && (
        <AbilityDetailModal
          detail={abilityDetail}
          onClose={() => setAbilityDetail(null)}
          roster={roster}
          race={race}
          resourceLabel={race.resourceLabel.abbr}
          onSelectAbility={setAbilityDetail}
        />
      )}
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

/**
 * 팩션 카드는 하나만 고를 수 있다: 고른 것만 밝게, 나머지는 어둡게. 카드 본문을 누르면(=onFocusRow)
 * 목록에서 이 행을 강조 표시하고, 실제 선택은 우측 '선택' 버튼(=onSelect)으로 분리한다.
 */
function FactionPickerRow({
  card,
  roster,
  resourceAbbr,
  active,
  focused,
  onFocusRow,
  onSelect,
  onSelectAbility,
}: {
  card: TacticalCard
  roster: Roster
  resourceAbbr: string
  active: boolean
  focused: boolean
  onFocusRow: () => void
  onSelect: () => void
  onSelectAbility: (ref: AbilitySelectionRef) => void
}) {
  const localize = useLocalize()
  return (
    <div
      className={`tactical-picker-row ${focused ? 'tactical-picker-row-active' : ''} ${
        active ? '' : 'tactical-picker-row-dimmed'
      }`}
      role="button"
      tabIndex={0}
      onClick={onFocusRow}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onFocusRow()
      }}
    >
      <div className="tactical-picker-row-header">
        <div className="tactical-picker-row-name">
          {localize(card.name)}
          {card.isUnique && <span className="tactical-picker-row-unique">UNIQUE</span>}
        </div>
        <CardCapacityMeta card={card} resourceAbbr={resourceAbbr} />
        <button
          type="button"
          className={`tactical-picker-select-btn ${active ? 'tactical-picker-select-btn-active' : ''}`}
          onClick={(e) => {
            e.stopPropagation()
            onSelect()
          }}
        >
          선택
        </button>
      </div>
      <AbilityChipsRow
        abilities={card.cardAbilities}
        sourceId={card.id}
        sourceLabel={localize(card.name)}
        roster={roster}
        onSelectAbility={onSelectAbility}
        localize={localize}
      />
    </div>
  )
}

function TacticalPickerRow({
  card,
  roster,
  resourceAbbr,
  count,
  focused,
  onFocusRow,
  onAdd,
  onRemove,
  onSelectAbility,
}: {
  card: TacticalCard
  roster: Roster
  resourceAbbr: string
  count: number
  focused: boolean
  onFocusRow: () => void
  onAdd: () => void
  onRemove: () => void
  onSelectAbility: (ref: AbilitySelectionRef) => void
}) {
  const localize = useLocalize()
  const { lang } = useLang()
  /** 태그로 요구하는 팩션 카드(예: 네라짐)가 지금 선택돼 있지 않으면 이 택티컬 카드는 추가할 수 없다 */
  const factionMismatch = tacticalCardFactionMismatch(card, roster)
  const requiredFactionTag = tacticalCardRequiredFactionCardId(card)
  const atMax = (card.isUnique && count > 0) || factionMismatch
  const cardName = localize(card.name)

  return (
    <div
      className={`tactical-picker-row ${focused ? 'tactical-picker-row-active' : ''} ${
        factionMismatch ? 'tactical-picker-row-dimmed' : ''
      }`}
      role="button"
      tabIndex={0}
      onClick={onFocusRow}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onFocusRow()
      }}
    >
      <div className="tactical-picker-row-header">
        <div className="tactical-picker-row-name">
          {cardName}
          {card.isUnique && <span className="tactical-picker-row-unique">UNIQUE</span>}
          {requiredFactionTag && <span className="card-faction-badge">{localizeTag(requiredFactionTag, lang)}</span>}
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
                    onFocusRow()
                    onRemove()
                  }}
                  aria-label={`${cardName} 1장 빼기`}
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
                onFocusRow()
                onAdd()
              }}
              aria-label={`${cardName} 추가`}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <AbilityChipsRow
        abilities={card.cardAbilities}
        sourceId={card.id}
        sourceLabel={cardName}
        roster={roster}
        onSelectAbility={onSelectAbility}
        localize={localize}
      />
    </div>
  )
}
