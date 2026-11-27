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
        ko: '적 유닛이 감염 상태인 동안, 해당 유닛은 배치 효과 및 놓기 효과를 처리할 수 없으며 예비 병력으로 복귀할 수 없습니다.',
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
