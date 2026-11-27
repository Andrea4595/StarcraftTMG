import type { TacticalCard } from '../../../types'

export const factoryTechLab: TacticalCard = {
  category: 'tactical',
  id: 'Factory (Tech Lab)',
  name: { en: 'Factory (Tech Lab)', ko: '군수 공장 (기술실)' },
  isUnique: true,
  wave: 2,
  gasPts: 40,
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
        ko: '활성화된 기계 유닛은 치유(2) 효과를 수행합니다.',
      },
    },
    {
      kind: 'rule',
      id: "Pound 'Em Flat!",
      name: { en: "Pound 'Em Flat!", ko: '납작하게 만들어 주마!' },
      phase: 'Assault',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'If the active Mechanical Unit has the Stationary Status, its first Ranged Weapon used gains PRECISION (2).',
        ko: '활성화된 기계 유닛이 정지한 상태라면, 처음 사용하는 원거리 무기는 정밀(2) 특성을 얻습니다.',
      },
    },
  ],
}
