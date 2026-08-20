import type { TacticalCard } from '../../../types'

export const gateChronoboosted: TacticalCard = {
  category: 'tactical',
  id: 'Gate Chronoboosted',
  name: { en: 'Gate Chronoboosted', ko: 'Gate Chronoboosted' },
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
      id: 'Zealous Charge',
      name: { en: 'Zealous Charge', ko: 'Zealous Charge' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'The active Unit gains BUFF Speed (2).',
        ko: '활성화된 유닛은 버프 스피드(2)를 갖는다.',
      },
    },
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
