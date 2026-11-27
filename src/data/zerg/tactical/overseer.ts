import type { TacticalCard } from '../../../types'

export const overseer: TacticalCard = {
  category: 'tactical',
  id: 'Overseer',
  name: { en: 'Overseer', ko: '감시 군주' },
  isUnique: true,
  gasPts: 25,
  resource: 1,
  slot: [{ unitType: 'Support', count: 1 }],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Oversight Mode',
      name: { en: 'Oversight Mode', ko: '감시 태세' },
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
      id: 'Pneumatized Carapace',
      name: { en: 'Pneumatized Carapace', ko: '기낭갑피' },
      phase: 'Assault',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: 'Use after a Friendly Unit rolls a D6 for Charge Distance. Roll an additional D6 and use the higher result to calculate the total Charge Distance.',
        ko: '아군 유닛이 돌격 거리 판정을 위해 D6을 굴린 직후 사용합니다. 추가로 D6 하나를 더 굴리고, 더 높은 결과값을 사용해 최종 돌격 거리를 계산합니다.',
      },
    },
  ],
}
