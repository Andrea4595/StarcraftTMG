import type { Ability, RaceData, Roster, Rule, UnitType } from '../../types'
import { findFactionCard, findUnit, groupedTacticalCards, isFavoriteAbility, unitActiveAbilities, unitEntryMineralCost } from '../rosterCalc'
import { unitStatEntries } from '../../components/card/StatBoxes'
import { useLocalize } from '../../LangContext'
import type { AbilityDetailRef, ReferenceDetailTarget } from './GameReferencePage'

/** 어빌리티/무기 프로필 칩 한 줄. 눌러진 칩은 즉시 그 능력만 담은 상세 모달을 띄운다(부모 카드/유닛의
 *  전체 상세를 여는 클릭과 겹치지 않도록 stopPropagation한다). 즐겨찾기된 룰 능력은 이름 앞에 별표를 붙인다 */
function AbilityChipsRow({
  abilities,
  sourceId,
  sourceLabel,
  unitType,
  roster,
  onSelectAbility,
  localize,
}: {
  abilities: Ability[]
  sourceId: string
  sourceLabel: string
  unitType?: UnitType
  roster: Roster
  onSelectAbility: (ref: AbilityDetailRef) => void
  localize: (rule: Rule) => string
}) {
  if (abilities.length === 0) return null
  return (
    <div className="game-ref-upgrades-row">
      {abilities.map((ability, i) => {
        const favorited = ability.kind === 'rule' && isFavoriteAbility(roster, sourceId, ability.id)
        return (
          <button
            type="button"
            className="game-ref-upgrade-chip"
            key={i}
            onClick={(e) => {
              e.stopPropagation()
              onSelectAbility({ ability, sourceLabel, sourceId, unitType })
            }}
          >
            {favorited && <span className="game-ref-chip-star">★</span>}
            {localize(ability.name)}
          </button>
        )
      })}
    </div>
  )
}

export function GameReferenceCardsView({
  race,
  roster,
  onSelect,
  onSelectAbility,
}: {
  race: RaceData
  roster: Roster
  onSelect: (target: ReferenceDetailTarget) => void
  onSelectAbility: (ref: AbilityDetailRef) => void
}) {
  const localize = useLocalize()
  const factionCard = findFactionCard(race, roster)
  const tacticalCardGroups = groupedTacticalCards(race, roster)
  const isEmpty = !factionCard && tacticalCardGroups.length === 0 && roster.units.length === 0

  if (isEmpty) {
    return <div className="game-ref-empty">아직 선택한 카드/유닛이 없습니다.</div>
  }

  return (
    <div className="game-ref-cards">
      {(factionCard || tacticalCardGroups.length > 0) && (
        <>
          <div className="game-ref-section-title">택티컬 카드</div>
          <ul className="game-ref-list">
            {factionCard && (
              <li>
                <div
                  className="game-ref-item"
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelect({ kind: 'faction' })}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') onSelect({ kind: 'faction' })
                  }}
                >
                  <div className="game-ref-item-row">
                    <span className="game-ref-item-name">{localize(factionCard.name)}</span>
                    <span className="game-ref-item-tag">Faction Card</span>
                    {factionCard.resource > 0 && (
                      <span className="game-ref-resource-badge">
                        +{factionCard.resource} {race.resourceLabel.abbr}
                      </span>
                    )}
                  </div>
                  <AbilityChipsRow
                    abilities={factionCard.cardAbilities}
                    sourceId={factionCard.id}
                    sourceLabel={localize(factionCard.name)}
                    roster={roster}
                    onSelectAbility={onSelectAbility}
                    localize={localize}
                  />
                </div>
              </li>
            )}
            {tacticalCardGroups.map(({ card, count }) => (
              <li key={card.id}>
                <div
                  className="game-ref-item"
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelect({ kind: 'tactical', id: card.id })}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') onSelect({ kind: 'tactical', id: card.id })
                  }}
                >
                  <div className="game-ref-item-row">
                    <span className="game-ref-item-name">{localize(card.name)}</span>
                    {count > 1 && <span className="game-ref-item-tag">x{count}</span>}
                    {card.resource > 0 && (
                      <span className="game-ref-resource-badge">
                        +{card.resource} {race.resourceLabel.abbr}
                      </span>
                    )}
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
              </li>
            ))}
          </ul>
        </>
      )}

      {roster.units.length > 0 && (
        <>
          <div className="game-ref-section-title">유닛 ({roster.units.length})</div>
          <ul className="game-ref-list">
            {roster.units.map((entry) => {
              const unit = findUnit(race, entry.unitId)
              if (!unit) return null
              const tier = unit.squad[entry.squadTierIndex]
              const activeAbilities = unitActiveAbilities(unit, entry)
              return (
                <li key={entry.id}>
                  <div
                    className="game-ref-item"
                    role="button"
                    tabIndex={0}
                    onClick={() => onSelect({ kind: 'unit', entryId: entry.id })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') onSelect({ kind: 'unit', entryId: entry.id })
                    }}
                  >
                    <div className="game-ref-item-row">
                      <span className="game-ref-supply">
                        {Array.from({ length: tier?.supply ?? 0 }).map((_, i) => (
                          <span className="game-ref-supply-square" key={i} />
                        ))}
                      </span>
                      <span className="game-ref-item-name">{localize(unit.name)}</span>
                      {tier && <span className="game-ref-item-tag">{tier.modelMax} Models</span>}
                      <span className="game-ref-item-cost">{unitEntryMineralCost(unit, entry)}</span>
                    </div>
                    <div className="game-ref-item-stats">
                      {unitStatEntries(unit).map(({ label, value }) => (
                        <span className="game-ref-item-stat" key={label}>
                          <span className="game-ref-item-stat-label">{label}</span>
                          <span className="game-ref-item-stat-value">{value}</span>
                        </span>
                      ))}
                    </div>
                    <AbilityChipsRow
                      abilities={activeAbilities}
                      sourceId={unit.id}
                      sourceLabel={localize(unit.name)}
                      unitType={unit.type}
                      roster={roster}
                      onSelectAbility={onSelectAbility}
                      localize={localize}
                    />
                  </div>
                </li>
              )
            })}
          </ul>
        </>
      )}
    </div>
  )
}
