import type { UnitCard } from '../../../types'

export const pylon: UnitCard = {
  category: 'unit',
  id: 'Pylon',
  name: { en: 'Pylon', ko: '수정탑' },
  isUnique: false,
  type: 'Other',
  stat: {
    shld: 2,
    spd: null,
    eva: '-',
    arm: '5+',
    hp: 8,
    siz: 3,
  },
  tags: [{ name: 'Khalai' }, { name: 'Armoured' }, { name: 'Ground' }],
  ranges: [{ inch: 4, alwaysShow: true }],
  baseSize: { shape: 'circle', diameterMm: 80 },
  squad: [{ modelMin: 1, modelMax: 1, supply: 0, pts: 0 }],
  abilities: [
    {
      kind: 'rule',
      id: 'Structure',
      name: { en: 'Structure', ko: '구조물' },
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'This Unit cannot be Activated in any Phase and cannot perform actions. Additionally, its Current Supply Value is treated as 0, and it can never Control or Contest Mission Markers, ignoring the standard Zero Supply Exception. This Unit cannot be a target of an ability, unless stated otherwise.',
        ko: '이 유닛은 어떤 페이즈에도 활성화될 수 없고, 어떤 액션도 할 수 없다. 서플라이 값은 0으로 취급하지만 서플라이 값이 0인 유닛의 점령,경쟁 규칙은 적용되지 않는다. 이 유닛은 점령이나 경쟁 할 수 없고 다른 언급이 있지 않는 한 다른 능력의 대상이 될 수 없다.',
      },
    },
    {
      kind: 'rule',
      id: 'Khalai Ingenuity',
      name: { en: 'Khalai Ingenuity', ko: '칼라이의 재능' },
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: "Once per Round, when a Friendly Unit Within 4\" of this Pylon uses a Special Ability that costs Psionic Energy, that ability's PE cost is reduced by 1.",
        ko: '라운드 당 한번 수정탑의 4”이내의 아군 유닛이 특수능력을 사용할 때 PE의 소모 비용이 1 감소한다.',
      },
    },
    {
      kind: 'rule',
      id: 'Warp Conduit',
      name: { en: 'Warp Conduit', ko: '차원로' },
      phase: 'Movement',
      type: 'Passive',
      cost: 0,
      rule: {
        en: "Once per Round, the controlling player may deploy a Ground Unit from Reserves using this Pylon base as the Entry Edge. This Unit's Activation ends.",
        ko: '라운드 당 한번 플레이어는 리저브중인 지상유닛을 수정탑의 베이스를 엔트리 엣지인것처럼 취급해 배치할 수 있다. 그랬을경우 그 유닛의 활성화는 종료된다.',
      },
    },
  ],
  upgrades: [],
}
