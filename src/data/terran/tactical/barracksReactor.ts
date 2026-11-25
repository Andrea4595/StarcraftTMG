import type { TacticalCard } from '../../../types'

export const barracksReactor: TacticalCard = {
  category: 'tactical',
  id: 'Barracks (Reactor)',
  name: { en: 'Barracks (Reactor)', ko: '반응로 병영' },
  isUnique: true,
  wave: 4,
  gasPts: 35,
  resource: 1,
  slot: [{ unitType: 'Core', count: 3 }],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Go! Go! Go!',
      name: { en: 'Go! Go! Go!', ko: '자,빨리빨리!' },
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
      id: 'Terran Charge',
      name: { en: 'Terran Charge', ko: '테란 돌격' },
      phase: 'Assault',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: 'Immediately after a Friendly Biological Unit completes a successful Charge, resolve the IMPACT (1) 4+ effect.',
        ko: '아군 생체 유닛이 성공적으로 차지를 마친 직후, 임팩트(1)를 4+로 입힌다.',
      },
    },
  ],
}
