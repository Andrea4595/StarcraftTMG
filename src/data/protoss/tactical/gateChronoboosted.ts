import type { TacticalCard } from '../../../types'

export const gateChronoboosted: TacticalCard = {
  category: 'tactical',
  name: 'Gate Chronoboosted',
  isUnique: true,
  gasPts: 35,
  resource: 1,
  slot: [
    { unitType: 'Elite', count: 1 },
    { unitType: 'Core', count: 1 },
  ],
  cardAbilities: [
    {
      kind: 'rule',
      name: 'Zealous Charge',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'The active Unit gains BUFF Speed (2).',
        ko: '활성화 중인 유닛은 BUFF Speed (2)를 얻는다.',
      },
    },
    {
      kind: 'rule',
      name: 'Quick Strikes',
      phase: 'Combat',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Unit's first Close Combat Weapon used gains PRECISION (2).",
        ko: '활성화 중인 유닛이 처음 사용하는 근접 무기는 PRECISION (2)를 얻는다.',
      },
    },
  ],
}
