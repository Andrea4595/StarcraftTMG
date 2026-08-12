import type { TacticalCard } from '../../../types'

export const warpGate: TacticalCard = {
  category: 'tactical',
  name: 'Warp Gate',
  isUnique: true,
  gasPts: 40,
  resource: 1,
  slot: [{ unitType: 'Core', count: 2 }],
  cardAbilities: [
    {
      kind: 'rule',
      name: 'Warp In',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Ground Unit Deploys from any table edge that is not a player's Entry Edge. This deployment must end more than 10\" away from any Enemy model. The controlling player cannot use this ability if another Friendly Ground Unit has already Deployed this Round.",
        ko: '',
      },
    },
    {
      kind: 'rule',
      name: 'Quick Strikes',
      phase: 'Combat',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Unit's first Close Combat Weapon used gains PRECISION (2).",
        ko: '',
      },
    },
  ],
}
