import type { TacticalCard } from '../../../types'

export const overchargedNexus: TacticalCard = {
  category: 'tactical',
  name: 'Overcharged Nexus',
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
      name: 'Photon Overcharge',
      phase: 'Any',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: "Use when an Enemy Unit enters the battlefield from Reserves via a location other than its own Entry Edge. That Unit immediately suffers HITS 3 (1).",
        ko: '적 유닛이 자신의 Entry Edge가 아닌 위치를 통해 Reserves에서 전장에 들어올 때 사용한다. 그 유닛은 즉시 HITS 3 (1)을 받는다.',
      },
    },
    {
      kind: 'rule',
      name: 'Strategic Recall',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'The active, Unengaged Ground Unit is returned to Reserves instead of performing an action.',
        ko: '활성화 중인 Unengaged 지상 유닛은 action을 수행하는 대신 Reserves로 돌아간다.',
      },
    },
  ],
}
