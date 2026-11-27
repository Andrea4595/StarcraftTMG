import type { TacticalCard } from '../../../types'

export const observer: TacticalCard = {
  category: 'tactical',
  id: 'Observer',
  name: { en: 'Observer', ko: '관측선' },
  isUnique: true,
  gasPts: 25,
  resource: 1,
  slot: [{ unitType: 'Support', count: 1 }],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Surveillance',
      name: { en: 'Surveillance', ko: '감시 모드' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Set a Faction Indicator anywhere on the battlefield. While Enemy Units are Within 6" of this Faction Indicator, they lose HIDDEN Status.',
        ko: '전장 아무 위치에 진영 표시 마커 1개를 놓습니다. 적 유닛이 해당 진영 표시 마커의 6인치 이내에 있는 동안, 은신 상태를 잃습니다.',
      },
      placesTokenId: 'Faction Marker',
      simulatorFeature: {
        kind: 'placeToken',
        tokenId: 'Faction Marker',
        placement: { rangeType: 'anywhere' },
      },
    },
    {
      kind: 'rule',
      id: 'Gravitic Boosters',
      name: { en: 'Gravitic Boosters', ko: '중력 가속' },
      phase: 'Assault',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: 'Use after a Friendly Unit rolls a D6 for Charge Distance. Add 1 to the Charge Distance for this Unit.',
        ko: '아군 유닛이 돌격 거리를 위해 D6을 굴린 후 사용합니다. 이 유닛의 돌격 거리에 1을 추가합니다.',
      },
    },
  ],
}
