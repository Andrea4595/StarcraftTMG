import type { TacticalCard } from '../../../types'

export const infestedCommandCenter: TacticalCard = {
  category: 'tactical',
  id: 'Infested Command Center',
  name: { en: 'Infested Command Center', ko: '감염된 사령부' },
  isUnique: true,
  wave: 4,
  gasPts: 30,
  resource: 1,
  slot: [{ unitType: 'Elite', count: 1 }],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Parasitic Bio-Toxins',
      name: { en: 'Parasitic Bio-Toxins', ko: '기생 생체 독소' },
      phase: 'Movement',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: 'Immediately after a Friendly Infested Unit ends their action Within 8" of an Enemy Unit. That Enemy Unit gains the INFESTATION Status, this effect is treated as a DEBUFF.',
        ko: '아군 감염 유닛이 적 유닛의 8" 이내에서 액션을 마친 직후 사용한다. 그 적 유닛은 감염 상태를 얻으며, 이 효과는 디버프로 취급한다.',
      },
    },
    {
      kind: 'rule',
      id: 'Scanner Sweep',
      name: { en: 'Scanner Sweep', ko: '스캐너 탐색' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      placesTokenId: 'Faction Marker',
      rule: {
        en: 'Set a Faction Indicator anywhere on the battlefield. While Enemy Units are Within 6" of this Faction Indicator, they lose the HIDDEN Status.',
        ko: '전장의 아무곳에 팩션 마커를 둔다. 적 유닛은 이 팩션 마커의 6" 안에 있는 동안 은폐 상태를 잃는다.',
      },
      simulatorFeature: {
        kind: 'placeToken',
        tokenId: 'Faction Marker',
        placement: { rangeType: 'anywhere' },
      },
    },
  ],
}
