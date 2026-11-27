import type { TacticalCard } from '../../../types'

export const warpGate: TacticalCard = {
  category: 'tactical',
  id: 'Warp Gate',
  name: { en: 'Warp Gate', ko: '차원 관문' },
  isUnique: true,
  gasPts: 40,
  resource: 1,
  slot: [{ unitType: 'Core', count: 2 }],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Warp In',
      name: { en: 'Warp In', ko: '소환' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Ground Unit Deploys from any table edge that is not a player's Entry Edge. This deployment must end more than 10\" away from any Enemy model. The controlling player cannot use this ability if another Friendly Ground Unit has already Deployed this Round.",
        ko: '활성화된 지상 유닛은 플레이어의 진입 경계가 아닌 아무 테이블 가장자리에서 전개합니다. 이 전개는 모든 적 모형으로부터 10인치 초과해서 떨어진 위치에서 종료되어야 합니다. 조종 플레이어는 이번 라운드에 다른 아군 지상 유닛이 이미 전개되었다면 이 능력을 사용할 수 없습니다.',
      },
    },
    {
      kind: 'rule',
      id: 'Quick Strikes',
      name: { en: 'Quick Strikes', ko: '신속한 타격' },
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
