import type { TacticalCard } from '../../../types'

export const overseer: TacticalCard = {
  category: 'tactical',
  id: 'Overseer',
  name: { en: 'Overseer', ko: 'Overseer' },
  isUnique: true,
  gasPts: 25,
  resource: 1,
  slot: [{ unitType: 'Support', count: 1 }],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Oversight Mode',
      name: { en: 'Oversight Mode', ko: 'Oversight Mode' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Set a Faction Indicator anywhere on the battlefield. While Enemy Units are Within 6" of this Faction Indicator, they lose HIDDEN Status.',
        ko: '팩션 마크를 전장에 둔다. 그 팩션 마커의 6" 이내의 모든 적은 은폐 상태를 잃는다.',
      },
    },
    {
      kind: 'rule',
      id: 'Pneumatized Carapace',
      name: { en: 'Pneumatized Carapace', ko: 'Pneumatized Carapace' },
      phase: 'Assault',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: 'Use after a Friendly Unit rolls a D6 for Charge Distance. Roll an additional D6 and use the higher result to calculate the total Charge Distance.',
        ko: '아군 유닛이 차지를 위해 차지 롤을 한 후 사용한다. D6대신 2D6을 굴리고 더 높은쪽을 선택해 스피드에 더해서 차지값을 정한다.',
      },
    },
  ],
}
