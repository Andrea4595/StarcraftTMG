import type { TacticalCard } from '../../../types'

export const evolutionChamber: TacticalCard = {
  category: 'tactical',
  id: 'Evolution Chamber',
  name: { en: 'Evolution Chamber', ko: '진화장' },
  isUnique: false,
  gasPts: 25,
  resource: 1,
  slot: [{ unitType: 'Core', count: 1 }],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Carapace',
      name: { en: 'Carapace', ko: '갑피' },
      phase: 'Any',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: 'Use before a Friendly Unit makes an Armour Roll. That Unit gains TOUGH (1) for this roll.',
        ko: '아군 유닛이 방어 굴림을 수행하기 전에 사용합니다. 해당 굴림 동안 그 유닛은 강인함(1) 특성을 얻습니다.',
      },
    },
    {
      kind: 'rule',
      id: 'Extended Claws',
      name: { en: 'Extended Claws', ko: '펼쳐진 발톱' },
      phase: 'Assault',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'The active Unit gains a +1 Modifier to all IMPACT Hit Rolls.',
        ko: '활성화된 유닛은 모든 충격 명중 굴림에 +1 수정치를 얻습니다.',
      },
    },
  ],
}
