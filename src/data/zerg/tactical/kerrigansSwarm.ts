import type { TacticalCard } from '../../../types'

export const kerrigansSwarm: TacticalCard = {
  category: 'tactical',
  name: "Kerrigan's Swarm",
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
      name: 'Wild Mutation',
      phase: 'Any',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'If the active unit is ON CREEP, the Unit gains BUFF Speed (1) and its first Weapon used gains PRECISION (1).',
        ko: '',
      },
    },
    {
      kind: 'rule',
      name: 'Zerg Creep',
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'During Army Building, select exactly one Creep Card and add it to their Army List, paying its listed cost (if any).',
        ko: '',
      },
    },
    {
      kind: 'rule',
      name: 'Omega Network',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: "If there is no Friendly Omega Worm on the battlefield, set a Friendly Omega Worm Unit anywhere on GROUND LEVEL of the battlefield, more than 10\" away from any Enemy model. This Round, the Omega Worm is not eligible to use its Special Abilities (excluding Structure).",
        ko: '',
      },
    },
  ],
}
