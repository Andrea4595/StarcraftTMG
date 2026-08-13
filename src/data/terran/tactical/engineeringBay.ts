import type { TacticalCard } from '../../../types'

export const engineeringBay: TacticalCard = {
  category: 'tactical',
  name: 'Engineering Bay',
  isUnique: false,
  gasPts: 25,
  resource: 1,
  slot: [{ unitType: 'Core', count: 1 }],
  cardAbilities: [
    {
      kind: 'rule',
      name: 'Infantry Armor',
      phase: 'Any',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: 'Use before a Friendly Biological Unit makes an Armour Roll. That Unit gains TOUGH (1) for this roll.',
        ko: '아군 Biological 유닛이 Armour Roll을 하기 전에 사용한다. 그 유닛은 이 굴림에 대해 TOUGH (1)을 얻는다.',
      },
    },
    {
      kind: 'rule',
      name: 'Infantry Weapons',
      phase: 'Assault',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Biological Unit's first Ranged Weapon used gains CRITICAL HIT (1).",
        ko: '활성화 중인 Biological 유닛이 처음 사용하는 원거리 무기가 CRITICAL HIT (1)을 얻는다.',
      },
    },
  ],
}
