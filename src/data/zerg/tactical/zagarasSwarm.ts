import type { TacticalCard } from '../../../types'

export const zagarasSwarm: TacticalCard = {
  category: 'tactical',
  id: "Zagara's Swarm",
  name: { en: "Zagara's Swarm", ko: '자가라의 군단' },
  isUnique: true,
  requiredCardGroup: 'Creep',
  wave: 3,
  resource: 1,
  slot: [
    { unitType: 'Hero', count: 1 },
    { unitType: 'Core', count: 4 },
    { unitType: 'Support', count: 1 },
  ],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Instinctive Reaction',
      name: { en: 'Instinctive Reaction', ko: '본능적 반응' },
      phase: 'Any',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: 'Use when an Enemy Unit declares a Close Combat Attack against a Friendly Unit. That Friendly Unit becomes eligible to make an Evade Roll against that attack.',
        ko: '적 유닛이 아군 유닛을 대상으로 근접전 공격을 선언할 때 사용합니다. 해당 아군 유닛은 그 공격에 대해 회피 굴림을 할 수 있습니다.',
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
      id: 'Scourge Queen',
      name: { en: 'Scourge Queen', ko: '갈귀 여왕' },
      phase: 'Combat',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'If the active Unit contains more models than the combined number of models in all Engaged Enemy Units, its Close Combat Weapons gain INSTANT and PRECISION (4).',
        ko: '활성화된 유닛의 모형 수가 자신과 교전 중인 모든 적 유닛의 모형 수 합계보다 많다면, 해당 유닛의 근접전 무기는 반응 불가와 정밀(4)을 얻습니다.',
      },
    },
  ],
}
