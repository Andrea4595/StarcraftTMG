import type { TacticalCard } from '../../../types'

export const academy: TacticalCard = {
  category: 'tactical',
  id: 'Academy',
  name: { en: 'Academy', ko: '사관학교' },
  isUnique: true,
  gasPts: 35,
  resource: 1,
  slot: [{ unitType: 'Support', count: 2 }],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Advanced Training',
      name: { en: 'Advanced Training', ko: '진보된 훈련' },
      phase: 'Any',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: 'Once per Round, when a Friendly Support Unit activates a Special Ability that costs CP, resolve that ability with its CP cost reduced by 1 (to a minimum of 0). Do not Exhaust this card.',
        ko: '라운드당 한 번, 아군 서포트 유닛이 특수능력을 사용할 때 CP를 소모한다면, 그 CP 소모치를 1 줄인다 (최소 0). 그 후 이 카드는 탈진되지 않는다.',
      },
    },
  ],
}
