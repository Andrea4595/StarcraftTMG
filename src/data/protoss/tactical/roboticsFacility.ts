import type { TacticalCard } from '../../../types'

export const roboticsFacility: TacticalCard = {
  category: 'tactical',
  id: 'Robotics Facility',
  name: { en: 'Robotics Facility', ko: '로봇공학 시설' },
  isUnique: true,
  wave: 2,
  gasPts: 35,
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
        ko: '아군 기계 지상 유닛이 방어 굴림을 수행하기 전에 사용합니다. 해당 유닛이 보호막 가동 상태라면, 이번 굴림에 강인함(1)과 경감(1)을 얻습니다.',
      },
    },
  ],
}
