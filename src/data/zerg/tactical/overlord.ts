import type { TacticalCard } from '../../../types'

export const overlord: TacticalCard = {
  category: 'tactical',
  id: 'Overlord',
  name: { en: 'Overlord', ko: '대군주' },
  isUnique: true,
  gasPts: 35,
  resource: 1,
  slot: [
    { unitType: 'Hero', count: 1 },
    { unitType: 'Elite', count: 1 },
    { unitType: 'Core', count: 1 },
  ],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Ventral Sacs',
      name: { en: 'Ventral Sacs', ko: '배주머니' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: "Set a Faction Indicator anywhere on the battlefield more than 10\" away from any Enemy model. At the End of the Round, the controlling player may Deploy one Ground Unit from Reserves in base-to-base contact with this Faction Indicator.",
        ko: '적 모형으로부터 10인치 초과 떨어진 전장 아무 위치에 진영 표시 마커 1개를 놓습니다. 라운드 종료 시, 조종 플레이어는 예비 병력에서 지상 유닛 1개를 이 진영 표시 마커와 베이스 접촉 상태로 전개할 수 있습니다.',
      },
      placesTokenId: 'Faction Marker',
      simulatorFeature: {
        kind: 'placeToken',
        tokenId: 'Faction Marker',
        placement: { rangeType: 'atLeast', range: 10 },
      },
    },
    {
      kind: 'rule',
      id: 'Excrete Creep',
      name: { en: 'Excrete Creep', ko: '점막 분비' },
      phase: 'Assault',
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
