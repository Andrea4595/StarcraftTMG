import type { TacticalCard } from '../../../types'

export const warpPrism: TacticalCard = {
  category: 'tactical',
  name: 'Warp Prism',
  isUnique: true,
  gasPts: 35,
  resource: 1,
  slot: [{ unitType: 'Core', count: 2 }],
  cardAbilities: [
    {
      kind: 'rule',
      name: 'Phase',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'The active Unit resolves the PLACE (3) effect.',
        ko: '활성화 중인 유닛이 PLACE (3) 효과를 처리한다.',
      },
    },
    {
      kind: 'rule',
      name: 'Warp Conduit',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Set a Faction Indicator anywhere on the battlefield more than 10" away from any Enemy model. At the End of the Round, the controlling player may Deploy one Ground Unit from Reserves in base-to-base contact with this Faction Indicator.',
        ko: '적 모델로부터 10" 넘게 떨어진 전장의 아무 곳에나 Faction Indicator를 놓는다. 라운드 종료 시, 소유 플레이어는 Reserves에서 지상 유닛 하나를 이 Faction Indicator와 베이스를 맞닿게 Deploy할 수 있다.',
      },
    },
  ],
}
