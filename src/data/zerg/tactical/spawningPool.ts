import type { TacticalCard } from '../../../types'

export const spawningPool: TacticalCard = {
  category: 'tactical',
  name: 'Spawning Pool',
  isUnique: false,
  gasPts: 25,
  resource: 1,
  slot: [{ unitType: 'Core', count: 1 }],
  cardAbilities: [
    {
      kind: 'rule',
      name: 'Feral Rage',
      phase: 'Combat',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Unit's first Close Combat Weapon used gains PRECISION (2).",
        ko: '',
      },
    },
  ],
}
