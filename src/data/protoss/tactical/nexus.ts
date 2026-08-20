import type { TacticalCard } from '../../../types'

export const nexus: TacticalCard = {
  category: 'tactical',
  id: 'Nexus',
  name: { en: 'Nexus', ko: 'Nexus' },
  isUnique: true,
  gasPts: 35,
  resource: 1,
  slot: [{ unitType: 'Core', count: 2 }],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Ancient Pride',
      name: { en: 'Ancient Pride', ko: 'Ancient Pride' },
      phase: 'Any',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Unit's first Weapon used gains INSTANT.",
        ko: '활성화된 유닛이 첫번째로 사용하는 무기는 인스턴트를 갖는다.',
      },
    },
    {
      kind: 'rule',
      id: 'Strategic Recall',
      name: { en: 'Strategic Recall', ko: 'Strategic Recall' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'The active, Unengaged Ground Unit is returned to Reserves instead of performing an action.',
        ko: '활성화중이며 아직 액션을 하지 않은 인게이지상태가 아닌 지상유닛을, 액션을 하는것 대신 리저브로 되돌린다.',
      },
    },
  ],
}
