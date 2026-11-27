import type { TacticalCard } from '../../../types'

export const nexus: TacticalCard = {
  category: 'tactical',
  id: 'Nexus',
  name: { en: 'Nexus', ko: '연결체' },
  isUnique: true,
  gasPts: 40,
  resource: 1,
  slot: [{ unitType: 'Core', count: 2 }],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Ancient Pride',
      name: { en: 'Ancient Pride', ko: '고대의 긍지' },
      phase: 'Any',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Unit's first Weapon used gains INSTANT.",
        ko: '활성화된 유닛이 이번 단계에서 처음 사용하는 무기는 반응 불가 특성을 얻습니다.',
      },
    },
    {
      kind: 'rule',
      id: 'Strategic Recall',
      name: { en: 'Strategic Recall', ko: '전략 소환' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'The active, Unengaged Ground Unit is returned to Reserves instead of performing an action.',
        ko: '활성화된 교전 중이 아닌 지상 유닛은 행동을 수행하는 대신 예비 병력으로 복귀합니다.',
      },
    },
  ],
}
