import type { TacticalCard } from '../../../types'

export const dropship: TacticalCard = {
  category: 'tactical',
  name: 'Dropship',
  isUnique: true,
  gasPts: 40,
  resource: 1,
  slot: [
    { unitType: 'Core', count: 1 },
    { unitType: 'Support', count: 1 },
  ],
  cardAbilities: [
    {
      kind: 'rule',
      name: 'Strap in!',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'The active, Unengaged Ground Unit is returned to Reserves instead of performing an action.',
        ko: '',
      },
    },
    {
      kind: 'rule',
      name: 'Ready For Dust-off',
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
