import type { TacticalCard } from '../../../types'

export const armory: TacticalCard = {
  category: 'tactical',
  name: 'Armory',
  isUnique: false,
  gasPts: 30,
  resource: 1,
  slot: [{ unitType: 'Elite', count: 1 }],
  cardAbilities: [
    {
      kind: 'rule',
      name: 'Vehicle Plating',
      phase: 'Any',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: 'Use before a Friendly Mechanical Unit makes an Armour Roll. That Unit gains TOUGH (1) for this roll.',
        ko: '아군 Mechanical 유닛이 Armour Roll을 하기 전에 사용한다. 그 유닛은 이 굴림에 대해 TOUGH (1)을 얻는다.',
      },
    },
    {
      kind: 'rule',
      name: 'Vehicle Weapons',
      phase: 'Assault',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Mechanical Unit's first Ranged Weapon used gain CRITICAL HIT (1).",
        ko: '활성화 중인 Mechanical 유닛이 처음 사용하는 원거리 무기가 CRITICAL HIT (1)을 얻는다.',
      },
    },
  ],
}
