import type { TacticalCard } from '../../../types'

export const terranArmedForces: TacticalCard = {
  category: 'tactical',
  name: 'Terran Armed Forces',
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
      name: 'Tactical Retreat',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'The active Unit ignores the Disengage penalty for the remainder of the Round.',
        ko: '',
      },
    },
    {
      kind: 'rule',
      name: 'Terran Tenacity',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Once per Game. Immediately claim the First Player Marker. No other player may claim the First Player Marker for the remainder of this Phase.',
        ko: '',
      },
    },
  ],
}
