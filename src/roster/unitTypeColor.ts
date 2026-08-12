import type { UnitType } from '../types'

/** 유닛 타입별 강조색. 택티컬/팩션 카드의 슬롯 표시줄과 동일한 색 언어를 공유한다 */
export const UNIT_TYPE_COLORS: Record<UnitType, string> = {
  Hero: '#c084fc',
  Core: '#5b9dff',
  Elite: '#ff8a5b',
  Support: '#4ade80',
  Other: '#22d3ee',
}
