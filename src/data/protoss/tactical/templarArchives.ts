import type { TacticalCard } from '../../../types'

export const templarArchives: TacticalCard = {
  category: 'tactical',
  id: 'Templar Archives',
  name: { en: 'Templar Archives', ko: '기사단 기록보관소' },
  isUnique: true,
  gasPts: 40,
  resource: 1,
  slot: [{ unitType: 'Support', count: 2 }],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Ancestral Wisdom',
      name: { en: 'Ancestral Wisdom', ko: '선조의 지혜' },
      phase: 'Any',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: 'Once per Round, when a Friendly Support Unit activates a Special Ability that costs PE, resolve that ability with its PE cost reduced by 1 (to a minimum of 0). Do not Exhaust this card.',
        ko: '라운드당 한번, 아군 지원 유닛이 PE 비용이 있는 특수능력을 사용할 때, 그 능력의 PE 비용을 1 줄여서 사용한다 (최소 0). 이 카드는 소모하지 않는다.',
      },
    },
  ],
}
