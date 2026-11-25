import type { TacticalCard } from '../../../types'

export const weightedPustule: TacticalCard = {
  category: 'tactical',
  id: 'Weighted Pustule',
  name: { en: 'Weighted Pustule', ko: '무거운 고름주머니' },
  isUnique: true,
  cardGroup: 'Virus',
  wave: 4,
  gasPts: 5,
  resource: 0,
  slot: [],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Fetid Touch',
      name: { en: 'Fetid Touch', ko: '악취 나는 손길' },
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'While an Enemy Unit has the INFESTATION Status, it cannot resolve the PLACE and set effects and cannot be returned to Reserves.',
        ko: '감염 상태인 적 유닛은 위치 및 배치 효과를 처리할 수 없고, 리저브로 되돌아갈 수 없다.',
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
