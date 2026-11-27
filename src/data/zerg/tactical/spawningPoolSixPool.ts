import type { TacticalCard } from '../../../types'

export const spawningPoolSixPool: TacticalCard = {
  category: 'tactical',
  id: 'Spawning Pool (Six Pool)',
  name: { en: 'Spawning Pool (Six Pool)', ko: '산란못 (6못)' },
  isUnique: true,
  gasPts: 35,
  resource: 2,
  slot: [{ unitType: 'Core', count: 2 }],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Timing Push',
      name: { en: 'Timing Push', ko: '타이밍 압박' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Zergling Unit Deploys from any table edge that is not a Player's Entry Edge. This action must end more than 10\" away from any Enemy model.",
        ko: '활성화된 저글링 유닛은 플레이어의 진입 경계가 아닌 아무 테이블 가장자리에서 전개합니다. 이 행동은 반드시 모든 적 모형으로부터 10인치 초과 떨어진 위치에서 종료되어야 합니다.',
      },
    },
    {
      kind: 'rule',
      id: 'Feral Rage',
      name: { en: 'Feral Rage', ko: '야생의 분노' },
      phase: 'Combat',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Unit's first Close Combat Weapon used gains PRECISION (2).",
        ko: '활성화된 유닛이 이번 단계에서 처음 사용하는 근접전 무기는 정밀(2) 특성을 얻습니다.',
      },
    },
  ],
}
