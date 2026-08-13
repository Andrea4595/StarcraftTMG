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
        ko: 'Creep Tumor token은 STAY IN PLAY와 DISPLACEMENT를 가진다.',
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
        ko: '적 유닛이 아군 Creep Tumor token의 1" 이내에서 Move, Deploy, Run, Charge, Disengage action을 마쳤다면, 그 token을 전장에서 제거한다.',
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
        ko: '활성화 중인 아군 Zerg 유닛이 ON CREEP인 상태로 Charge action을 선언했다면, IMPACT Hit Roll에 +1 수정치를 얻는다.',
      },
    },
  ],
}
