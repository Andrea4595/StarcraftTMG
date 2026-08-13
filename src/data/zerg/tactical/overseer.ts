import type { TacticalCard } from '../../../types'

export const overseer: TacticalCard = {
  category: 'tactical',
  name: 'Overseer',
  isUnique: true,
  gasPts: 25,
  resource: 1,
  slot: [{ unitType: 'Support', count: 1 }],
  cardAbilities: [
    {
      kind: 'rule',
      name: 'Oversight Mode',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Set a Faction Indicator anywhere on the battlefield. While Enemy Units are Within 6" of this Faction Indicator, they lose HIDDEN Status.',
        ko: '전장의 아무 곳에나 Faction Indicator를 놓는다. 적 유닛이 이 Faction Indicator의 6" 이내에 있는 동안, 그 유닛은 HIDDEN Status를 잃는다.',
      },
    },
    {
      kind: 'rule',
      name: 'Pneumatized Carapace',
      phase: 'Assault',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: 'Use after a Friendly Unit rolls a D6 for Charge Distance. Roll an additional D6 and use the higher result to calculate the total Charge Distance.',
        ko: '아군 유닛이 Charge Distance를 위해 D6을 굴린 후에 사용한다. D6을 하나 더 굴려 더 높은 결과로 총 Charge Distance를 계산한다.',
      },
    },
  ],
}
