import type { TacticalCard } from '../../../types'

export const terranArmedForces: TacticalCard = {
  category: 'tactical',
  id: 'Terran Armed Forces',
  name: { en: 'Terran Armed Forces', ko: '테란 정규군' },
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
      id: 'Tactical Retreat',
      name: { en: 'Tactical Retreat', ko: '전술적 후퇴' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'The active Unit ignores the Disengage penalty for the remainder of the Round.',
        ko: '활성화된 유닛은 라운드 종료 시까지 이탈 페널티를 무시합니다.',
      },
    },
    {
      kind: 'rule',
      id: 'Terran Tenacity',
      name: { en: 'Terran Tenacity', ko: '테란의 끈기' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Once per Game. Immediately claim the First Player Marker. No other player may claim the First Player Marker for the remainder of this Phase.',
        ko: '게임당 1회. 즉시 선공 마커를 가져옵니다. 이 단계가 끝날 때까지 다른 플레이어는 선공 마커를 가져올 수 없습니다.',
      },
    },
  ],
}
