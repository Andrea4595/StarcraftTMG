import type { TacticalCard } from '../../../types'

export const kerrigansSwarm: TacticalCard = {
  category: 'tactical',
  id: "Kerrigan's Swarm",
  name: { en: "Kerrigan's Swarm", ko: "Kerrigan's Swarm" },
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
      id: 'Wild Mutation',
      name: { en: 'Wild Mutation', ko: 'Wild Mutation' },
      phase: 'Any',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'If the active unit is ON CREEP, the Unit gains BUFF Speed (1) and its first Weapon used gains PRECISION (1).',
        ko: '활성화된 유닛이 점막 위에 있다면 그 유닛은 버프 스피드(1)를 얻고, 처음으로 사용하는 무기에 프리시전(1)을 얻는다.',
      },
    },
    {
      kind: 'rule',
      id: 'Zerg Creep',
      name: { en: 'Zerg Creep', ko: 'Zerg Creep' },
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'During Army Building, select exactly one Creep Card and add it to their Army List, paying its listed cost (if any).',
        ko: '아미 구성 시, 점막 카드 중 하나를 선택해 아미에 넣는다. (그 카드가 자원을 소모한다면 그만큼 소모한다)',
      },
    },
    {
      kind: 'rule',
      id: 'Omega Network',
      name: { en: 'Omega Network', ko: 'Omega Network' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: "If there is no Friendly Omega Worm on the battlefield, set a Friendly Omega Worm Unit anywhere on GROUND LEVEL of the battlefield, more than 10\" away from any Enemy model. This Round, the Omega Worm is not eligible to use its Special Abilities (excluding Structure).",
        ko: '전장에 아군 오메가 벌레가 없다면, 전장의 아무곳에, 다른 적 유닛으로부터 10" 이상 떨어져 있는 상태로 전장의 지면에 오메가 벌레를 배치한다. 그렇게 배치된 오메가 벌레는 그 라운드 동안 특수 능력을 사용할 수 없다. (구조물 규칙은 제외된다.)',
      },
    },
  ],
}
