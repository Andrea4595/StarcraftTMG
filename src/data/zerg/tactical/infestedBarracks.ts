import type { TacticalCard } from '../../../types'

export const infestedBarracks: TacticalCard = {
  category: 'tactical',
  id: 'Infested Barracks',
  name: { en: 'Infested Barracks', ko: '감염된 병영' },
  isUnique: false,
  wave: 4,
  gasPts: 30,
  resource: 1,
  slot: [{ unitType: 'Core', count: 1 }],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'For the Swarm!',
      name: { en: 'For the Swarm!', ko: '군단을 위하여!' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'The active Biological Ground Unit performs a 2" Move action. This does not count towards its action limit.',
        ko: '활성화중인 생체 지상 유닛은 2" 이동 액션을 한다. 이 이동은 액션을 제한하는 조건이 되지 않는다.',
      },
    },
  ],
}
