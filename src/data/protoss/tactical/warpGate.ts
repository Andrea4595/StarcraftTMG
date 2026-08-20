import type { TacticalCard } from '../../../types'

export const warpGate: TacticalCard = {
  category: 'tactical',
  id: 'Warp Gate',
  name: { en: 'Warp Gate', ko: 'Warp Gate' },
  isUnique: true,
  gasPts: 40,
  resource: 1,
  slot: [{ unitType: 'Core', count: 2 }],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Warp In',
      name: { en: 'Warp In', ko: 'Warp In' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Ground Unit Deploys from any table edge that is not a player's Entry Edge. This deployment must end more than 10\" away from any Enemy model. The controlling player cannot use this ability if another Friendly Ground Unit has already Deployed this Round.",
        ko: '활성화중인 지상 유닛을 엔트리 엣지가 아닌 전장 가장자리에 배치한다. 이 배치로 적 유닛의 10”이내에 배치할 순 없다. 이번 라운드에 배치된 다른 아군 지상유닛이 있다면 이 능력을 사용할 수 없다.',
      },
    },
    {
      kind: 'rule',
      id: 'Quick Strikes',
      name: { en: 'Quick Strikes', ko: 'Quick Strikes' },
      phase: 'Combat',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Unit's first Close Combat Weapon used gains PRECISION (2).",
        ko: '활성화된 유닛이 처음으로 하는 근접공격에서 무기에 프리시전(2)를 갖는다.',
      },
    },
  ],
}
