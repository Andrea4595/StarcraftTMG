import type { TacticalCard } from '../../../types'

export const zagarasSwarm: TacticalCard = {
  category: 'tactical',
  id: "Zagara's Swarm",
  name: { en: "Zagara's Swarm", ko: '자가라의 군단' },
  isUnique: true,
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
        ko: '적 유닛이 아군 유닛에게 근접 공격을 선언할 때 사용한다. 그 아군 유닛은 그 공격에 대해 회피 롤을 할 수 있다.',
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
        ko: '아미 구성 시, 점막 카드 중 하나를 선택해 아미에 넣는다. (그 카드가 자원을 소모한다면 그만큼 소모한다)',
      },
    },
    {
      kind: 'rule',
      id: 'Scourge Queen',
      name: { en: 'Scourge Queen', ko: '재앙의 여왕' },
      phase: 'Combat',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'If the active Unit contains more models than the combined number of models in all Engaged Enemy Units, its Close Combat Weapons gain INSTANT and PRECISION (4).',
        ko: '활성화된 유닛의 모델 수가 그 유닛과 인게이지된 모든 적 유닛의 모델 수 합보다 많다면, 그 유닛의 근접 무기는 인스턴트와 프리시전(4)을 얻는다.',
      },
    },
  ],
}
