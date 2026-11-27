import type { TacticalCard } from '../../../types'

export const gateChronoboosted: TacticalCard = {
  category: 'tactical',
  id: 'Gate Chronoboosted',
  name: { en: 'Gate Chronoboosted', ko: '시간 증폭 관문' },
  isUnique: true,
  gasPts: 35,
  resource: 1,
  slot: [
    { unitType: 'Elite', count: 1 },
    { unitType: 'Core', count: 1 },
  ],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Zealous Charge',
      name: { en: 'Zealous Charge', ko: '열성의 돌진' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'The active Unit gains BUFF Speed (2).',
        ko: '활성화된 유닛은 속도(2) 강화를 얻습니다.',
      },
    },
    {
      kind: 'rule',
      id: 'Quick Strikes',
      name: { en: 'Quick Strikes', ko: '신속한 타격' },
      phase: 'Combat',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Unit's first Close Combat Weapon used gains PRECISION (2).",
        ko: '활성화된 유닛이 이번 단계에서 처음 사용하는 근접전 무기는 정밀(2) 특성을 얻습니다.',
      },
    },
  ],
}
