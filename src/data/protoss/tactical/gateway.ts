import type { TacticalCard } from '../../../types'

export const gateway: TacticalCard = {
  category: 'tactical',
  id: 'Gateway',
  name: { en: 'Gateway', ko: 'Gateway' },
  isUnique: false,
  gasPts: 25,
  resource: 1,
  slot: [{ unitType: 'Core', count: 1 }],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Quick Strikes',
      name: { en: 'Quick Strikes', ko: 'Quick Strikes' },
      phase: 'Combat',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Unit's first Close Combat Weapon used gains PRECISION (2).",
        ko: '활성화된 유닛이 처음으로 하는 근접공격에서 무기에 프리시전(2)를 갖는다.',
      },
    },
  ],
}
