import type { TacticalCard } from '../../../types'

export const raynorsRaiders: TacticalCard = {
  category: 'tactical',
  name: "Raynor's Raiders",
  isUnique: true,
  resource: 1,
  slot: [
    { unitType: 'Hero', count: 1 },
    { unitType: 'Core', count: 3 },
    { unitType: 'Support', count: 1 },
  ],
  cardAbilities: [
    {
      kind: 'rule',
      name: 'Rapid Ingress',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Set a Friendly Point Defence Drone Unit anywhere on the battlefield, more than 1" away from any Enemy model. Remove this Unit at the End of the Round.',
        ko: '아군 Point Defence Drone 유닛을 전장의 어디든 모든 적 모델로부터 1" 넘게 떨어진 곳에 놓는다. 라운드 종료 시 이 유닛을 제거한다.',
      },
    },
    {
      kind: 'rule',
      name: 'Ready for Pickup?',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Once per Game. The active Unit resolves the PLACE (12) effect. Models set by this effect cannot be set up Within the Engagement Range of any Enemy Unit. This resolves instead of performing a standard action.',
        ko: '게임당 1회. 활성화 중인 유닛이 PLACE (12) 효과를 해결한다. 이 효과로 놓이는 모델은 어떤 적 유닛의 Engagement Range 이내에도 놓을 수 없다. 이것은 표준 행동을 수행하는 대신 해결한다.',
      },
    },
  ],
}
