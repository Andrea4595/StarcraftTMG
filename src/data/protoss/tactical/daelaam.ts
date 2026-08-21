import type { TacticalCard } from '../../../types'

export const daelaam: TacticalCard = {
  category: 'tactical',
  id: 'Daelaam',
  name: { en: 'Daelaam', ko: '댈람' },
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
      id: "Dae'Uhl",
      name: { en: "Dae'Uhl", ko: "대'울" },
      phase: 'Any',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: 'When a Friendly Unit receives Damage, reduce the Total Damage by 2 (to a minimum of 1).',
        ko: '아군 유닛이 데미지를 받을 때 총 데미지를 2 줄인다(최소 1)',
      },
    },
    {
      kind: 'rule',
      id: 'Mass Recall',
      name: { en: 'Mass Recall', ko: '대규모 귀환' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Once per Game. Set a Faction Indicator anywhere on the battlefield. All Friendly Protoss Units Within 6" of this Faction Indicator are removed from the battlefield and returned to Reserves.',
        ko: '게임당 한번, 전장 아무곳에나 팩션 마커를 배치한다. 마커의 6”이내의 모든 아군 프로토스 유닛을 전장에서 제거해서 리저브상태로 되돌린다.',
      },
    },
  ],
}
