import type { TacticalCard } from '../../../types'

export const barracksProxy: TacticalCard = {
  category: 'tactical',
  id: 'Barracks (Proxy)',
  name: { en: 'Barracks (Proxy)', ko: 'Barracks (Proxy)' },
  isUnique: true,
  gasPts: 40,
  resource: 2,
  slot: [{ unitType: 'Core', count: 2 }],
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
      id: 'Armed and Ready',
      name: { en: 'Armed and Ready', ko: 'Armed and Ready' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Biological Unit Deploys from any table edge that is not a player's Entry Edge. No model may be set up Within 10\" of any Enemy model. This ability cannot be used if another Friendly Biological Unit has already been Deployed this Round.",
        ko: '활성화중인 아군 생체 유닛을 엔트리 엣지가 아닌 전장 가장자리에 배치한다. 이 배치로 적 유닛의 10" 이내에 배치할 순 없다. 이번 라운드에 배치된 다른 아군 생체 유닛이 있다면 이 능력을 사용할 수 없다.',
      },
    },
  ],
}
