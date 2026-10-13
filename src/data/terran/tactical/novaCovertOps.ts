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
        ko: '아군 유닛의 12" 이내이며 모든 적 모델로부터 1" 넘게 떨어진 곳에 아군 파괴 드론 유닛을 배치한다. 라운드 종료 시 이 유닛을 제거한다.',
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
        ko: '전장의 적 유닛 하나를 목표로 삼는다. 아군 유닛이 그 유닛을 목표로 공격할 때, 처음으로 사용하는 근접 또는 원거리 무기는 크리티컬 힛(1)과 프리시전(1)을 얻는다.',
      },
    },
  ],
}
