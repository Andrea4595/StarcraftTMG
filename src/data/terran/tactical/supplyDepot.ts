import type { TacticalCard } from '../../../types'

export const supplyDepot: TacticalCard = {
  category: 'tactical',
  id: 'Supply Depot',
  name: { en: 'Supply Depot', ko: 'Supply Depot' },
  isUnique: true,
  gasPts: 40,
  resource: 1,
  slot: [
    { unitType: 'Hero', count: 1 },
    { unitType: 'Elite', count: 1 },
    { unitType: 'Core', count: 1 },
  ],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Additional Supply Depots',
      name: { en: 'Additional Supply Depots', ko: 'Additional Supply Depots' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Unit's Supply Value is improved by 1 for Controlling and Contesting Mission Markers and completing objectives.",
        ko: '활성화중인 유닛이 미션 마커를 제어, 경쟁, 점령, 목표 달성 조건 계산에서 서플라이 값을 1 증가시킨다.',
      },
    },
  ],
}
