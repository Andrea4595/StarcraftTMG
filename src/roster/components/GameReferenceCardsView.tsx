import type { RaceData, Roster } from '../../types'
import { findUnit, isCardConsumed, referenceCardSlots } from '../rosterCalc'
import { useRosterStore } from '../RosterContext'
import { useLocalize } from '../../LangContext'
import { AbilityChipsRow, type AbilitySelectionRef } from './AbilityChipsRow'
import { UnitEntryRow } from './UnitEntryRow'
import type { ReferenceDetailTarget } from './GameReferencePage'

export function GameReferenceCardsView({
  race,
  roster,
  onSelect,
  onSelectAbility,
}: {
  race: RaceData
  roster: Roster
  onSelect: (target: ReferenceDetailTarget) => void
  onSelectAbility: (ref: AbilitySelectionRef) => void
}) {
  const store = useRosterStore()
  const localize = useLocalize()
  /** 같은 택티컬 카드를 여러 장 채용했으면 장마다 따로 소모 처리할 수 있도록 'x2'로 묶지 않고 한 장씩 나열한다 */
  const cardSlots = referenceCardSlots(race, roster)
  const isEmpty = cardSlots.length === 0 && roster.units.length === 0

  if (isEmpty) {
    return <div className="game-ref-empty">아직 선택한 카드/유닛이 없습니다.</div>
  }

  return (
    <div className="game-ref-cards">
      {cardSlots.length > 0 && (
        <section className="game-ref-column">
          <div className="game-ref-section-title">택티컬 카드</div>
          <ul className="game-ref-list">
            {cardSlots.map(({ card, isFactionCard, key }) => {
              const consumed = isCardConsumed(roster, key)
              return (
                <li key={key}>
                  <div className={`game-ref-item game-ref-item-static game-ref-card-item ${consumed ? 'game-ref-card-item-consumed' : ''}`}>
                    <div className="game-ref-card-item-content">
                      <div className="game-ref-item-row">
                        <span className="game-ref-supply">
                          {Array.from({ length: card.resource }).map((_, i) => (
                            <span className="game-ref-resource-square" key={i} />
                          ))}
                        </span>
                        <span className="game-ref-item-name">{localize(card.name)}</span>
                        {isFactionCard && <span className="game-ref-item-tag">Faction Card</span>}
                      </div>
                      <AbilityChipsRow
                        abilities={card.cardAbilities}
                        sourceId={card.id}
                        sourceLabel={localize(card.name)}
                        onSelectAbility={onSelectAbility}
                        localize={localize}
                      />
                    </div>
                    <button
                      type="button"
                      className={`game-ref-consume-btn ${consumed ? 'game-ref-consume-btn-active' : ''}`}
                      aria-pressed={consumed}
                      onClick={() => store.toggleConsumedCard(roster.id, key)}
                    >
                      소모
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>
      )}

      {roster.units.length > 0 && (
        <section className="game-ref-column">
          <div className="game-ref-section-title">유닛 ({roster.units.length})</div>
          <ul className="game-ref-list">
            {roster.units.map((entry) => {
              const unit = findUnit(race, entry.unitId)
              if (!unit) return null
              return (
                <li key={entry.id}>
                  <UnitEntryRow
                    race={race}
                    roster={roster}
                    unit={unit}
                    entry={entry}
                    interactive={false}
                    onShowDetail={() => onSelect({ kind: 'unit', entryId: entry.id })}
                    onSelectAbility={onSelectAbility}
                  />
                </li>
              )
            })}
          </ul>
        </section>
      )}
    </div>
  )
}
