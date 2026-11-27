import type { TacticalCard } from '../../../types'

export const hungeringInfestation: TacticalCard = {
  category: 'tactical',
  id: 'Hungering Infestation',
  name: { en: 'Hungering Infestation', ko: '굶주린 감염' },
  isUnique: true,
  cardGroup: 'Virus',
  wave: 4,
  gasPts: 10,
  resource: 0,
  slot: [],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Growing Infestation',
      name: { en: 'Growing Infestation', ko: '번지는 감염' },
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'While an Enemy Unit has the INFESTATION Status, it is not eligible to use or to be targeted by any Enemy Reaction Special Ability, except Restoration.',
        ko: '적 유닛이 감염 상태인 동안, 해당 유닛은 회복을 제외한 반응형 특수 능력을 사용할 수 없으며, 그 유닛 측의 반응형 특수 능력의 대상도 될 수 없습니다.',
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
