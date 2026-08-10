import type { TacticalCard, UnitCard } from './card'

export interface Faction {
  id: string
  name: string
  /** 팩션을 정의하는 대표 택티컬 카드 */
  factionCard: TacticalCard
  tacticalCards: TacticalCard[]
  units: UnitCard[]
}
