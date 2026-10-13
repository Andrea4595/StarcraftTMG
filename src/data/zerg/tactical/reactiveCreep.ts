import type { TacticalCard } from '../../../types'

export const reactiveCreep: TacticalCard = {
  category: 'tactical',
  id: 'Reactive Creep',
  name: { en: 'Reactive Creep', ko: '반응성 점막' },
  isUnique: true,
  wave: 3,
  gasPts: 10,
  resource: 0,
  slot: [],
  tags: [{ name: "Zagara's Swarm" }],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Reactive Tissue',
      name: { en: 'Reactive Tissue', ko: '반응성 조직' },
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'While a Friendly Zerg Unit is ON CREEP, it gains DODGE (1) against any attacks targeting it.',
        ko: '아군 저그 유닛이 점막 위에 있는 동안, 그 유닛을 목표로 하는 모든 공격에 대해 닷지(1)를 얻는다.',
      },
    },
    {
      kind: 'rule',
      id: 'Living Glob of Tissue',
      name: { en: 'Living Glob of Tissue', ko: '살아있는 조직 덩어리' },
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
      name: { en: 'Creep Removal', ko: '점막 제거' },
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
