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
        ko: '활성화된 유닛은 위치(3)을 받는다.',
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
        ko: '팩션 마커를 다른 적 유닛과 10”이상 떨어지게 놓는다. 라운드 종료 시 리저브된 지상유닛 하나를 마커와 베이스접촉된 상태로 배치시킬 수 있다.',
      },
    },
  ],
}
