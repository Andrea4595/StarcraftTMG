import type { TacticalCard } from '../../../types'

export const acceleratingCreep: TacticalCard = {
  category: 'tactical',
  id: 'Accelerating Creep',
  name: { en: 'Accelerating Creep', ko: '가속 점막' },
  isUnique: true,
  cardGroup: 'Creep',
  gasPts: 0,
  resource: 0,
  slot: [],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Speed on Creep',
      name: { en: 'Speed on Creep', ko: '점막 위의 질주' },
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'If the active Friendly Zerg Unit is ON CREEP, increase its Speed characteristic by 1.',
        ko: '활성화된 아군 저그 유닛이 점막 위에 있다면, 해당 유닛의 속도 수치를 1 증가시킵니다.',
      },
    },
    {
      kind: 'rule',
      id: 'Living Glob of Tissue',
      name: { en: 'Living Glob of Tissue', ko: '살아 있는 조직 덩어리' },
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'Creep Tumor tokens have STAY IN PLAY and DISPLACEMENT.',
        ko: '점막 종양 토큰은 잔류 및 위치 변환 특성을 얻습니다.',
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
        ko: '적 유닛이 아군 점막 종양 토큰의 1인치 이내에서 이동, 전개, 질주, 돌격 또는 이탈 행동을 종료할 경우, 해당 토큰을 전장에서 제거합니다.',
      },
    },
  ],
}
