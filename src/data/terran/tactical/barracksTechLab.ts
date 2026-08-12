import type { TacticalCard } from '../../../types'

export const barracksTechLab: TacticalCard = {
  category: 'tactical',
  name: 'Barracks (Tech Lab)',
  isUnique: true,
  gasPts: 45,
  resource: 2,
  slot: [
    { unitType: 'Elite', count: 1 },
    { unitType: 'Core', count: 1 },
  ],
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
      name: "Let's Have a Blast!",
      phase: 'Assault',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Biological Unit's first Ranged Weapon used gain ANTI-EVADE (1).",
        ko: '',
      },
    },
  ],
}
