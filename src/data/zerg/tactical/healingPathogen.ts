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
      name: { en: 'Universal Carrier', ko: '범용 보균체' },
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'While an Enemy Unit has the INFESTATION Status, immediately after its supply is reduced or it is destroyed, target any Friendly Biological Unit Within 12". This Friendly Unit resolves the HEAL (2) effect.',
        ko: '적 유닛이 감염 상태인 동안, 해당 유닛의 인구수가 감소하거나 유닛이 파괴된 직후 12인치 이내의 아군 생체 유닛 1개를 대상으로 지정합니다. 해당 아군 유닛은 치유(2) 효과를 수행합니다.',
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
        ko: '적 유닛이 아군 점막 종양 토큰의 1인치 이내에서 이동, 전개, 질주, 돌격 또는 이탈 행동을 종료할 경우, 해당 토큰을 전장에서 제거합니다. 점막 종양 토큰은 잔류 및 위치 변환 특성을 얻습니다.',
      },
    },
  ],
}
