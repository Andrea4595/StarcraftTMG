import type { TacticalCard } from '../../../types'

export const warpGate: TacticalCard = {
  category: 'tactical',
  name: 'Warp Gate',
  isUnique: true,
  gasPts: 40,
  resource: 1,
  slot: [{ unitType: 'Core', count: 2 }],
  cardAbilities: [
    {
      kind: 'rule',
      name: 'Warp In',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Ground Unit Deploys from any table edge that is not a player's Entry Edge. This deployment must end more than 10\" away from any Enemy model. The controlling player cannot use this ability if another Friendly Ground Unit has already Deployed this Round.",
        ko: '활성화 중인 지상 유닛은 어느 플레이어의 Entry Edge도 아닌 테이블 가장자리에서 Deploy한다. 이 배치는 적 모델로부터 10" 넘게 떨어진 곳에서 끝나야 한다. 이번 라운드에 다른 아군 지상 유닛이 이미 Deploy했다면, 소유 플레이어는 이 능력을 사용할 수 없다.',
      },
    },
    {
      kind: 'rule',
      name: 'Quick Strikes',
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
