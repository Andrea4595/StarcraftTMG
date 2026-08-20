import type { TacticalCard } from '../../../types'

export const armory: TacticalCard = {
  category: 'tactical',
  id: 'Armory',
  name: { en: 'Armory', ko: 'Armory' },
  isUnique: false,
  gasPts: 30,
  resource: 1,
  slot: [{ unitType: 'Elite', count: 1 }],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Vehicle Plating',
      name: { en: 'Vehicle Plating', ko: 'Vehicle Plating' },
      phase: 'Any',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: 'Use before a Friendly Mechanical Unit makes an Armour Roll. That Unit gains TOUGH (1) for this roll.',
        ko: '아군 기계 유닛이 아머 롤을 할 때 사용할 수 있다. 그 유닛은 그 굴림에서 터프(1)을 갖는다.',
      },
    },
    {
      kind: 'rule',
      id: 'Vehicle Weapons',
      name: { en: 'Vehicle Weapons', ko: 'Vehicle Weapons' },
      phase: 'Assault',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Mechanical Unit's first Ranged Weapon used gain CRITICAL HIT (1).",
        ko: '활성화중인 기계 유닛이 처음으로 사용하는 사격무기는 크리티컬 힛(1)을 갖는다.',
      },
    },
  ],
}
