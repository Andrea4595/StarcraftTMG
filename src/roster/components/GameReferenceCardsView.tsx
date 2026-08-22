import type { RaceData, Roster } from '../../types'
import {
  FIRE_LABEL,
  MELEE_LABEL,
  findFactionCard,
  findUnit,
  groupedTacticalCards,
  unitActiveAbilities,
  unitEntryMineralCost,
  unitForLabelResolver,
  unitMeleeWeaponEntries,
  unitRangedWeaponEntries,
} from '../rosterCalc'
import { StatBoxes } from '../../components/card/StatBoxes'
import { useLocalize } from '../../LangContext'
import { AbilityChipsRow, type AbilitySelectionRef, type WeaponSummaryInput } from './AbilityChipsRow'
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
                <div className="game-ref-item game-ref-item-static">
                  <div className="game-ref-item-row">
                    <span className="game-ref-supply">
                      {Array.from({ length: factionCard.resource }).map((_, i) => (
                        <span className="game-ref-resource-square" key={i} />
                      ))}
                    </span>
                    <span className="game-ref-item-name">{localize(factionCard.name)}</span>
                    <span className="game-ref-item-tag">Faction Card</span>
                  </div>
                  <AbilityChipsRow
                    abilities={factionCard.cardAbilities}
                    sourceId={factionCard.id}
                    sourceLabel={localize(factionCard.name)}
                    roster={roster}
                    onSelectAbility={onSelectAbility}
                    localize={localize}
                    showFavorite
                  />
                </div>
              </li>
            )}
            {tacticalCardGroups.map(({ card, count }) => (
              <li key={card.id}>
                <div className="game-ref-item game-ref-item-static">
                  <div className="game-ref-item-row">
                    <span className="game-ref-supply">
                      {Array.from({ length: card.resource }).map((_, i) => (
                        <span className="game-ref-resource-square" key={i} />
                      ))}
                    </span>
                    <span className="game-ref-item-name">{localize(card.name)}</span>
                    {count > 1 && <span className="game-ref-item-tag">x{count}</span>}
                  </div>
                  <AbilityChipsRow
                    abilities={card.cardAbilities}
                    sourceId={card.id}
                    sourceLabel={localize(card.name)}
                    roster={roster}
                    onSelectAbility={onSelectAbility}
                    localize={localize}
                    showFavorite
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
              const rangedSummary = unitRangedWeaponEntries(unit, entry, localize)
              const meleeSummary = unitMeleeWeaponEntries(unit, entry, localize)
              const weaponSummaries: WeaponSummaryInput[] = [
                { entryId: entry.id, phase: 'Assault', label: FIRE_LABEL, entries: rangedSummary },
                { entryId: entry.id, phase: 'Combat', label: MELEE_LABEL, entries: meleeSummary },
              ]
              const nonWeaponSummaryAbilities = unitActiveAbilities(unit, entry).filter(
                (a) => !(a.kind === 'weapon' && (a.phase === 'Assault' || a.phase === 'Combat')),
              )
              const forFor = unitForLabelResolver(unit, localize)
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
                      <StatBoxes unit={unit} />
                    </div>
                    <AbilityChipsRow
                      abilities={nonWeaponSummaryAbilities}
                      weaponSummaries={weaponSummaries}
                      hideInactiveWeaponNames
                      sourceId={unit.id}
                      sourceLabel={localize(unit.name)}
                      unitType={unit.type}
                      roster={roster}
                      onSelectAbility={onSelectAbility}
                      localize={localize}
                      forFor={forFor}
                      showFavorite
                    />
                    <div className="game-ref-item-mineral-cost">{unitEntryMineralCost(unit, entry)}</div>
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
