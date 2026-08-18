import type { RaceData, Roster } from '../../types'
import {
  findFactionCard,
  findUnit,
  groupedTacticalCards,
  resolveScaledCost,
  unitEntryMineralCost,
  unitEquippedUpgrades,
} from '../rosterCalc'
import { unitStatEntries } from '../../components/card/StatBoxes'
import type { ReferenceDetailTarget } from './GameReferencePage'

export function GameReferenceCardsView({
  race,
  roster,
  onSelect,
}: {
  race: RaceData
  roster: Roster
  onSelect: (target: ReferenceDetailTarget) => void
}) {
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
                <button type="button" className="game-ref-item" onClick={() => onSelect({ kind: 'faction' })}>
                  <div className="game-ref-item-row">
                    <span className="game-ref-item-name">{factionCard.name}</span>
                    <span className="game-ref-item-tag">Faction Card</span>
                    {factionCard.resource > 0 && (
                      <span className="game-ref-resource-badge">
                        +{factionCard.resource} {race.resourceLabel.abbr}
                      </span>
                    )}
                  </div>
                </button>
              </li>
            )}
            {tacticalCardGroups.map(({ card, count }) => (
              <li key={card.name}>
                <button
                  type="button"
                  className="game-ref-item"
                  onClick={() => onSelect({ kind: 'tactical', name: card.name })}
                >
                  <div className="game-ref-item-row">
                    <span className="game-ref-item-name">{card.name}</span>
                    {count > 1 && <span className="game-ref-item-tag">x{count}</span>}
                    {card.resource > 0 && (
                      <span className="game-ref-resource-badge">
                        +{card.resource} {race.resourceLabel.abbr}
                      </span>
                    )}
                  </div>
                </button>
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
              const unit = findUnit(race, entry.unitName)
              if (!unit) return null
              const tier = unit.squad[entry.squadTierIndex]
              const upgrades = unitEquippedUpgrades(unit, entry)
              return (
                <li key={entry.id}>
                  <button
                    type="button"
                    className="game-ref-item"
                    onClick={() => onSelect({ kind: 'unit', entryId: entry.id })}
                  >
                    <div className="game-ref-item-row">
                      <span className="game-ref-supply">
                        {Array.from({ length: tier?.supply ?? 0 }).map((_, i) => (
                          <span className="game-ref-supply-square" key={i} />
                        ))}
                      </span>
                      <span className="game-ref-item-name">{unit.name}</span>
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
                    {upgrades.length > 0 && (
                      <div className="game-ref-upgrades-row">
                        {upgrades.map((upgrade, i) => (
                          <span className="game-ref-upgrade-chip" key={i}>
                            {upgrade.ability.name} (+{resolveScaledCost(upgrade.pts, entry.squadTierIndex)})
                          </span>
                        ))}
                      </div>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </>
      )}
    </div>
  )
}
