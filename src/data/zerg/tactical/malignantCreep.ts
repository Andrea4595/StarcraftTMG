import type { TacticalCard } from '../../../types'

export const malignantCreep: TacticalCard = {
  category: 'tactical',
  id: 'Malignant Creep',
  name: { en: 'Malignant Creep', ko: 'Malignant Creep' },
  isUnique: true,
  gasPts: 10,
  resource: 0,
  slot: [],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Living Glob of Tissue',
      name: { en: 'Living Glob of Tissue', ko: 'Living Glob of Tissue' },
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'Creep Tumor tokens have STAY IN PLAY and DISPLACEMENT.',
        ko: '점막 종양 토큰이 능력지속과 변위를 얻는다.',
      },
    },
    {
      kind: 'rule',
      id: 'Creep Removal',
      name: { en: 'Creep Removal', ko: 'Creep Removal' },
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'If an Enemy Unit ends a Move, Deploy, Run, Charge or Disengage action Within 1" of a Friendly Creep Tumor token, remove that token from the battlefield.',
        ko: '적 유닛이 아군 점막 종양 토큰의 1" 이내에서 이동, 배치, 질주, 차지, 이탈액션을 완료했을 때, 그 토큰을 전장에서 제거한다.',
      },
    },
    {
      kind: 'rule',
      id: 'Malevolent Matriarch',
      name: { en: 'Malevolent Matriarch', ko: 'Malevolent Matriarch' },
      phase: 'Assault',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'If the active Friendly Zerg Unit declares a Charge action while ON CREEP, it gains +1 Modifier to IMPACT Hit Rolls.',
        ko: '이 활성화에서 아군 저그 유닛이 점막 위에서 차지 액션을 할 때, 임팩트 힛 롤에 +1',
      },
    },
  ],
}
