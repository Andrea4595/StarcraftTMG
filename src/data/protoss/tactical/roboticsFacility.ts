import type { TacticalCard } from '../../../types'

export const roboticsFacility: TacticalCard = {
  category: 'tactical',
  id: 'Robotics Facility',
  name: { en: 'Robotics Facility', ko: '로보틱스 시설' },
  isUnique: true,
  gasPts: 0,
  resource: 1,
  slot: [{ unitType: 'Elite', count: 2 }],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Plasma Shields',
      name: { en: 'Plasma Shields', ko: '플라즈마 보호막' },
      phase: 'Any',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: 'Use before a Friendly Mechanical Ground Unit makes an Armour Roll. If this Unit has the Shielded Status, it gains TOUGH (1) and DODGE (1) for this roll.',
        ko: '아군 기계 지상 유닛이 아머 롤을 하기 전에 사용한다. 그 유닛이 보호막 상태라면, 그 굴림에서 터프(1)와 닷지(1)를 얻는다.',
      },
    },
  ],
}
