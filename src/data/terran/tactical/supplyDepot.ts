import type { TacticalCard } from '../../../types'

export const supplyDepot: TacticalCard = {
  category: 'tactical',
  id: 'Supply Depot',
  name: { en: 'Supply Depot', ko: '보급고' },
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
      name: { en: 'Additional Supply Depots', ko: '추가 보급고' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Unit's Supply Value is improved by 1 for Controlling and Contesting Mission Markers and completing objectives.",
        ko: '활성화된 유닛은 임무 마커를 점령하거나 이를 두고 경합할 때, 또는 목표를 완료할 때 인구수가 1 증가한 것으로 간주합니다.',
      },
    },
  ],
}
