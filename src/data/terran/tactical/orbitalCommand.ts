import type { TacticalCard } from '../../../types'

export const orbitalCommand: TacticalCard = {
  category: 'tactical',
  name: 'Orbital Command',
  isUnique: true,
  gasPts: 25,
  resource: 1,
  slot: [{ unitType: 'Core', count: 1 }],
  cardAbilities: [
    {
      kind: 'rule',
      name: 'ComSat Station',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: "Select one table edge that is not a player's Entry Edge. Until the End of the Round, Enemy Units cannot Deploy from that edge.",
        ko: '',
      },
    },
    {
      kind: 'rule',
      name: 'Scanner Sweep',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Set a Faction Indicator anywhere on the battlefield. While Enemy Units are Within 6" of this Faction Indicator, they lose HIDDEN Status.',
        ko: '',
      },
    },
  ],
}
