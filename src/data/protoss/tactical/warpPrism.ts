import type { TacticalCard } from '../../../types'

export const warpPrism: TacticalCard = {
  category: 'tactical',
  id: 'Warp Prism',
  name: { en: 'Warp Prism', ko: '차원 분광기' },
  isUnique: true,
  gasPts: 35,
  resource: 1,
  slot: [{ unitType: 'Core', count: 2 }],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Phase',
      name: { en: 'Phase', ko: '위상' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'The active Unit resolves the PLACE (3) effect.',
        ko: '활성화된 유닛은 배치(3) 효과를 수행합니다.',
      },
    },
    {
      kind: 'rule',
      id: 'Warp Conduit',
      name: { en: 'Warp Conduit', ko: '차원로' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Set a Faction Indicator anywhere on the battlefield more than 10" away from any Enemy model. At the End of the Round, the controlling player may Deploy one Ground Unit from Reserves in base-to-base contact with this Faction Indicator.',
        ko: '적 모형으로부터 10인치 초과해서 떨어진 전장 아무 위치에 진영 표시 마커 1개를 놓습니다. 라운드 종료 시, 예비 병력에서 지상 유닛 1개를 이 진영 표시 마커와 베이스 접촉 상태로 전개할 수 있습니다.',
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
