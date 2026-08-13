import type { TacticalCard } from '../../../types'

export const overlord: TacticalCard = {
  category: 'tactical',
  name: 'Overlord',
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
      name: 'Ventral Sacs',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: "Set a Faction Indicator anywhere on the battlefield more than 10\" away from any Enemy model. At the End of the Round, the controlling player may Deploy one Ground Unit from Reserves in base-to-base contact with this Faction Indicator.",
        ko: '모든 적 모델로부터 10"보다 멀리 떨어진 전장의 아무 곳에나 Faction Indicator를 놓는다. 라운드 종료 시, 소유 플레이어는 이 Faction Indicator와 base-to-base 접촉하도록 Reserves에서 지상 유닛 하나를 Deploy할 수 있다.',
      },
    },
    {
      kind: 'rule',
      name: 'Excrete Creep',
      phase: 'Assault',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Set a Creep Tumor token on the battlefield Within 6" (Line of Sight is not required) of either a Friendly Entry Edge or an existing Friendly Creep Tumor token.',
        ko: '아군 Entry Edge 또는 기존 아군 Creep Tumor token의 6" 이내 전장에 Creep Tumor token을 놓는다 (Line of Sight는 필요하지 않다).',
      },
    },
  ],
}
