import type { TacticalCard } from '../../../types'

export const barracksReactor: TacticalCard = {
  category: 'tactical',
  id: 'Barracks (Reactor)',
  name: { en: 'Barracks (Reactor)', ko: '병영 (반응로)' },
  isUnique: true,
  wave: 4,
  gasPts: 35,
  resource: 1,
  slot: [{ unitType: 'Core', count: 3 }],
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
      id: 'Terran Charge',
      name: { en: 'Terran Charge', ko: '테란의 돌격' },
      phase: 'Assault',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: 'Immediately after a Friendly Biological Unit completes a successful Charge, resolve the IMPACT (1) 4+ effect.',
        ko: '아군 생체 유닛이 돌격에 성공한 직후, 충격(1) 4+ 효과를 수행합니다.',
      },
    },
  ],
}
