import type { TacticalCard } from '../../../types'

export const malignantCreep: TacticalCard = {
  category: 'tactical',
  name: 'Malignant Creep',
  isUnique: true,
  gasPts: 10,
  resource: 0,
  slot: [],
  cardAbilities: [
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
    {
      kind: 'rule',
      name: 'Malevolent Matriarch',
      phase: 'Assault',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'If the active Friendly Zerg Unit declares a Charge action while ON CREEP, it gains +1 Modifier to IMPACT Hit Rolls.',
        ko: '',
      },
    },
  ],
}
