import type { TacticalCard } from '../../../types'

export const gateway: TacticalCard = {
  category: 'tactical',
  id: 'Gateway',
  name: { en: 'Gateway', ko: '관문' },
  isUnique: false,
  gasPts: 25,
  resource: 1,
  slot: [{ unitType: 'Core', count: 1 }],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Quick Strikes',
      name: { en: 'Quick Strikes', ko: '신속한 타격' },
      phase: 'Combat',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Unit's first Close Combat Weapon used gains PRECISION (2).",
        ko: '활성화된 유닛이 이번 단계에서 처음 사용하는 근접전 무기는 정밀(2) 특성을 얻습니다.',
      },
    },
  ],
}
