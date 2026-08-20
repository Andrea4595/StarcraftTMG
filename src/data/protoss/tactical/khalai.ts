import type { TacticalCard } from '../../../types'

export const khalai: TacticalCard = {
  category: 'tactical',
  id: 'Khalai',
  name: { en: 'Khalai', ko: 'Khalai' },
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
      id: 'Pylon Warp-In',
      name: { en: 'Pylon Warp-In', ko: 'Pylon Warp-In' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'If there is no Friendly Pylon on the battlefield, set a Friendly Pylon Unit anywhere on the GROUND LEVEL of the battlefield more than 10" away from any Enemy model. This Round, the Pylon is not eligible to use its Special Abilities (excluding Structure).',
        ko: '만약 전장에 아군 수정탑이 없다면 수정탑을 전장의 지면 아무곳에나 배치한다. 다른 적 유닛에게서 10”이상 떨어져 있어야 한다. 그 라운드에 수정탑의 특수능력은 사용되지 못한다. (구조물 규칙은 제외한다)',
      },
    },
    {
      kind: 'rule',
      id: 'Bound by the Khala',
      name: { en: 'Bound by the Khala', ko: 'Bound by the Khala' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: "At the end of the active Unit's Activation, select one other Friendly Unit eligible to Activate in the current Phase. Immediately Activate that Unit.",
        ko: '활성화중인 유닛의 활성화가 마쳐진 후, 그 페이즈에 활성화가 가능한 다른 아군유닛을 하나 선택해서 즉시 활성화시킨다.',
      },
    },
  ],
}
