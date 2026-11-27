import type { TacticalCard } from '../../../types'

export const armory: TacticalCard = {
  category: 'tactical',
  id: 'Armory',
  name: { en: 'Armory', ko: '무기고' },
  isUnique: false,
  gasPts: 30,
  resource: 1,
  slot: [{ unitType: 'Elite', count: 1 }],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Vehicle Plating',
      name: { en: 'Vehicle Plating', ko: '차량 장갑' },
      phase: 'Any',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: 'Use before a Friendly Mechanical Unit makes an Armour Roll. That Unit gains TOUGH (1) for this roll.',
        ko: '아군 기계 유닛이 방어 굴림을 수행하기 전에 사용합니다. 해당 굴림 동안 그 유닛은 강인함(1) 특성을 얻습니다.',
      },
    },
    {
      kind: 'rule',
      id: 'Vehicle Weapons',
      name: { en: 'Vehicle Weapons', ko: '차량 무기' },
      phase: 'Assault',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Mechanical Unit's first Ranged Weapon used gain CRITICAL HIT (1).",
        ko: '활성화된 기계 유닛이 이번 단계에서 처음 사용하는 원거리 무기는 치명타(1) 특성을 얻습니다.',
      },
    },
  ],
}
