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
        ko: '아군 감염 유닛이 적 유닛의 8인치 이내에서 행동을 끝낸 직후 사용합니다. 해당 적 유닛은 감염 상태를 얻으며, 이 효과는 약화 효과로 취급합니다.',
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
        ko: '전장 아무 위치에 진영 표시 마커 1개를 놓습니다. 적 유닛이 해당 진영 표시 마커의 6인치 이내에 있는 동안, 은신 상태를 잃습니다.',
      },
      simulatorFeature: {
        kind: 'placeToken',
        tokenId: 'Faction Marker',
        placement: { rangeType: 'anywhere' },
      },
    },
  ],
}
