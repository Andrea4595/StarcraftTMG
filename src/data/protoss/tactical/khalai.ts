import type { TacticalCard } from '../../../types'

export const khalai: TacticalCard = {
  category: 'tactical',
  name: 'Khalai',
  isUnique: true,
  resource: 1,
  slot: [
    { unitType: 'Hero', count: 1 },
    { unitType: 'Elite', count: 2 },
    { unitType: 'Core', count: 3 },
  ],
  cardAbilities: [
    {
      kind: 'rule',
      name: 'Pylon Warp-In',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'If there is no Friendly Pylon on the battlefield, set a Friendly Pylon Unit anywhere on the GROUND LEVEL of the battlefield more than 10" away from any Enemy model. This Round, the Pylon is not eligible to use its Special Abilities (excluding Structure).',
        ko: '',
      },
    },
    {
      kind: 'rule',
      name: 'Bound by the Khala',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: "At the end of the active Unit's Activation, select one other Friendly Unit eligible to Activate in the current Phase. Immediately Activate that Unit.",
        ko: '',
      },
    },
  ],
}
