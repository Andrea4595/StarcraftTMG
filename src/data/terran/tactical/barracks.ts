import type { TacticalCard } from '../../../types'

export const barracks: TacticalCard = {
  category: 'tactical',
  id: 'Barracks',
  name: { en: 'Barracks', ko: '병영' },
  isUnique: false,
  gasPts: 30,
  resource: 1,
  slot: [{ unitType: 'Core', count: 1 }],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Go! Go! Go!',
      name: { en: 'Go! Go! Go!', ko: '자, 빨리빨리!' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'The active Biological Unit performs a 2" Move action. This does not count towards its action limit.',
        ko: '활성화된 생체 유닛은 2인치 이동 행동을 수행합니다. 이 행동은 행동 제한에 포함되지 않습니다.',
      },
    },
  ],
}
