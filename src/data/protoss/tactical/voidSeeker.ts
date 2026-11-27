import type { TacticalCard } from '../../../types'

export const voidSeeker: TacticalCard = {
  category: 'tactical',
  id: 'Void Seeker',
  name: { en: 'Void Seeker', ko: '공허의 구도자' },
  isUnique: true,
  wave: 2,
  gasPts: 40,
  resource: 1,
  slot: [{ unitType: 'Core', count: 1 }],
  tags: [{ name: 'Nerazim' }],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Personal Transport',
      name: { en: 'Personal Transport', ko: '개인 수송선' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Instead of performing an action, the active, Unengaged Ground Unit is returned to Reserves. Then, it performs a Deploy action.',
        ko: '활성화된 교전 중이 아닌 지상 유닛은 행동을 수행하는 대신, 예비 병력으로 복귀합니다. 그 후, 해당 유닛은 전개 행동을 수행합니다.',
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
        ko: '이 유닛은 다른 행동을 수행할 때까지 은신 상태를 얻습니다.',
      },
    },
  ],
}
