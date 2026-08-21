import type { TacticalCard } from '../../../types'

export const factory: TacticalCard = {
  category: 'tactical',
  id: 'Factory',
  name: { en: 'Factory', ko: '군수 공장' },
  isUnique: false,
  gasPts: 35,
  resource: 1,
  slot: [{ unitType: 'Elite', count: 2 }],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Field Repair',
      name: { en: 'Field Repair', ko: '야전 수리' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'The active Mechanical Unit resolves the HEAL (2) effect.',
        ko: '활성화중인 아군 기계 유닛에게 치유(2)를 적용한다.',
      },
    },
  ],
}
