import type { TacticalCard } from '../../../types'

export const factoryTechLab: TacticalCard = {
  category: 'tactical',
  id: 'Factory (Tech Lab)',
  name: { en: 'Factory (Tech Lab)', ko: '기술실 군수 공장' },
  isUnique: true,
  gasPts: 0,
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
    {
      kind: 'rule',
      id: "Pound 'Em Flat!",
      name: { en: "Pound 'Em Flat!", ko: '짓눌러버려!' },
      phase: 'Assault',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'If the active Mechanical Unit has the Stationary Status, its first Ranged Weapon used gains PRECISION (2).',
        ko: '활성화중인 아군 기계 유닛이 정지 상태라면, 그 유닛이 처음으로 사용하는 사격 무기는 프리시전(2)를 얻는다.',
      },
    },
  ],
}
