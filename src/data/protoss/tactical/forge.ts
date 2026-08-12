import type { TacticalCard } from '../../../types'

export const forge: TacticalCard = {
  category: 'tactical',
  name: 'Forge',
  isUnique: false,
  gasPts: 30,
  resource: 1,
  slot: [{ unitType: 'Elite', count: 1 }],
  cardAbilities: [
    {
      kind: 'rule',
      name: 'Ground Armor',
      phase: 'Any',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: 'Use before a Friendly Ground Unit makes an Armour Roll. That Unit gains TOUGH (1) for this roll.',
        ko: '',
      },
    },
    {
      kind: 'rule',
      name: 'Ground Weapons',
      phase: 'Assault',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Ground Unit's first Ranged Weapon used gains CRITICAL HIT (1).",
        ko: '',
      },
    },
  ],
}
