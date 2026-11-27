import type { TacticalCard } from '../../../types'

export const raynorsRaiders: TacticalCard = {
  category: 'tactical',
  id: "Raynor's Raiders",
  name: { en: "Raynor's Raiders", ko: '레이너 특공대' },
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
      id: 'Rapid Ingress',
      name: { en: 'Rapid Ingress', ko: '신속 침투' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Set a Friendly Point Defence Drone Unit anywhere on the battlefield, more than 1" away from any Enemy model. Remove this Unit at the End of the Round.',
        ko: '전장 아무 위치에 아군 국지 방어기 유닛 1개를 놓습니다. 해당 유닛은 모든 적 모형으로부터 1인치 초과해서 떨어져 있어야 합니다. 라운드 종료 시 이 유닛을 제거합니다.',
      },
      summonsUnitId: 'Point Defense Drone',
      simulatorFeature: {
        kind: 'summonUnit',
        unitId: 'Point Defense Drone',
        placement: { rangeType: 'atLeast', range: 1 },
      },
    },
    {
      kind: 'rule',
      id: 'Ready for Pickup?',
      name: { en: 'Ready for Pickup?', ko: '탑승 준비 됐나요?' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Once per Game. The active Unit resolves the PLACE (12) effect. Models set by this effect cannot be set up Within the Engagement Range of any Enemy Unit. This resolves instead of performing a standard action.',
        ko: '게임당 1회. 활성화된 유닛은 배치(12) 효과를 수행합니다. 이 효과로 놓이는 모형은 어떤 적 유닛의 교전 범위 이내에도 놓을 수 없습니다. 이 효과는 일반 행동을 수행하는 대신 해결됩니다.',
      },
    },
  ],
}
