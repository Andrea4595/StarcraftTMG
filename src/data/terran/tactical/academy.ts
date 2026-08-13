import type { TacticalCard } from '../../../types'

export const academy: TacticalCard = {
  category: 'tactical',
  name: 'Academy',
  isUnique: true,
  gasPts: 35,
  resource: 1,
  slot: [{ unitType: 'Support', count: 2 }],
  cardAbilities: [
    {
      kind: 'rule',
      name: 'Advanced Training',
      phase: 'Any',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: 'Once per Round, when a Friendly Support Unit activates a Special Ability that costs CP, resolve that ability with its CP cost reduced by 1 (to a minimum of 0). Do not Exhaust this card.',
        ko: '라운드당 1회, 아군 Support 유닛이 CP를 소모하는 Special Ability를 발동할 때, 그 능력의 CP 비용을 1 감소시켜(최소 0) 해결한다. 이 카드를 Exhaust하지 않는다.',
      },
    },
  ],
}
