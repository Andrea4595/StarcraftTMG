import type { TacticalCard } from '../../../types'

export const hydraliskDen: TacticalCard = {
  category: 'tactical',
  name: 'Hydralisk Den',
  isUnique: false,
  gasPts: 35,
  resource: 1,
  slot: [{ unitType: 'Elite', count: 2 }],
  cardAbilities: [
    {
      kind: 'rule',
      name: 'Missile Attacks',
      phase: 'Assault',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Unit's first Ranged Weapon used gains PRECISION (1).",
        ko: '',
      },
    },
  ],
}
