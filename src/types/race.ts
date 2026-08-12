import type { TacticalCard, UnitCard } from './card'

export const RACES = ['Terran', 'Zerg', 'Protoss'] as const
export type Race = (typeof RACES)[number]

export interface ResourceLabel {
  /** 카드 능력 비용 배지 등에 쓰이는 전체 명칭. 예: 'Command Point' */
  full: string
  /** 리소스 총량 표기에 쓰이는 축약형. 예: 'CP' */
  abbr: string
}

export interface RaceData {
  id: string
  race: Race
  name: string
  /** 이 종족의 카드 능력/자원 비용 명칭. 종족마다 다름 (테란 CP, 저그 BM 등) */
  resourceLabel: ResourceLabel
  /** 이 종족에서 로스터당 정확히 하나 선택하는 팩션 카드들 */
  factionCards: TacticalCard[]
  /** 팩션 카드 외에 로스터에 선택적으로 포함시킬 수 있는 종족 공용 택티컬 카드 풀 */
  tacticalCards: TacticalCard[]
  /** 이 종족의 공용 유닛 풀 */
  units: UnitCard[]
}
