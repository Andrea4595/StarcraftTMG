import type { TacticalCard } from '../../../types'

export const acceleratingCreep: TacticalCard = {
  category: 'tactical',
  id: 'Accelerating Creep',
  name: { en: 'Accelerating Creep', ko: 'Accelerating Creep' },
  isUnique: true,
  gasPts: 0,
  resource: 0,
  slot: [],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Speed on Creep',
      name: { en: 'Speed on Creep', ko: 'Speed on Creep' },
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'If the active Friendly Zerg Unit is ON CREEP, increase its Speed characteristic by 1.',
        ko: '점막 위의 아군 저그 유닛의 스피드 능력치에 +1',
      },
    },
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
  ],
}
