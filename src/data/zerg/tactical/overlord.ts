import type { TacticalCard } from '../../../types'

export const overlord: TacticalCard = {
  category: 'tactical',
  name: 'Overlord',
  isUnique: true,
  gasPts: 35,
  resource: 1,
  slot: [
    { unitType: 'Hero', count: 1 },
    { unitType: 'Elite', count: 1 },
    { unitType: 'Core', count: 1 },
  ],
  cardAbilities: [
    {
      kind: 'rule',
      name: 'Ventral Sacs',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: "Set a Faction Indicator anywhere on the battlefield more than 10\" away from any Enemy model. At the End of the Round, the controlling player may Deploy one Ground Unit from Reserves in base-to-base contact with this Faction Indicator.",
        ko: '',
      },
    },
    {
      kind: 'rule',
      name: 'Excrete Creep',
      phase: 'Assault',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Set a Creep Tumor token on the battlefield Within 6" (Line of Sight is not required) of either a Friendly Entry Edge or an existing Friendly Creep Tumor token.',
        ko: '',
      },
    },
  ],
}
