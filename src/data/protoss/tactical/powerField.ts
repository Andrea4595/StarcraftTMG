import type { TacticalCard } from '../../../types'

export const powerField: TacticalCard = {
  category: 'tactical',
  id: 'Power Field',
  name: { en: 'Power Field', ko: '동력장' },
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
      id: 'Guardian Shell',
      name: { en: 'Guardian Shell', ko: '수호 보호막' },
      phase: 'Any',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: 'Use before a Friendly Ground Unit makes an Armour Roll. That Unit gains DODGE (2) for this roll.',
        ko: '아군 지상 유닛이 방어 굴림을 수행하기 전에 사용합니다. 해당 굴림 동안 그 유닛은 경감(2) 특성을 얻습니다.',
      },
    },
  ],
}
