import type { TacticalCard } from '../../../types'

export const observer: TacticalCard = {
  category: 'tactical',
  id: 'Observer',
  name: { en: 'Observer', ko: '관측선' },
  isUnique: true,
  gasPts: 25,
  resource: 1,
  slot: [{ unitType: 'Support', count: 1 }],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Surveillance',
      name: { en: 'Surveillance', ko: '감시 태세' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Set a Faction Indicator anywhere on the battlefield. While Enemy Units are Within 6" of this Faction Indicator, they lose HIDDEN Status.',
        ko: '팩션 마커를 전장에 설치한다. 그 팩션 마커의 6”이내의 모든 적은 은폐 상태를 잃는다.',
      },
    },
    {
      kind: 'rule',
      id: 'Gravitic Boosters',
      name: { en: 'Gravitic Boosters', ko: '중력 가속' },
      phase: 'Assault',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: 'Use after a Friendly Unit rolls a D6 for Charge Distance. Add 1 to the Charge Distance for this Unit.',
        ko: '아군 유닛이 차지를 위해 D6을 굴린 뒤에 사용한다. 그 차지 값에 +1',
      },
    },
  ],
}
