import type { TacticalCard } from '../../../types'

export const kerrigansSwarm: TacticalCard = {
  category: 'tactical',
  name: "Kerrigan's Swarm",
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
      name: 'Wild Mutation',
      phase: 'Any',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'If the active unit is ON CREEP, the Unit gains BUFF Speed (1) and its first Weapon used gains PRECISION (1).',
        ko: '활성화 중인 유닛이 ON CREEP이라면, 그 유닛은 BUFF Speed (1)을 얻고 처음 사용하는 무기는 PRECISION (1)을 얻는다.',
      },
    },
    {
      kind: 'rule',
      name: 'Zerg Creep',
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'During Army Building, select exactly one Creep Card and add it to their Army List, paying its listed cost (if any).',
        ko: '부대 편성 중에, Creep Card를 정확히 하나 선택해 표기된 비용(있다면)을 지불하고 부대 목록에 추가한다.',
      },
    },
    {
      kind: 'rule',
      name: 'Omega Network',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: "If there is no Friendly Omega Worm on the battlefield, set a Friendly Omega Worm Unit anywhere on GROUND LEVEL of the battlefield, more than 10\" away from any Enemy model. This Round, the Omega Worm is not eligible to use its Special Abilities (excluding Structure).",
        ko: '전장에 아군 Omega Worm이 없다면, 모든 적 모델로부터 10"보다 멀리 떨어진 전장의 GROUND LEVEL 아무 곳에나 아군 Omega Worm 유닛을 놓는다. 이번 라운드에 그 Omega Worm은 Special Abilities를 사용할 수 없다 (Structure 제외).',
      },
    },
  ],
}
