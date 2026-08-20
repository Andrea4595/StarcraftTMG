import type { TacticalCard } from '../../../types'

export const factory: TacticalCard = {
  category: 'tactical',
  id: 'Factory',
  name: { en: 'Factory', ko: 'Factory' },
  isUnique: false,
  gasPts: 35,
  resource: 1,
  slot: [{ unitType: 'Elite', count: 2 }],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Field Repair',
      name: { en: 'Field Repair', ko: 'Field Repair' },
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
