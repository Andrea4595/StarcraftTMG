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
        ko: '',
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
        ko: '',
      },
    },
  ],
}
