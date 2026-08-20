import type { TacticalCard } from '../../../types'

export const spawningPoolSixPool: TacticalCard = {
  category: 'tactical',
  id: 'Spawning Pool (Six Pool)',
  name: { en: 'Spawning Pool (Six Pool)', ko: 'Spawning Pool (Six Pool)' },
  isUnique: true,
  gasPts: 40,
  resource: 2,
  slot: [{ unitType: 'Core', count: 2 }],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Timing Push',
      name: { en: 'Timing Push', ko: 'Timing Push' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Zergling Unit Deploys from any table edge that is not a Player's Entry Edge. This action must end more than 10\" away from any Enemy model.",
        ko: '활성화중인 저글링 유닛을 엔트리 엣지가 아닌 전장 가장자리에 배치한다. 이 배치는 상대 유닛의 10" 밖에서 이루어져야 한다.',
      },
    },
    {
      kind: 'rule',
      id: 'Feral Rage',
      name: { en: 'Feral Rage', ko: 'Feral Rage' },
      phase: 'Combat',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Unit's first Close Combat Weapon used gains PRECISION (2).",
        ko: '활성화된 유닛이 처음으로 사용하는 근접 무기가 프리시전(2)를 얻는다.',
      },
    },
  ],
}
