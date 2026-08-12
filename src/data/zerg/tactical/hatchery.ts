import type { TacticalCard } from '../../../types'

export const hatchery: TacticalCard = {
  category: 'tactical',
  name: 'Hatchery',
  isUnique: false,
  gasPts: 30,
  resource: 1,
  slot: [{ unitType: 'Support', count: 1 }],
  cardAbilities: [
    {
      kind: 'rule',
      name: 'Lie in Wait',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'The active, Unengaged Ground Unit gains the Burrowed Status.',
        ko: '',
      },
    },
    {
      kind: 'rule',
      name: 'Creep Spread',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Set a Creep Tumor token on the battlefield Within 6" (Line of Sight is not required) of either a Friendly Entry Edge or an existing Friendly Creep Tumor token.',
        ko: '',
      },
    },
  ],
}
