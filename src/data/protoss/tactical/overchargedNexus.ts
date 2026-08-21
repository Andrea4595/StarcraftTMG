import type { TacticalCard } from '../../../types'

export const overchargedNexus: TacticalCard = {
  category: 'tactical',
  id: 'Overcharged Nexus',
  name: { en: 'Overcharged Nexus', ko: '과부화 연결체' },
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
      id: 'Photon Overcharge',
      name: { en: 'Photon Overcharge', ko: '광자 과충전' },
      phase: 'Any',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: "Use when an Enemy Unit enters the battlefield from Reserves via a location other than its own Entry Edge. That Unit immediately suffers HITS 3 (1).",
        ko: '상대의 유닛이 리저브에서 전장에 들어올 때 그 위치가 그 자신의 엔트리엣지가 아니라면 그 유닛은 즉시 힛 3(1)을 받는다.',
      },
    },
    {
      kind: 'rule',
      id: 'Strategic Recall',
      name: { en: 'Strategic Recall', ko: '전략 귀환' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'The active, Unengaged Ground Unit is returned to Reserves instead of performing an action.',
        ko: '활성화중이며 아직 액션을 하지 않은 인게이지상태가 아닌 지상유닛을, 액션을 하는것 대신 리저브로 되돌린다.',
      },
    },
  ],
}
