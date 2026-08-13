import type { TacticalCard } from '../../../types'

export const daelaam: TacticalCard = {
  category: 'tactical',
  name: 'Daelaam',
  isUnique: true,
  resource: 1,
  slot: [
    { unitType: 'Elite', count: 1 },
    { unitType: 'Core', count: 3 },
    { unitType: 'Support', count: 1 },
  ],
  cardAbilities: [
    {
      kind: 'rule',
      name: "Dae'Uhl",
      phase: 'Any',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: 'When a Friendly Unit receives Damage, reduce the Total Damage by 2 (to a minimum of 1).',
        ko: '아군 유닛이 데미지를 받을 때, Total Damage를 2 감소시킨다 (최소 1).',
      },
    },
    {
      kind: 'rule',
      name: 'Mass Recall',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Once per Game. Set a Faction Indicator anywhere on the battlefield. All Friendly Protoss Units Within 6" of this Faction Indicator are removed from the battlefield and returned to Reserves.',
        ko: '게임당 1회. 전장의 아무 곳에나 Faction Indicator를 놓는다. 이 Faction Indicator에서 6" 이내의 모든 아군 Protoss 유닛은 전장에서 제거되어 Reserves로 돌아간다.',
      },
    },
  ],
}
