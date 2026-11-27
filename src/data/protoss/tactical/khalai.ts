import type { TacticalCard } from '../../../types'

export const khalai: TacticalCard = {
  category: 'tactical',
  id: 'Khalai',
  name: { en: 'Khalai', ko: '칼라이' },
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
      name: { en: 'Pylon Warp-In', ko: '수정탑 소환' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'If there is no Friendly Pylon on the battlefield, set a Friendly Pylon Unit anywhere on the GROUND LEVEL of the battlefield more than 10" away from any Enemy model. This Round, the Pylon is not eligible to use its Special Abilities (excluding Structure).',
        ko: '전장에 아군 수정탑이 없다면, 적 모형으로부터 10인치 초과해서 떨어진 전장의 지면 아무 위치에 아군 수정탑 유닛 1개를 놓습니다. 이번 라운드 동안 해당 수정탑은 특수 능력(구조물 제외)을 사용할 수 없습니다.',
      },
      summonsUnitId: 'Pylon',
      simulatorFeature: {
        kind: 'summonUnit',
        unitId: 'Pylon',
        placement: { rangeType: 'atLeast', range: 10 },
      },
    },
    {
      kind: 'rule',
      id: 'Bound by the Khala',
      name: { en: 'Bound by the Khala', ko: '신성한 칼라를 통해' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: "At the end of the active Unit's Activation, select one other Friendly Unit eligible to Activate in the current Phase. Immediately Activate that Unit.",
        ko: '활성화된 유닛의 활성화가 끝날 때, 현재 단계에서 활성화할 수 있는 다른 아군 유닛 1개를 선택합니다. 즉시 해당 유닛을 활성화합니다.',
      },
    },
  ],
}
