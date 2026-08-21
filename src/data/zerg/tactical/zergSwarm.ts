import type { TacticalCard } from '../../../types'

export const zergSwarm: TacticalCard = {
  category: 'tactical',
  id: 'Zerg Swarm',
  name: { en: 'Zerg Swarm', ko: '저그 군단' },
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
      id: 'Brood Instinct',
      name: { en: 'Brood Instinct', ko: '무리 본능' },
      phase: 'Any',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: 'Use before a Friendly Unit makes an Evade Roll. Apply a +1 Modifier to that roll.',
        ko: '아군 유닛이 회피 롤을 할 때 그 굴림에 +1',
      },
    },
    {
      kind: 'rule',
      id: 'Zerg Creep',
      name: { en: 'Zerg Creep', ko: '저그 점막' },
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'During Army Building, select exactly one Creep Card and add it to their Army List, paying its listed cost (if any).',
        ko: '아미 구성 시, 점막 카드 중 하나를 선택해 아미에 넣는다. (그 카드가 자원을 소모한다면 그만큼 소모한다)',
      },
    },
    {
      kind: 'rule',
      id: 'Rapid Burrowing',
      name: { en: 'Rapid Burrowing', ko: '신속한 잠복' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Select one Friendly, Unengaged Ground Zerg Unit on the battlefield. That Unit gains the Burrowed Status, even if it has already been Activated this Round.',
        ko: '인게이지 상태가 아닌 아군 지상 저그 유닛을 하나 고른다. 그 유닛은 잠복 상태를 얻는다. 그 유닛이 이번 라운드에서 이미 활성화 되었다더라도 대상이 될 수 있다.',
      },
    },
  ],
}
