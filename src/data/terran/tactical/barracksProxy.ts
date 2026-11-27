import type { TacticalCard } from '../../../types'

export const barracksProxy: TacticalCard = {
  category: 'tactical',
  id: 'Barracks (Proxy)',
  name: { en: 'Barracks (Proxy)', ko: '병영 (전진)' },
  isUnique: true,
  gasPts: 40,
  resource: 2,
  slot: [{ unitType: 'Core', count: 2 }],
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
      id: 'Armed and Ready',
      name: { en: 'Armed and Ready', ko: '출동 준비 완료' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Biological Unit Deploys from any table edge that is not a player's Entry Edge. No model may be set up Within 10\" of any Enemy model. This ability cannot be used if another Friendly Biological Unit has already been Deployed this Round.",
        ko: '활성화된 생체 유닛은 플레이어의 진입 경계가 아닌 아무 테이블 가장자리에서 전개합니다. 어떠한 모형도 적 모형의 10인치 이내에 놓을 수 없습니다. 이번 라운드에 다른 아군 생체 유닛이 이미 전개되었다면 이 능력은 사용할 수 없습니다.',
      },
    },
  ],
}
