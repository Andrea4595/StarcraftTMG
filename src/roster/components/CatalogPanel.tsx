import { useState } from 'react'
import type { Faction, Roster } from '../../types'
import { useRosterStore } from '../RosterContext'
import { UnitCardView } from '../../components/card/UnitCardView'
import { TacticalCardView } from '../../components/card/TacticalCardView'
import { catalogSquadTierIndexes } from '../rosterCalc'

export function CatalogPanel({ faction, roster }: { faction: Faction; roster: Roster }) {
  const store = useRosterStore()
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div className="catalog-panel">
      <div className="roster-section-title">택티컬 카드</div>
      <div className="catalog-list">
        {faction.tacticalCards.map((card) => {
          const included = roster.tacticalCardNames.includes(card.name)
          const isOpen = expanded === card.name
          return (
            <div className="catalog-item" key={card.name}>
              <div className="catalog-item-row">
                <button type="button" className="catalog-item-name" onClick={() => setExpanded(isOpen ? null : card.name)}>
                  {card.name}
                </button>
                <span className="catalog-item-cost">{card.gasPts ?? 0} GAS</span>
                <button type="button" onClick={() => store.toggleTacticalCard(roster.id, card.name)}>
                  {included ? '제외' : '포함'}
                </button>
              </div>
              {isOpen && (
                <div className="catalog-item-detail">
                  <TacticalCardView card={card} />
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="roster-section-title">유닛</div>
      <div className="catalog-list">
        {faction.units.map((unit) => {
          const alreadyIncluded = unit.isUnique && roster.units.some((e) => e.unitName === unit.name)
          const isOpen = expanded === unit.name
          return (
            <div className="catalog-item" key={unit.name}>
              <div className="catalog-item-row">
                <button type="button" className="catalog-item-name" onClick={() => setExpanded(isOpen ? null : unit.name)}>
                  {unit.name}
                </button>
                <span className="catalog-item-type">{unit.type}</span>
              </div>
              <div className="catalog-tier-row">
                {catalogSquadTierIndexes(unit).map((tierIndex) => {
                  const tier = unit.squad[tierIndex]
                  return (
                    <button
                      key={tierIndex}
                      type="button"
                      className="catalog-tier-btn"
                      disabled={alreadyIncluded}
                      onClick={() => store.addUnitEntry(roster.id, unit.name, tierIndex)}
                    >
                      Models: {tier.modelMax} Supply: {tier.supply}
                      <span className="catalog-tier-btn-pts">{tier.pts}</span>
                    </button>
                  )
                })}
                {alreadyIncluded && <span className="catalog-item-included">포함됨</span>}
              </div>
              {isOpen && (
                <div className="catalog-item-detail">
                  <UnitCardView unit={unit} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
