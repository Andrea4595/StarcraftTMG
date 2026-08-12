import type { TacticalCard } from '../../../types'

export const overchargedNexus: TacticalCard = {
  category: 'tactical',
  name: 'Overcharged Nexus',
  isUnique: true,
  gasPts: 35,
  resource: 1,
  slot: [
    { unitType: 'Elite', count: 1 },
    { unitType: 'Core', count: 1 },
  ],
  cardAbilities: [
    {
      kind: 'rule',
      name: 'Photon Overcharge',
      phase: 'Any',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: "Use when an Enemy Unit enters the battlefield from Reserves via a location other than its own Entry Edge. That Unit immediately suffers HITS 3 (1).",
        ko: '',
      },
    },
    {
      kind: 'rule',
      name: 'Strategic Recall',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'The active, Unengaged Ground Unit is returned to Reserves instead of performing an action.',
        ko: '',
      },
    },
  ],
}
