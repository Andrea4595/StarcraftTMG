import type { TacticalCard } from '../../../types'

export const overchargedNexus: TacticalCard = {
  category: 'tactical',
  id: 'Overcharged Nexus',
  name: { en: 'Overcharged Nexus', ko: '과충전 연결체' },
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
        ko: '적 유닛이 자신의 진입 경계가 아닌 다른 위치를 통해 예비 병력에서 전장에 진입할 때 사용합니다. 해당 유닛은 즉시 명중 3(1)을 받습니다.',
      },
    },
    {
      kind: 'rule',
      id: 'Strategic Recall',
      name: { en: 'Strategic Recall', ko: '전략 소환' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'The active, Unengaged Ground Unit is returned to Reserves instead of performing an action.',
        ko: '활성화된 교전 중이 아닌 지상 유닛은 행동을 수행하는 대신 예비 병력으로 복귀합니다.',
      },
    },
  ],
}
