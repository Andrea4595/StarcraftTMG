import type { TacticalCard } from '../../../types'

export const hydraliskDen: TacticalCard = {
  category: 'tactical',
  id: 'Hydralisk Den',
  name: { en: 'Hydralisk Den', ko: 'Hydralisk Den' },
  isUnique: false,
  gasPts: 35,
  resource: 1,
  slot: [{ unitType: 'Elite', count: 2 }],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Missile Attacks',
      name: { en: 'Missile Attacks', ko: 'Missile Attacks' },
      phase: 'Assault',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Unit's first Ranged Weapon used gains PRECISION (1).",
        ko: '활성화 중인 유닛이 처음으로 사용하는 사격은 프리시전(1)을 얻는다.',
      },
    },
  ],
}
