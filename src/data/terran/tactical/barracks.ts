import type { TacticalCard } from '../../../types'

export const barracks: TacticalCard = {
  category: 'tactical',
  id: 'Barracks',
  name: { en: 'Barracks', ko: 'Barracks' },
  isUnique: false,
  gasPts: 25,
  resource: 1,
  slot: [{ unitType: 'Core', count: 1 }],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Go! Go! Go!',
      name: { en: 'Go! Go! Go!', ko: 'Go! Go! Go!' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'The active Biological Unit performs a 2" Move action. This does not count towards its action limit.',
        ko: '활성화중인 아군 생체 유닛은 2" 이동 액션을 한다. 이 이동은 액션을 제한하는 조건이 되지 않는다.',
      },
    },
  ],
}
