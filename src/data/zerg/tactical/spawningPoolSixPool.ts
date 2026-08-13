import type { TacticalCard } from '../../../types'

export const spawningPoolSixPool: TacticalCard = {
  category: 'tactical',
  name: 'Spawning Pool (Six Pool)',
  isUnique: true,
  gasPts: 40,
  resource: 2,
  slot: [{ unitType: 'Core', count: 2 }],
  cardAbilities: [
    {
      kind: 'rule',
      name: 'Timing Push',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Zergling Unit Deploys from any table edge that is not a Player's Entry Edge. This action must end more than 10\" away from any Enemy model.",
        ko: '활성화 중인 Zergling 유닛은 플레이어의 Entry Edge가 아닌 임의의 테이블 가장자리에서 Deploy한다. 이 action은 모든 적 모델로부터 10"보다 멀리 떨어진 곳에서 끝나야 한다.',
      },
    },
    {
      kind: 'rule',
      name: 'Feral Rage',
      phase: 'Combat',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Unit's first Close Combat Weapon used gains PRECISION (2).",
        ko: '활성화 중인 유닛이 처음 사용하는 근접 무기는 PRECISION (2)를 얻는다.',
      },
    },
  ],
}
