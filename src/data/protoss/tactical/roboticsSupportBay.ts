import type { TacticalCard } from '../../../types'

export const roboticsSupportBay: TacticalCard = {
  category: 'tactical',
  id: 'Robotics Support Bay',
  name: { en: 'Robotics Support Bay', ko: '로봇공학 지원소' },
  isUnique: true,
  wave: 4,
  gasPts: 35,
  resource: 1,
  slot: [{ unitType: 'Elite', count: 2 }],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Master of Robotics',
      name: { en: 'Master of Robotics', ko: '로봇공학의 대가' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'The active Mechanical Unit resolves the HEAL (2) effect.',
        ko: '활성화된 기계 유닛은 치유(2)한다.',
      },
    },
  ],
}
