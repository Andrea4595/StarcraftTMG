import type { TacticalCard } from '../../../types'

export const armory: TacticalCard = {
  category: 'tactical',
  name: 'Armory',
  isUnique: false,
  gasPts: 30,
  resource: 1,
  slot: [{ unitType: 'Elite', count: 1 }],
  cardAbilities: [
    {
      kind: 'rule',
      name: 'Vehicle Plating',
      phase: 'Any',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: 'Use before a Friendly Mechanical Unit makes an Armour Roll. That Unit gains TOUGH (1) for this roll.',
        ko: '',
      },
    },
    {
      kind: 'rule',
      name: 'Vehicle Weapons',
      phase: 'Assault',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Mechanical Unit's first Ranged Weapon used gain CRITICAL HIT (1).",
        ko: '',
      },
    },
  ],
}
