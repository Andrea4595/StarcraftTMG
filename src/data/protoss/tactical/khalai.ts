import type { TacticalCard } from '../../../types'

export const khalai: TacticalCard = {
  category: 'tactical',
  name: 'Khalai',
  isUnique: true,
  resource: 1,
  slot: [
    { unitType: 'Hero', count: 1 },
    { unitType: 'Elite', count: 2 },
    { unitType: 'Core', count: 3 },
  ],
  cardAbilities: [
    {
      kind: 'rule',
      name: 'Pylon Warp-In',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'If there is no Friendly Pylon on the battlefield, set a Friendly Pylon Unit anywhere on the GROUND LEVEL of the battlefield more than 10" away from any Enemy model. This Round, the Pylon is not eligible to use its Special Abilities (excluding Structure).',
        ko: '전장에 아군 Pylon이 없다면, 적 모델로부터 10" 넘게 떨어진 전장의 GROUND LEVEL 아무 곳에나 아군 Pylon 유닛을 놓는다. 이번 라운드에 그 Pylon은 자신의 Special Ability를 사용할 수 없다 (Structure 제외).',
      },
    },
    {
      kind: 'rule',
      name: 'Bound by the Khala',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: "At the end of the active Unit's Activation, select one other Friendly Unit eligible to Activate in the current Phase. Immediately Activate that Unit.",
        ko: '활성화 중인 유닛의 Activation이 끝날 때, 현재 Phase에 Activate할 수 있는 다른 아군 유닛 하나를 선택한다. 그 유닛을 즉시 Activate한다.',
      },
    },
  ],
}
