import type { TacticalCard } from '../../../types'

export const dropship: TacticalCard = {
  category: 'tactical',
  id: 'Dropship',
  name: { en: 'Dropship', ko: 'Dropship' },
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
      id: 'Strap in!',
      name: { en: 'Strap in!', ko: 'Strap in!' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'The active, Unengaged Ground Unit is returned to Reserves instead of performing an action.',
        ko: '활성화중인 인게이지 상태가 아닌 지상 유닛을 액션을 하는 대신 리저브 상태로 되돌린다.',
      },
    },
    {
      kind: 'rule',
      id: 'Ready For Dust-off',
      name: { en: 'Ready For Dust-off', ko: 'Ready For Dust-off' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Set a Faction Indicator anywhere on the battlefield more than 10" away from any Enemy model. At the End of the Round, the controlling player may Deploy one Ground Unit from Reserves in base-to-base contact with this Faction Indicator.',
        ko: '다른 적 유닛의 10" 밖에 팩션 마커를 설치한다. 라운드 종료 시 플레이어는 리저브 상태의 지상 유닛 하나를 팩션 마커와 베이스 접촉되게 배치할 수 있다.',
      },
    },
  ],
}
