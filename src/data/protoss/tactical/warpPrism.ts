import type { TacticalCard } from '../../../types'

export const warpPrism: TacticalCard = {
  category: 'tactical',
  name: 'Warp Prism',
  isUnique: true,
  gasPts: 35,
  resource: 1,
  slot: [{ unitType: 'Core', count: 2 }],
  cardAbilities: [
    {
      kind: 'rule',
      name: 'Phase',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'The active Unit resolves the PLACE (3) effect.',
        ko: '',
      },
    },
    {
      kind: 'rule',
      name: 'Warp Conduit',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Set a Faction Indicator anywhere on the battlefield more than 10" away from any Enemy model. At the End of the Round, the controlling player may Deploy one Ground Unit from Reserves in base-to-base contact with this Faction Indicator.',
        ko: '',
      },
    },
  ],
}
