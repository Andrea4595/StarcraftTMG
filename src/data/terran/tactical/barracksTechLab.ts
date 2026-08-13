import type { TacticalCard } from '../../../types'

export const barracksTechLab: TacticalCard = {
  category: 'tactical',
  name: 'Barracks (Tech Lab)',
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
      name: 'Go! Go! Go!',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'The active Biological Unit performs a 2" Move action. This does not count towards its action limit.',
        ko: '활성화 중인 Biological 유닛이 2" Move action을 수행한다. 이는 해당 유닛의 행동 제한에 포함되지 않는다.',
      },
    },
    {
      kind: 'rule',
      name: "Let's Have a Blast!",
      phase: 'Assault',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Biological Unit's first Ranged Weapon used gain ANTI-EVADE (1).",
        ko: '활성화 중인 Biological 유닛이 처음 사용하는 원거리 무기가 ANTI-EVADE (1)을 얻는다.',
      },
    },
  ],
}
