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
        ko: '활성화된 생체 지상 유닛은 2인치 이동 행동을 수행합니다. 이 행동은 행동 제한에 포함되지 않습니다.',
      },
    },
  ],
}
