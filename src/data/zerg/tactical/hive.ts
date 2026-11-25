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
        ko: '적 유닛이 아군 지상 유닛의 12" 이내에서 활성화를 마친 직후 사용한다. 그 아군 유닛은 잠복 상태를 얻거나 잃는다.',
      },
    },
    {
      kind: 'rule',
      id: 'Creep Spread',
      name: { en: 'Creep Spread', ko: '점막 살포' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      placesTokenId: 'Creep Tumor',
      rule: {
        en: 'Set a Creep Tumor token on the battlefield Within 6" (Line of Sight is not required) of either a Friendly Entry Edge or an existing Friendly Creep Tumor token.',
        ko: '이미 배치된 점막 종양이나, 아군 엔트리 엣지의 6" 이내에 점막 종양 토큰을 둔다. 이 배치에 시야는 불필요하다.',
      },
      simulatorFeature: {
        kind: 'placeToken',
        tokenId: 'Creep Tumor',
        placement: { rangeType: 'within', range: 6 },
      },
    },
  ],
}
