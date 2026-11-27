import type { TacticalCard } from '../../../types'

export const engineeringBay: TacticalCard = {
  category: 'tactical',
  id: 'Engineering Bay',
  name: { en: 'Engineering Bay', ko: '공학 연구소' },
  isUnique: false,
  gasPts: 25,
  resource: 1,
  slot: [{ unitType: 'Core', count: 1 }],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Infantry Armor',
      name: { en: 'Infantry Armor', ko: '보병 장갑' },
      phase: 'Any',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: 'Use before a Friendly Biological Unit makes an Armour Roll. That Unit gains TOUGH (1) for this roll.',
        ko: '아군 생체 유닛이 방어 굴림을 수행하기 전에 사용합니다. 해당 굴림 동안 그 유닛은 강인함(1) 특성을 얻습니다.',
      },
    },
    {
      kind: 'rule',
      id: 'Infantry Weapons',
      name: { en: 'Infantry Weapons', ko: '보병 무기' },
      phase: 'Assault',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Biological Unit's first Ranged Weapon used gains CRITICAL HIT (1).",
        ko: '활성화된 생체 유닛이 이번 단계에서 처음 사용하는 원거리 무기는 치명타(1) 특성을 얻습니다.',
      },
    },
  ],
}
