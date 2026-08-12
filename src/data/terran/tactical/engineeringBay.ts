import type { TacticalCard } from '../../../types'

export const engineeringBay: TacticalCard = {
  category: 'tactical',
  name: 'Engineering Bay',
  isUnique: false,
  gasPts: 25,
  resource: 1,
  slot: [{ unitType: 'Core', count: 1 }],
  cardAbilities: [
    {
      kind: 'rule',
      name: 'Infantry Armor',
      phase: 'Any',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: 'Use before a Friendly Biological Unit makes an Armour Roll. That Unit gains TOUGH (1) for this roll.',
        ko: '',
      },
    },
    {
      kind: 'rule',
      name: 'Infantry Weapons',
      phase: 'Assault',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Biological Unit's first Ranged Weapon used gains CRITICAL HIT (1).",
        ko: '',
      },
    },
  ],
}
