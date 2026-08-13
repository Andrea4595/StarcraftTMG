import type { TacticalCard } from '../../../types'

export const observer: TacticalCard = {
  category: 'tactical',
  name: 'Observer',
  isUnique: true,
  gasPts: 25,
  resource: 1,
  slot: [{ unitType: 'Support', count: 1 }],
  cardAbilities: [
    {
      kind: 'rule',
      name: 'Surveillance',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Set a Faction Indicator anywhere on the battlefield. While Enemy Units are Within 6" of this Faction Indicator, they lose HIDDEN Status.',
        ko: '전장의 아무 곳에나 Faction Indicator를 놓는다. 적 유닛이 이 Faction Indicator에서 6" 이내에 있는 동안, 그 유닛은 HIDDEN Status를 잃는다.',
      },
    },
    {
      kind: 'rule',
      name: 'Gravitic Boosters',
      phase: 'Assault',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: 'Use after a Friendly Unit rolls a D6 for Charge Distance. Add 1 to the Charge Distance for this Unit.',
        ko: '아군 유닛이 Charge Distance를 위해 D6을 굴린 후 사용한다. 그 유닛의 Charge Distance에 1을 더한다.',
      },
    },
  ],
}
