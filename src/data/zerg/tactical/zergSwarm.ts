import type { TacticalCard } from '../../../types'

export const zergSwarm: TacticalCard = {
  category: 'tactical',
  name: 'Zerg Swarm',
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
      name: 'Brood Instinct',
      phase: 'Any',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: 'Use before a Friendly Unit makes an Evade Roll. Apply a +1 Modifier to that roll.',
        ko: '아군 유닛이 Evade Roll을 하기 전에 사용한다. 그 굴림에 +1 수정치를 적용한다.',
      },
    },
    {
      kind: 'rule',
      name: 'Zerg Creep',
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'During Army Building, select exactly one Creep Card and add it to their Army List, paying its listed cost (if any).',
        ko: '부대 편성 중에, Creep Card를 정확히 하나 선택해 표기된 비용(있다면)을 지불하고 부대 목록에 추가한다.',
      },
    },
    {
      kind: 'rule',
      name: 'Rapid Burrowing',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Select one Friendly, Unengaged Ground Zerg Unit on the battlefield. That Unit gains the Burrowed Status, even if it has already been Activated this Round.',
        ko: '전장에 있는 아군 Unengaged 지상 Zerg 유닛 하나를 선택한다. 그 유닛은 이번 라운드에 이미 Activated되었더라도 Burrowed Status를 얻는다.',
      },
    },
  ],
}
