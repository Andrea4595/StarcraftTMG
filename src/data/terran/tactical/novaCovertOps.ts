import type { TacticalCard } from '../../../types'

export const novaCovertOps: TacticalCard = {
  category: 'tactical',
  id: 'Nova Covert Ops',
  name: { en: 'Nova Covert Ops', ko: '노바 비밀 작전' },
  isUnique: true,
  wave: 3,
  resource: 1,
  slot: [
    { unitType: 'Hero', count: 1 },
    { unitType: 'Elite', count: 1 },
    { unitType: 'Core', count: 3 },
    { unitType: 'Support', count: 1 },
  ],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Griffin Support',
      name: { en: 'Griffin Support', ko: '그리핀 지원' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Set a Friendly Sabotage Drone Unit Within 12" of a Friendly Unit, more than 1" away from any Enemy model. Remove this Unit at the End of the Round.',
        ko: '아군 유닛의 12인치 이내에 들어온 상태이면서 모든 적 모형으로부터 1인치 초과 떨어진 위치에 아군 파괴 드론 유닛 1개를 놓습니다. 라운드 종료 시 해당 유닛을 제거합니다.',
      },
      summonsUnitId: 'Sabotage Drone',
      simulatorFeature: {
        kind: 'summonUnit',
        unitId: 'Sabotage Drone',
        placement: { rangeType: 'within', range: 12 },
      },
    },
    {
      kind: 'rule',
      id: 'Mark for Death',
      name: { en: 'Mark for Death', ko: '죽음의 표식' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Target an Enemy Unit on the battlefield. When a Friendly Unit makes an Attack targeting that Unit, its first Melee or Ranged Weapon used gains CRITICAL HIT (1) and PRECISION (1).',
        ko: '전장에 있는 적 유닛 1개를 대상으로 지정합니다. 아군 유닛이 해당 유닛을 대상으로 공격을 수행할 때, 그 공격에서 처음 사용하는 근접전 또는 원거리 무기는 치명타(1)와 정밀(1) 특성을 얻습니다.',
      },
    },
  ],
}
