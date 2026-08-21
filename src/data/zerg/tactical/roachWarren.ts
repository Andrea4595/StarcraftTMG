import type { TacticalCard } from '../../../types'

export const roachWarren: TacticalCard = {
  category: 'tactical',
  id: 'Roach Warren',
  name: { en: 'Roach Warren', ko: '바퀴 소굴' },
  isUnique: false,
  gasPts: 25,
  resource: 1,
  slot: [{ unitType: 'Core', count: 1 }],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Nasty Surprise',
      name: { en: 'Nasty Surprise', ko: '기습' },
      phase: 'Assault',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'The active Ground Unit loses the Burrowed Status.',
        ko: '활성화된 지상유닛이 잠복 상태를 잃는다.',
      },
    },
  ],
}
