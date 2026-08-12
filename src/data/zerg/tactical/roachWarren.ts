import type { TacticalCard } from '../../../types'

export const roachWarren: TacticalCard = {
  category: 'tactical',
  name: 'Roach Warren',
  isUnique: false,
  gasPts: 25,
  resource: 1,
  slot: [{ unitType: 'Core', count: 1 }],
  cardAbilities: [
    {
      kind: 'rule',
      name: 'Nasty Surprise',
      phase: 'Assault',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'The active Ground Unit loses the Burrowed Status.',
        ko: '',
      },
    },
  ],
}
