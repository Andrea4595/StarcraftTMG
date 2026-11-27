import type { TacticalCard } from '../../../types'

export const lair: TacticalCard = {
  category: 'tactical',
  id: 'Lair',
  name: { en: 'Lair', ko: '번식지' },
  isUnique: true,
  gasPts: 35,
  resource: 1,
  slot: [
    { unitType: 'Elite', count: 1 },
    { unitType: 'Core', count: 1 },
  ],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Predation',
      name: { en: 'Predation', ko: '포식' },
      phase: 'Any',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Unit's Close Combat Weapons gain INSTANT.",
        ko: '활성화된 유닛의 근접전 무기는 반응 불가 특성을 얻습니다.',
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
