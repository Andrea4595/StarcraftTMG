import type { TacticalCard } from '../../../types'

export const daelaam: TacticalCard = {
  category: 'tactical',
  id: 'Daelaam',
  name: { en: 'Daelaam', ko: '댈람' },
  isUnique: true,
  resource: 1,
  slot: [
    { unitType: 'Elite', count: 1 },
    { unitType: 'Core', count: 3 },
    { unitType: 'Support', count: 1 },
  ],
  cardAbilities: [
    {
      kind: 'rule',
      id: "Dae'Uhl",
      name: { en: "Dae'Uhl", ko: '대울' },
      phase: 'Any',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: 'When a Friendly Unit receives Damage, reduce the Total Damage by 2 (to a minimum of 1).',
        ko: '아군 유닛이 피해를 받을 때, 최종 피해를 2 감소시킵니다. 단, 최소 1까지 감소시킬 수 있습니다.',
      },
    },
    {
      kind: 'rule',
      id: 'Mass Recall',
      name: { en: 'Mass Recall', ko: '대규모 귀환' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Once per Game. Set a Faction Indicator anywhere on the battlefield. All Friendly Protoss Units Within 6" of this Faction Indicator are removed from the battlefield and returned to Reserves.',
        ko: '게임당 1회. 전장 아무 위치에 진영 표시 마커 1개를 놓습니다. 이 진영 표시 마커의 6인치 이내에 있는 모든 아군 프로토스 유닛은 전장에서 제거되어 예비 병력으로 복귀합니다.',
      },
      placesTokenId: 'Faction Marker',
      simulatorFeature: {
        kind: 'placeToken',
        tokenId: 'Faction Marker',
        placement: { rangeType: 'anywhere' },
      },
    },
  ],
}
