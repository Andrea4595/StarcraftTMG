import type { TacticalCard } from '../../../types'

export const spawningPool: TacticalCard = {
  category: 'tactical',
  id: 'Spawning Pool',
  name: { en: 'Spawning Pool', ko: '산란못' },
  isUnique: false,
  gasPts: 25,
  resource: 1,
  slot: [{ unitType: 'Core', count: 1 }],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Feral Rage',
      name: { en: 'Feral Rage', ko: '야생의 분노' },
      phase: 'Combat',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Unit's first Close Combat Weapon used gains PRECISION (2).",
        ko: '활성화된 유닛이 처음으로 사용하는 근접 무기가 프리시전(2)를 얻는다.',
      },
    },
  ],
}
