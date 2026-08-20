import type { TacticalCard } from '../../../types'

export const raynorsRaiders: TacticalCard = {
  category: 'tactical',
  id: "Raynor's Raiders",
  name: { en: "Raynor's Raiders", ko: "Raynor's Raiders" },
  isUnique: true,
  resource: 1,
  slot: [
    { unitType: 'Hero', count: 1 },
    { unitType: 'Core', count: 3 },
    { unitType: 'Support', count: 1 },
  ],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Rapid Ingress',
      name: { en: 'Rapid Ingress', ko: 'Rapid Ingress' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Set a Friendly Point Defence Drone Unit anywhere on the battlefield, more than 1" away from any Enemy model. Remove this Unit at the End of the Round.',
        ko: '전장에 다른 적 유닛으로부터 1" 이상 떨어지게 국지 방어기 유닛을 배치한다. 이 유닛은 라운드 종료 시에 제거된다.',
      },
    },
    {
      kind: 'rule',
      id: 'Ready for Pickup?',
      name: { en: 'Ready for Pickup?', ko: 'Ready for Pickup?' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Once per Game. The active Unit resolves the PLACE (12) effect. Models set by this effect cannot be set up Within the Engagement Range of any Enemy Unit. This resolves instead of performing a standard action.',
        ko: '게임당 한 번, 활성화된 유닛이 일반적인 액션을 하는 대신 위치(12)한다. 이 능력을 사용해서 적 유닛과 인게이지 상태로 배치될 수는 없다.',
      },
    },
  ],
}
