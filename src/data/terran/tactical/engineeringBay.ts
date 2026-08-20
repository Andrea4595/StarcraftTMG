import type { TacticalCard } from '../../../types'

export const engineeringBay: TacticalCard = {
  category: 'tactical',
  id: 'Engineering Bay',
  name: { en: 'Engineering Bay', ko: 'Engineering Bay' },
  isUnique: false,
  gasPts: 25,
  resource: 1,
  slot: [{ unitType: 'Core', count: 1 }],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Infantry Armor',
      name: { en: 'Infantry Armor', ko: 'Infantry Armor' },
      phase: 'Any',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: 'Use before a Friendly Biological Unit makes an Armour Roll. That Unit gains TOUGH (1) for this roll.',
        ko: '아군 생체 유닛이 아머 롤을 할 때 사용할 수 있다. 그 유닛은 그 굴림동안 터프(1)를 갖는다.',
      },
    },
    {
      kind: 'rule',
      id: 'Infantry Weapons',
      name: { en: 'Infantry Weapons', ko: 'Infantry Weapons' },
      phase: 'Assault',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Biological Unit's first Ranged Weapon used gains CRITICAL HIT (1).",
        ko: '활성화중인 생체 유닛이 처음으로 사용하는 사격무기는 크리티컬 힛(1)을 갖는다.',
      },
    },
  ],
}
