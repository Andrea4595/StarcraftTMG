import type { TacticalCard } from '../../../types'

export const powerField: TacticalCard = {
  category: 'tactical',
  name: 'Power Field',
  isUnique: true,
  gasPts: 40,
  resource: 1,
  slot: [
    { unitType: 'Hero', count: 1 },
    { unitType: 'Elite', count: 1 },
    { unitType: 'Core', count: 1 },
  ],
  cardAbilities: [
    {
      kind: 'rule',
      name: 'Guardian Shell',
      phase: 'Any',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: 'Use before a Friendly Ground Unit makes an Armour Roll. That Unit gains DODGE (2) for this roll.',
        ko: '아군 지상 유닛이 Armour Roll을 하기 전에 사용한다. 그 유닛은 이 굴림에 DODGE (2)를 얻는다.',
      },
    },
  ],
}
