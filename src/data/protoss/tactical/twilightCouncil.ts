import type { TacticalCard } from '../../../types'

export const twilightCouncil: TacticalCard = {
  category: 'tactical',
  id: 'Twilight Council',
  name: { en: 'Twilight Council', ko: '황혼 의회' },
  isUnique: true,
  gasPts: 40,
  resource: 1,
  slot: [
    { unitType: 'Elite', count: 1 },
    { unitType: 'Support', count: 1 },
  ],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Veil of Shadows',
      name: { en: 'Veil of Shadows', ko: '그림자 장막' },
      phase: 'Any',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: 'Use after a Friendly Unit resolves a PLACE effect. That Unit immediately resolves the HEAL (2) effect.',
        ko: '아군 유닛이 배치 효과를 해결한 후 사용합니다. 해당 유닛은 즉시 치유(2) 효과를 수행합니다.',
      },
    },
    {
      kind: 'rule',
      id: 'Weapons of the Firstborn',
      name: { en: 'Weapons of the Firstborn', ko: '첫 번째 자손의 무기' },
      phase: 'Assault',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Ground Unit's first Ranged Weapon used gains BUFF Range (4).",
        ko: '활성화된 지상 유닛이 이번 단계에서 처음 사용하는 원거리 무기는 사거리(4) 강화를 얻습니다.',
      },
    },
  ],
}
