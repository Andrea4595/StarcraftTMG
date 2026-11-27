import type { TacticalCard } from '../../../types'

export const academy: TacticalCard = {
  category: 'tactical',
  id: 'Academy',
  name: { en: 'Academy', ko: '사관학교' },
  isUnique: true,
  gasPts: 40,
  resource: 1,
  slot: [{ unitType: 'Support', count: 2 }],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Advanced Training',
      name: { en: 'Advanced Training', ko: '고급 훈련 과정' },
      phase: 'Any',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: 'Once per Round, when a Friendly Support Unit activates a Special Ability that costs CP, resolve that ability with its CP cost reduced by 1 (to a minimum of 0). Do not Exhaust this card.',
        ko: '라운드당 1회, 아군 지원 유닛이 CP를 비용으로 하는 특수 능력을 활성화할 때 사용합니다. 해당 능력을 CP 비용이 1 감소된 상태로 해결합니다(최소 0). 이 카드는 소모하지 않습니다.',
      },
    },
  ],
}
