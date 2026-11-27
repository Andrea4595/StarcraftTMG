import type { TacticalCard } from '../../../types'

export const dropship: TacticalCard = {
  category: 'tactical',
  id: 'Dropship',
  name: { en: 'Dropship', ko: '수송선' },
  isUnique: true,
  gasPts: 35,
  resource: 1,
  slot: [
    { unitType: 'Core', count: 1 },
    { unitType: 'Support', count: 1 },
  ],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Strap in!',
      name: { en: 'Strap in!', ko: '자, 안전띠 매시고!' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'The active, Unengaged Ground Unit is returned to Reserves instead of performing an action.',
        ko: '활성화된 교전 중이 아닌 지상 유닛은 행동을 수행하는 대신 예비 병력으로 복귀합니다.',
      },
    },
    {
      kind: 'rule',
      id: 'Ready For Dust-off',
      name: { en: 'Ready For Dust-off', ko: '후송 준비 완료' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Set a Faction Indicator anywhere on the battlefield more than 10" away from any Enemy model. At the End of the Round, the controlling player may Deploy one Ground Unit from Reserves in base-to-base contact with this Faction Indicator.',
        ko: '전장 아무 위치에 진영 표시 마커 1개를 놓습니다. 해당 마커는 모든 적 모형으로부터 10인치 초과해서 떨어져 있어야 합니다. 라운드 종료 시, 조종 플레이어는 예비 병력의 지상 유닛 1개를 이 진영 표시 마커와 베이스 접촉 상태로 전개할 수 있습니다.',
      },
      placesTokenId: 'Faction Marker',
      simulatorFeature: {
        kind: 'placeToken',
        tokenId: 'Faction Marker',
        placement: { rangeType: 'atLeast', range: 10 },
      },
    },
  ],
}
