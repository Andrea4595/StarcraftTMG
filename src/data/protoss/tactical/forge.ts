import type { TacticalCard } from '../../../types'

export const forge: TacticalCard = {
  category: 'tactical',
  name: 'Forge',
  isUnique: false,
  gasPts: 30,
  resource: 1,
  slot: [{ unitType: 'Elite', count: 1 }],
  cardAbilities: [
    {
      kind: 'rule',
      name: 'Ground Armor',
      phase: 'Any',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: 'Use before a Friendly Ground Unit makes an Armour Roll. That Unit gains TOUGH (1) for this roll.',
        ko: '아군 지상 유닛이 Armour Roll을 하기 전에 사용한다. 그 유닛은 이 굴림에 TOUGH (1)을 얻는다.',
      },
    },
    {
      kind: 'rule',
      name: 'Ground Weapons',
      phase: 'Assault',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Ground Unit's first Ranged Weapon used gains CRITICAL HIT (1).",
        ko: '활성화 중인 지상 유닛이 처음 사용하는 원거리 무기는 CRITICAL HIT (1)을 얻는다.',
      },
    },
  ],
}
