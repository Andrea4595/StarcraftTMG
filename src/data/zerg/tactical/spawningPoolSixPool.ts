import type { TacticalCard } from '../../../types'

export const spawningPoolSixPool: TacticalCard = {
  category: 'tactical',
  name: 'Spawning Pool (Six Pool)',
  isUnique: true,
  gasPts: 40,
  resource: 2,
  slot: [{ unitType: 'Core', count: 2 }],
  cardAbilities: [
    {
      kind: 'rule',
      name: 'Timing Push',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Zergling Unit Deploys from any table edge that is not a Player's Entry Edge. This action must end more than 10\" away from any Enemy model.",
        ko: '',
      },
    },
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
