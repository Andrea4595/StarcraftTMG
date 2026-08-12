import type { TacticalCard } from '../../../types'

export const factory: TacticalCard = {
  category: 'tactical',
  name: 'Factory',
  isUnique: false,
  gasPts: 35,
  resource: 1,
  slot: [{ unitType: 'Elite', count: 2 }],
  cardAbilities: [
    {
      kind: 'rule',
      name: 'Field Repair',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'The active Mechanical Unit resolves the HEAL (2) effect.',
        ko: '',
      },
    },
  ],
}
