import type { TacticalCard } from '../../../types'

export const barracksTechLab: TacticalCard = {
  category: 'tactical',
  id: 'Barracks (Tech Lab)',
  name: { en: 'Barracks (Tech Lab)', ko: '병영 (기술실)' },
  isUnique: true,
  gasPts: 40,
  resource: 2,
  slot: [
    { unitType: 'Elite', count: 1 },
    { unitType: 'Core', count: 1 },
  ],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Go! Go! Go!',
      name: { en: 'Go! Go! Go!', ko: '자, 빨리빨리!' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'The active Biological Unit performs a 2" Move action. This does not count towards its action limit.',
        ko: '활성화된 생체 유닛은 2인치 이동 행동을 수행합니다. 이 행동은 행동 제한에 포함되지 않습니다.',
      },
    },
    {
      kind: 'rule',
      id: "Let's Have a Blast!",
      name: { en: "Let's Have a Blast!", ko: '오늘 딱 걸렸어!' },
      phase: 'Assault',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Biological Unit's first Ranged Weapon used gain ANTI-EVADE (1).",
        ko: '활성화된 생체 유닛이 이번 단계에서 처음 사용하는 원거리 무기는 회피 억제(1) 특성을 얻습니다.',
      },
    },
  ],
}
