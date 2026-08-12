import type { TacticalCard } from '../../../types'

export const evolutionChamber: TacticalCard = {
  category: 'tactical',
  name: 'Evolution Chamber',
  isUnique: false,
  gasPts: 30,
  resource: 1,
  slot: [{ unitType: 'Core', count: 1 }],
  cardAbilities: [
    {
      kind: 'rule',
      name: 'Carapace',
      phase: 'Any',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: 'Use before a Friendly Unit makes an Armour Roll. That Unit gains TOUGH (1) for this roll.',
        ko: '',
      },
    },
    {
      kind: 'rule',
      name: 'Extended Claws',
      phase: 'Assault',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'The active Unit gains a +1 Modifier to all IMPACT Hit Rolls.',
        ko: '',
      },
    },
  ],
}
