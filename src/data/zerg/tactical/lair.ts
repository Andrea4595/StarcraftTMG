import type { TacticalCard } from '../../../types'

export const lair: TacticalCard = {
  category: 'tactical',
  id: 'Lair',
  name: { en: 'Lair', ko: 'Lair' },
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
      id: 'Predation',
      name: { en: 'Predation', ko: 'Predation' },
      phase: 'Any',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Unit's Close Combat Weapons gain INSTANT.",
        ko: '활성화된 유닛의 근접 무기는 인스턴트를 얻는다.',
      },
    },
    {
      kind: 'rule',
      id: 'Creep Spread',
      name: { en: 'Creep Spread', ko: 'Creep Spread' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Set a Creep Tumor token on the battlefield Within 6" (Line of Sight is not required) of either a Friendly Entry Edge or an existing Friendly Creep Tumor token.',
        ko: '이미 배치된 점막 종양이나, 아군 엔트리 엣지의 6" 이내에 점막 종양 토큰을 둔다. 이 배치에 시야는 불필요하다.',
      },
    },
  ],
}
