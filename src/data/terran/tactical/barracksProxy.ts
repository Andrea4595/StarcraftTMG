import type { TacticalCard } from '../../../types'

export const barracksProxy: TacticalCard = {
  category: 'tactical',
  name: 'Barracks (Proxy)',
  isUnique: true,
  gasPts: 40,
  resource: 2,
  slot: [{ unitType: 'Core', count: 2 }],
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
      name: 'Armed and Ready',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Biological Unit Deploys from any table edge that is not a player's Entry Edge. No model may be set up Within 10\" of any Enemy model. This ability cannot be used if another Friendly Biological Unit has already been Deployed this Round.",
        ko: '활성화 중인 Biological 유닛이 플레이어의 Entry Edge가 아닌 아무 테이블 가장자리에서 Deploy한다. 어떤 모델도 적 모델로부터 10" 이내에 놓을 수 없다. 이번 라운드에 다른 아군 Biological 유닛이 이미 Deploy되었다면 이 능력을 사용할 수 없다.',
      },
    },
  ],
}
