import type { TacticalCard } from '../../../types'

export const acceleratingCreep: TacticalCard = {
  category: 'tactical',
  name: 'Accelerating Creep',
  isUnique: true,
  gasPts: 0,
  resource: 0,
  slot: [],
  cardAbilities: [
    {
      kind: 'rule',
      name: 'Speed on Creep',
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'If the active Friendly Zerg Unit is ON CREEP, increase its Speed characteristic by 1.',
        ko: '',
      },
    },
    {
      kind: 'rule',
      name: 'Living Glob of Tissue',
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'Creep Tumor tokens have STAY IN PLAY and DISPLACEMENT.',
        ko: '',
      },
    },
    {
      kind: 'rule',
      name: 'Creep Removal',
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'If an Enemy Unit ends a Move, Deploy, Run, Charge or Disengage action Within 1" of a Friendly Creep Tumor token, remove that token from the battlefield.',
        ko: '',
      },
    },
  ],
}
