import type { TacticalCard } from '../../../types'

export const overlord: TacticalCard = {
  category: 'tactical',
  id: 'Overlord',
  name: { en: 'Overlord', ko: 'Overlord' },
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
      name: { en: 'Ventral Sacs', ko: 'Ventral Sacs' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: "Set a Faction Indicator anywhere on the battlefield more than 10\" away from any Enemy model. At the End of the Round, the controlling player may Deploy one Ground Unit from Reserves in base-to-base contact with this Faction Indicator.",
        ko: '다른 적과 10" 이상 떨어지게 팩션 마커를 둔다. 라운드 종료 시, 플레이어는 그 마커와 베이스 접촉되게 리저브에서 지상유닛을 하나 배치할 수 있다.',
      },
    },
    {
      kind: 'rule',
      id: 'Excrete Creep',
      name: { en: 'Excrete Creep', ko: 'Excrete Creep' },
      phase: 'Assault',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Set a Creep Tumor token on the battlefield Within 6" (Line of Sight is not required) of either a Friendly Entry Edge or an existing Friendly Creep Tumor token.',
        ko: '이미 배치된 점막 종양이나 아군 엔트리 엣지의 6" 안에 점막 종양을 배치한다. 이 배치에 시야는 불필요하다.',
      },
    },
  ],
}
