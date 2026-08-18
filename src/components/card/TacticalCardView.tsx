import type { TacticalCard } from '../../types'
import { AbilitiesSection, type FavoriteToggle } from './AbilitiesSection'

export function TacticalCardView({
  card,
  resourceLabel,
  isFactionCard = false,
  count,
  favorite,
}: {
  card: TacticalCard
  /** 이 종족의 자원 명칭 (전체/축약형) */
  resourceLabel: { full: string; abbr: string }
  /** 팩션을 정의하는 대표 카드인지 (헤더 서브타이틀 표시용) */
  isFactionCard?: boolean
  /** 로스터에 이 카드가 몇 장 포함됐는지. 2장 이상이면 이름 옆에 배지로 표시 */
  count?: number
  /** 지정하면 능력 이름 옆에 즐겨찾기 별 버튼이 붙는다 (게임 레퍼런스 화면 전용) */
  favorite?: FavoriteToggle
}) {
  const subtitle = isFactionCard ? 'Faction Card' : card.gasPts !== undefined ? `${card.gasPts} Gas` : ''

  return (
    <div className="game-card">
      <div className="card-header">
        <div>
          <div className="card-title">
            {card.name}
            {card.isUnique && <span className="card-unique-badge">UNIQUE</span>}
            {count !== undefined && count > 1 && <span className="card-count-badge">x{count}</span>}
          </div>
          <div className="card-subtitle">{subtitle}</div>
        </div>
      </div>

      <div className="card-body-top">
        <div className="card-top-right">
          <div className="card-slot-list">
            {card.resource > 0 && (
              <div className="card-slot-row card-slot-row-resource">
                <span>RESOURCE</span>
                <span>+{card.resource} {resourceLabel.abbr}</span>
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

      <AbilitiesSection
        abilities={card.cardAbilities}
        resourceLabel={resourceLabel.abbr}
        title="CARD ABILITIES"
        favorite={favorite}
      />
    </div>
  )
}
