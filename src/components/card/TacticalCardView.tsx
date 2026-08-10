import type { TacticalCard } from '../../types'
import { AbilitiesSection } from './AbilitiesSection'

export function TacticalCardView({
  card,
  isFactionCard = false,
}: {
  card: TacticalCard
  /** 팩션을 정의하는 대표 카드인지 (헤더 서브타이틀 표시용) */
  isFactionCard?: boolean
}) {
  const subtitle = isFactionCard ? 'Faction Card' : card.gasPts !== undefined ? `${card.gasPts} Gas` : ''

  return (
    <div className="game-card">
      <div className="card-header">
        <div>
          <div className="card-title">
            {card.name}
            {card.isUnique && <span className="card-unique-badge">UNIQUE</span>}
          </div>
          <div className="card-subtitle">{subtitle}</div>
        </div>
      </div>

      <div className="card-body-top">
        <div className="card-thumb">ART PLACEHOLDER</div>
        <div className="card-top-right">
          <div className="card-slot-list">
            {card.resource > 0 && (
              <div className="card-slot-row card-slot-row-resource">
                <span>RESOURCE</span>
                <span>+{card.resource} CP</span>
              </div>
            )}
            {card.slot.map((s, i) => (
              <div className={`card-slot-row card-slot-row-${s.unitType.toLowerCase()}`} key={i}>
                <span>{s.unitType.toUpperCase()} SLOT</span>
                <span>{s.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AbilitiesSection abilities={card.cardAbilities} title="CARD ABILITIES" />
    </div>
  )
}
