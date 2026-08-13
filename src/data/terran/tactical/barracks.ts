import type { TacticalCard } from '../../../types'

export const barracks: TacticalCard = {
  category: 'tactical',
  name: 'Barracks',
  isUnique: false,
  gasPts: 25,
  resource: 1,
  slot: [{ unitType: 'Core', count: 1 }],
  cardAbilities: [
    {
      kind: 'rule',
      name: 'Go! Go! Go!',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'The active Biological Unit performs a 2" Move action. This does not count towards its action limit.',
        ko: '활성화 중인 Biological 유닛이 2" Move action을 수행한다. 이는 해당 유닛의 행동 제한에 포함되지 않는다.',
      },
    },
  ],
}
