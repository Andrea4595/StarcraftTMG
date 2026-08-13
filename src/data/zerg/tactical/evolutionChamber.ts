import type { TacticalCard } from '../../../types'

export const evolutionChamber: TacticalCard = {
  category: 'tactical',
  name: 'Evolution Chamber',
  isUnique: false,
  gasPts: 30,
  resource: 1,
  slot: [{ unitType: 'Core', count: 1 }],
  cardAbilities: [
    {
      kind: 'rule',
      name: 'Carapace',
      phase: 'Any',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: 'Use before a Friendly Unit makes an Armour Roll. That Unit gains TOUGH (1) for this roll.',
        ko: '아군 유닛이 Armour Roll을 하기 전에 사용한다. 그 유닛은 이 굴림에 대해 TOUGH (1)을 얻는다.',
      },
    },
    {
      kind: 'rule',
      name: 'Extended Claws',
      phase: 'Assault',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'The active Unit gains a +1 Modifier to all IMPACT Hit Rolls.',
        ko: '활성화 중인 유닛은 모든 IMPACT Hit Roll에 +1 수정치를 얻는다.',
      },
    },
  ],
}
