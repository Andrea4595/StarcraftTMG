import type { TacticalCard } from '../../../types'

export const lair: TacticalCard = {
  category: 'tactical',
  name: 'Lair',
  isUnique: true,
  gasPts: 35,
  resource: 1,
  slot: [
    { unitType: 'Elite', count: 1 },
    { unitType: 'Core', count: 1 },
  ],
  cardAbilities: [
    {
      kind: 'rule',
      name: 'Predation',
      phase: 'Any',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Unit's Close Combat Weapons gain INSTANT.",
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
