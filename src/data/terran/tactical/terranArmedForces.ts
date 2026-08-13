import type { TacticalCard } from '../../../types'

export const terranArmedForces: TacticalCard = {
  category: 'tactical',
  name: 'Terran Armed Forces',
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
      name: 'Tactical Retreat',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'The active Unit ignores the Disengage penalty for the remainder of the Round.',
        ko: '활성화 중인 유닛은 이번 라운드의 남은 동안 Disengage 페널티를 무시한다.',
      },
    },
    {
      kind: 'rule',
      name: 'Terran Tenacity',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Once per Game. Immediately claim the First Player Marker. No other player may claim the First Player Marker for the remainder of this Phase.',
        ko: '게임당 1회. 즉시 First Player Marker를 가져온다. 이번 Phase의 남은 동안 다른 플레이어는 First Player Marker를 가져올 수 없다.',
      },
    },
  ],
}
