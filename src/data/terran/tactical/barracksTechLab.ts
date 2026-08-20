import type { TacticalCard } from '../../../types'

export const barracksTechLab: TacticalCard = {
  category: 'tactical',
  id: 'Barracks (Tech Lab)',
  name: { en: 'Barracks (Tech Lab)', ko: 'Barracks (Tech Lab)' },
  isUnique: true,
  gasPts: 45,
  resource: 2,
  slot: [
    { unitType: 'Elite', count: 1 },
    { unitType: 'Core', count: 1 },
  ],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Go! Go! Go!',
      name: { en: 'Go! Go! Go!', ko: 'Go! Go! Go!' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'The active Biological Unit performs a 2" Move action. This does not count towards its action limit.',
        ko: '활성화중인 아군 생체 유닛은 2" 이동 액션을 한다. 이 이동은 액션을 제한하는 조건이 되지 않는다.',
      },
    },
    {
      kind: 'rule',
      id: "Let's Have a Blast!",
      name: { en: "Let's Have a Blast!", ko: "Let's Have a Blast!" },
      phase: 'Assault',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Biological Unit's first Ranged Weapon used gain ANTI-EVADE (1).",
        ko: '활성화중인 생체 유닛이 처음으로 사용하는 사격무기는 안티-회피(1)를 갖는다.',
      },
    },
  ],
}
