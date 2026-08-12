import type { TacticalCard } from '../../../types'

export const nexus: TacticalCard = {
  category: 'tactical',
  name: 'Nexus',
  isUnique: true,
  gasPts: 35,
  resource: 1,
  slot: [{ unitType: 'Core', count: 2 }],
  cardAbilities: [
    {
      kind: 'rule',
      name: 'Ancient Pride',
      phase: 'Any',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Unit's first Weapon used gains INSTANT.",
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
