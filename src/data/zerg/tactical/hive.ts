import type { TacticalCard } from '../../../types'

export const hive: TacticalCard = {
  category: 'tactical',
  id: 'Hive',
  name: { en: 'Hive', ko: '군락' },
  isUnique: true,
  wave: 4,
  gasPts: 35,
  resource: 1,
  slot: [
    { unitType: 'Elite', count: 1 },
    { unitType: 'Core', count: 1 },
  ],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Brutal Instinct',
      name: { en: 'Brutal Instinct', ko: '잔혹한 본능' },
      phase: 'Movement',
      type: 'Reaction',
      cost: 0,
      // 원문의 'a Friendly, Ground Unit' 쉼표는 카드 표기 그대로 둔다
      rule: {
        en: 'Immediately after an Enemy Unit ends its Activation Within 12" of a Friendly, Ground Unit. That Friendly Unit gains or loses the BURROWED Status.',
        ko: '적 유닛이 아군 지상 유닛의 12인치 이내에서 활성화를 끝낸 직후 사용합니다. 해당 아군 유닛은 잠복 상태를 얻거나 잃습니다.',
      },
    },
    {
      kind: 'rule',
      id: 'Creep Spread',
      name: { en: 'Creep Spread', ko: '점막 확산' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      placesTokenId: 'Creep Tumor',
      rule: {
        en: 'Set a Creep Tumor token on the battlefield Within 6" (Line of Sight is not required) of either a Friendly Entry Edge or an existing Friendly Creep Tumor token.',
        ko: '전장에 점막 종양 토큰 1개를 놓습니다. 해당 토큰은 아군 진입 경계 또는 기존 아군 점막 종양 토큰 중 하나의 6인치 이내에 배치되어야 합니다(시야는 필요하지 않습니다).',
      },
      simulatorFeature: {
        kind: 'placeToken',
        tokenId: 'Creep Tumor',
        placement: { rangeType: 'within', range: 6 },
      },
    },
  ],
}
