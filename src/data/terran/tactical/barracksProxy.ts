import type { TacticalCard } from '../../../types'

export const barracksProxy: TacticalCard = {
  category: 'tactical',
  name: 'Barracks (Proxy)',
  isUnique: true,
  gasPts: 40,
  resource: 2,
  slot: [{ unitType: 'Core', count: 2 }],
  cardAbilities: [
    {
      kind: 'rule',
      name: 'Go! Go! Go!',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'The active Biological Unit performs a 2" Move action. This does not count towards its action limit.',
        ko: '',
      },
    },
    {
      kind: 'rule',
      name: 'Armed and Ready',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Biological Unit Deploys from any table edge that is not a player's Entry Edge. No model may be set up Within 10\" of any Enemy model. This ability cannot be used if another Friendly Biological Unit has already been Deployed this Round.",
        ko: '',
      },
    },
  ],
}
