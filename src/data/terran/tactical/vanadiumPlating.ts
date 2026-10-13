import type { TacticalCard } from '../../../types'

export const vanadiumPlating: TacticalCard = {
  category: 'tactical',
  id: 'Vanadium Plating',
  name: { en: 'Vanadium Plating', ko: '바나듐 장갑판' },
  isUnique: false,
  wave: 3,
  gasPts: 25,
  resource: 1,
  slot: [{ unitType: 'Support', count: 1 }],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Crystalline Alloy',
      name: { en: 'Crystalline Alloy', ko: '결정질 합금' },
      phase: 'Any',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: 'Use before a Friendly Mechanical Unit makes an Armour Roll. That Unit gains DODGE (2) for this roll.',
        ko: '아군 기계 유닛이 아머 롤을 하기 전에 사용한다. 그 유닛은 이 굴림에 대해 닷지(2)를 얻는다.',
      },
    },
  ],
}
