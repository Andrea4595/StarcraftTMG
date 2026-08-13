import type { TacticalCard } from '../../../types'

export const dropship: TacticalCard = {
  category: 'tactical',
  name: 'Dropship',
  isUnique: true,
  gasPts: 40,
  resource: 1,
  slot: [
    { unitType: 'Core', count: 1 },
    { unitType: 'Support', count: 1 },
  ],
  cardAbilities: [
    {
      kind: 'rule',
      name: 'Strap in!',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'The active, Unengaged Ground Unit is returned to Reserves instead of performing an action.',
        ko: '활성화 중인 Unengaged 지상 유닛이 행동을 수행하는 대신 Reserves로 돌아간다.',
      },
    },
    {
      kind: 'rule',
      name: 'Ready For Dust-off',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Set a Faction Indicator anywhere on the battlefield more than 10" away from any Enemy model. At the End of the Round, the controlling player may Deploy one Ground Unit from Reserves in base-to-base contact with this Faction Indicator.',
        ko: 'Faction Indicator를 전장의 어디든 모든 적 모델로부터 10" 넘게 떨어진 곳에 놓는다. 라운드 종료 시, 소유 플레이어는 Reserves에서 지상 유닛 하나를 이 Faction Indicator와 베이스를 맞대어 Deploy할 수 있다.',
      },
    },
  ],
}
