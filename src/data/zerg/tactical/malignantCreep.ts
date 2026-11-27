import type { TacticalCard } from '../../../types'

export const malignantCreep: TacticalCard = {
  category: 'tactical',
  id: 'Malignant Creep',
  name: { en: 'Malignant Creep', ko: '악성 점막' },
  isUnique: true,
  cardGroup: 'Creep',
  gasPts: 10,
  resource: 0,
  slot: [],
  tags: [{ name: "Kerrigan's Swarm" }],
  cardAbilities: [
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
    {
      kind: 'rule',
      id: 'Malevolent Matriarch',
      name: { en: 'Malevolent Matriarch', ko: '사악한 대모' },
      phase: 'Assault',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'If the active Friendly Zerg Unit declares a Charge action while ON CREEP, it gains +1 Modifier to IMPACT Hit Rolls.',
        ko: '활성화된 아군 저그 유닛이 점막 위에서 돌격 행동을 선언할 경우, 해당 유닛은 충격 명중 굴림에 +1 수정치를 얻습니다.',
      },
    },
  ],
}
