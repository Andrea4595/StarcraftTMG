import type { TacticalCard } from '../../../types'

export const evolutionChamber: TacticalCard = {
  category: 'tactical',
  id: 'Evolution Chamber',
  name: { en: 'Evolution Chamber', ko: 'Evolution Chamber' },
  isUnique: false,
  gasPts: 30,
  resource: 1,
  slot: [{ unitType: 'Core', count: 1 }],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Carapace',
      name: { en: 'Carapace', ko: 'Carapace' },
      phase: 'Any',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: 'Use before a Friendly Unit makes an Armour Roll. That Unit gains TOUGH (1) for this roll.',
        ko: '아군 유닛이 아머 롤을 할 때 사용 가능하다. 그 유닛에게 터프(1)를 준다.',
      },
    },
    {
      kind: 'rule',
      id: 'Extended Claws',
      name: { en: 'Extended Claws', ko: 'Extended Claws' },
      phase: 'Assault',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'The active Unit gains a +1 Modifier to all IMPACT Hit Rolls.',
        ko: '활성화된 아군 유닛이 임팩트 힛 롤을 할 때 +1',
      },
    },
  ],
}
