import type { TacticalCard } from '../../../types'

export const voidSeeker: TacticalCard = {
  category: 'tactical',
  id: 'Void Seeker',
  name: { en: 'Void Seeker', ko: '공허 추적기' },
  isUnique: true,
  gasPts: 0,
  resource: 1,
  slot: [{ unitType: 'Core', count: 1 }],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Personal Transport',
      name: { en: 'Personal Transport', ko: '전용 수송' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Instead of performing an action, the active, Unengaged Ground Unit is returned to Reserves. Then, it performs a Deploy action.',
        ko: '활성화중이며 아직 액션을 하지 않은 인게이지 상태가 아닌 지상 유닛을, 액션을 하는 것 대신 리저브로 되돌린다. 그 후 그 유닛은 배치 액션을 수행한다.',
      },
    },
    {
      kind: 'rule',
      id: "Anakh Su'n",
      name: { en: "Anakh Su'n", ko: '아나크 순' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'This Unit gains the HIDDEN Status until it performs another action.',
        ko: '이 유닛은 다른 액션을 할 때까지 은폐 상태를 갖는다.',
      },
    },
  ],
}
