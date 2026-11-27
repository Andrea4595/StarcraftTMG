import type { TacticalCard } from '../../../types'

export const kerrigansSwarm: TacticalCard = {
  category: 'tactical',
  id: "Kerrigan's Swarm",
  name: { en: "Kerrigan's Swarm", ko: '케리건의 군단' },
  isUnique: true,
  requiredCardGroup: 'Creep',
  resource: 1,
  slot: [
    { unitType: 'Hero', count: 1 },
    { unitType: 'Elite', count: 2 },
    { unitType: 'Core', count: 3 },
  ],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Wild Mutation',
      name: { en: 'Wild Mutation', ko: '야생 변이' },
      phase: 'Any',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'If the active unit is ON CREEP, the Unit gains BUFF Speed (1) and its first Weapon used gains PRECISION (1).',
        ko: '활성화된 유닛이 점막 위에 있다면, 속도(1) 강화를 얻고 해당 유닛이 이번 단계에서 처음 사용하는 무기는 정밀(1) 특성을 얻습니다.',
      },
    },
    {
      kind: 'rule',
      id: 'Zerg Creep',
      name: { en: 'Zerg Creep', ko: '저그 점막' },
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'During Army Building, select exactly one Creep Card and add it to their Army List, paying its listed cost (if any).',
        ko: '병력 편성 중, 점막 카드 1장을 반드시 선택하여 병력 목록에 추가해야 하며, 명시된 비용이 있다면 해당 비용을 지불해야 합니다.',
      },
    },
    {
      kind: 'rule',
      id: 'Omega Network',
      name: { en: 'Omega Network', ko: '오메가 망' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: "If there is no Friendly Omega Worm on the battlefield, set a Friendly Omega Worm Unit anywhere on GROUND LEVEL of the battlefield, more than 10\" away from any Enemy model. This Round, the Omega Worm is not eligible to use its Special Abilities (excluding Structure).",
        ko: '전장에 아군 오메가 벌레가 없다면, 적 모형으로부터 10인치 초과 떨어진 전장의 지면 아무 위치에 아군 오메가 벌레 유닛 1개를 놓습니다. 이번 라운드 동안 오메가 벌레는 특수 능력(구조물 제외)을 사용할 수 없습니다.',
      },
      summonsUnitId: 'Omega Worm',
      simulatorFeature: {
        kind: 'summonUnit',
        unitId: 'Omega Worm',
        placement: { rangeType: 'atLeast', range: 10 },
      },
    },
  ],
}
