import type { TacticalCard } from '../../../types'

export const zergSwarm: TacticalCard = {
  category: 'tactical',
  id: 'Zerg Swarm',
  name: { en: 'Zerg Swarm', ko: '저그 군단' },
  isUnique: true,
  requiredCardGroup: 'Creep',
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
        ko: '아군 유닛이 회피 굴림을 수행하기 전에 사용합니다. 해당 굴림에 +1 수정치를 적용합니다.',
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
        ko: '병력 편성 중, 점막 카드 1장을 반드시 선택하여 병력 목록에 추가해야 하며, 명시된 비용이 있다면 해당 비용을 지불해야 합니다.',
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
        ko: '전장에 있는 교전 중이 아닌 아군 저그 지상 유닛 1개를 선택합니다. 해당 유닛은 이번 라운드에 이미 활성화되었더라도 잠복 상태를 얻습니다.',
      },
    },
  ],
}
