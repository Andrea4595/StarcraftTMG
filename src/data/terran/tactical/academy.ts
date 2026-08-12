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
        ko: '',
      },
    },
  ],
}
