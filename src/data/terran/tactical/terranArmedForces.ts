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
        ko: '활성화중인 유닛은 이번 라운드 동안 이탈의 페널티를 받지 않는다.',
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
        ko: '게임당 한 번, 즉시 선공권 마커를 얻는다. 이 페이즈의 남은 기간 동안 다른 플레이어는 선공권 마커를 지닐 수 없다.',
      },
    },
  ],
}
