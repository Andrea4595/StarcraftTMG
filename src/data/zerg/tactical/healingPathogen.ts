import type { TacticalCard } from '../../../types'

export const healingPathogen: TacticalCard = {
  category: 'tactical',
  id: 'Healing Pathogen',
  name: { en: 'Healing Pathogen', ko: '치유 병원체' },
  isUnique: true,
  cardGroup: 'Virus',
  wave: 4,
  gasPts: 0,
  resource: 0,
  slot: [],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Universal Carrier',
      name: { en: 'Universal Carrier', ko: '만능 보균체' },
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'While an Enemy Unit has the INFESTATION Status, immediately after its supply is reduced or it is destroyed, target any Friendly Biological Unit Within 12". This Friendly Unit resolves the HEAL (2) effect.',
        ko: '감염 상태인 적 유닛의 서플라이가 감소하거나 그 유닛이 파괴된 직후, 12" 이내의 아군 생체 유닛 하나를 목표로 삼는다. 그 아군 유닛은 치유(2)한다.',
      },
    },
    {
      kind: 'rule',
      id: "Stukov's Creep",
      name: { en: "Stukov's Creep", ko: '스투코프의 점막' },
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'If an Enemy Unit ends a Move, Deploy, Run, Charge or Disengage action Within 1" of a Friendly Creep Tumor token, remove that token from the battlefield. Creep Tumor tokens have STAY IN PLAY and DISPLACEMENT.',
        ko: '적 유닛이 아군 점막 종양 토큰의 1" 이내에서 이동, 배치, 질주, 차지, 이탈 액션을 마쳤을 때, 그 토큰을 전장에서 제거한다. 점막 종양 토큰은 능력지속과 변위를 얻는다.',
      },
    },
  ],
}
