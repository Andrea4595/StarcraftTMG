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
        ko: '',
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
        ko: '',
      },
    },
  ],
}
