import type { TacticalCard } from '../../../types'

export const supplyDepot: TacticalCard = {
  category: 'tactical',
  name: 'Supply Depot',
  isUnique: true,
  gasPts: 40,
  resource: 1,
  slot: [
    { unitType: 'Hero', count: 1 },
    { unitType: 'Elite', count: 1 },
    { unitType: 'Core', count: 1 },
  ],
  cardAbilities: [
    {
      kind: 'rule',
      name: 'Additional Supply Depots',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Unit's Supply Value is improved by 1 for Controlling and Contesting Mission Markers and completing objectives.",
        ko: '',
      },
    },
  ],
}
