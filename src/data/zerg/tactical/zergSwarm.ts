import type { TacticalCard } from '../../../types'

export const zergSwarm: TacticalCard = {
  category: 'tactical',
  name: 'Zerg Swarm',
  isUnique: true,
  resource: 1,
  slot: [
    { unitType: 'Elite', count: 1 },
    { unitType: 'Core', count: 3 },
    { unitType: 'Support', count: 1 },
  ],
  cardAbilities: [
    {
      kind: 'rule',
      name: 'Brood Instinct',
      phase: 'Any',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: 'Use before a Friendly Unit makes an Evade Roll. Apply a +1 Modifier to that roll.',
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
      name: 'Rapid Burrowing',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Select one Friendly, Unengaged Ground Zerg Unit on the battlefield. That Unit gains the Burrowed Status, even if it has already been Activated this Round.',
        ko: '',
      },
    },
  ],
}
