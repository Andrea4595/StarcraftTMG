import type { TacticalCard } from '../../../types'

export const twilightCouncil: TacticalCard = {
  category: 'tactical',
  id: 'Twilight Council',
  name: { en: 'Twilight Council', ko: 'Twilight Council' },
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
      id: 'Veil of Shadows',
      name: { en: 'Veil of Shadows', ko: 'Veil of Shadows' },
      phase: 'Any',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: 'Use after a Friendly Unit resolves a PLACE effect. That Unit immediately resolves the HEAL (2) effect.',
        ko: '아군 유닛이 위치 효과를 사용한 후, 그 유닛에게 즉시 치유(2)를 적용시킨다.',
      },
    },
    {
      kind: 'rule',
      id: 'Weapons of the Firstborn',
      name: { en: 'Weapons of the Firstborn', ko: 'Weapons of the Firstborn' },
      phase: 'Assault',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Ground Unit's first Ranged Weapon used gains BUFF Range (4).",
        ko: '활성화중인 지상유닛이 첫번째로 사용하는 원거리무기는 버프 레인지(4)를 갖는다.',
      },
    },
  ],
}
