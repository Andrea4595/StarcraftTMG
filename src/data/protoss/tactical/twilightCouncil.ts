import type { TacticalCard } from '../../../types'

export const twilightCouncil: TacticalCard = {
  category: 'tactical',
  name: 'Twilight Council',
  isUnique: true,
  gasPts: 45,
  resource: 1,
  slot: [
    { unitType: 'Elite', count: 1 },
    { unitType: 'Support', count: 1 },
  ],
  cardAbilities: [
    {
      kind: 'rule',
      name: 'Veil of Shadows',
      phase: 'Any',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: 'Use after a Friendly Unit resolves a PLACE effect. That Unit immediately resolves the HEAL (2) effect.',
        ko: '아군 유닛이 PLACE 효과를 처리한 후 사용한다. 그 유닛은 즉시 HEAL (2) 효과를 처리한다.',
      },
    },
    {
      kind: 'rule',
      name: 'Weapons of the Firstborn',
      phase: 'Assault',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Ground Unit's first Ranged Weapon used gains BUFF Range (4).",
        ko: '활성화 중인 지상 유닛이 처음 사용하는 원거리 무기는 BUFF Range (4)를 얻는다.',
      },
    },
  ],
}
