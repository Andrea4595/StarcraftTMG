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
        ko: '',
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
        ko: '',
      },
    },
  ],
}
