import type { TacticalCard } from '../../../types'

export const hatchery: TacticalCard = {
  category: 'tactical',
  id: 'Hatchery',
  name: { en: 'Hatchery', ko: '부화장' },
  isUnique: false,
  gasPts: 30,
  resource: 1,
  slot: [{ unitType: 'Support', count: 1 }],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Lie in Wait',
      name: { en: 'Lie in Wait', ko: '매복' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'The active, Unengaged Ground Unit gains the Burrowed Status.',
        ko: '활성화된 인게이지 상태가 아닌 지상유닛은 잠복 상태를 얻는다.',
      },
    },
    {
      kind: 'rule',
      id: 'Creep Spread',
      name: { en: 'Creep Spread', ko: '점막 살포' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      placesTokenId: 'Creep Tumor',
      rule: {
        en: 'Set a Creep Tumor token on the battlefield Within 6" (Line of Sight is not required) of either a Friendly Entry Edge or an existing Friendly Creep Tumor token.',
        ko: '이미 배치된 점막 종양이나, 아군 엔트리 엣지의 6" 이내에 점막 종양 토큰을 둔다. 이 배치에 시야는 불필요하다.',
      },
    },
  ],
}
