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
        ko: '이 유닛은 어떤 단계에서도 활성화될 수 없으며 행동을 수행할 수 없습니다. 또한 현재 인구수는 0으로 간주되며, 일반적인 "보급 0 규칙"을 무시하고 임무 마커를 점령하거나 이를 두고 경합할 수 없습니다. 별도 언급이 없는 한, 이 유닛은 능력의 대상이 될 수 없습니다.',
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
        ko: '라운드당 1회, 이 수정탑의 4인치 이내의 아군 유닛이 사이오닉 에너지를 비용으로 하는 특수 능력을 사용할 때, 해당 능력의 PE 비용이 1 감소합니다.',
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
        ko: '라운드당 1회, 조종 플레이어는 이 수정탑의 베이스를 진입 경계로 사용하여 예비 병력의 지상 유닛 1개를 전개할 수 있습니다. 이 유닛의 활성화는 종료됩니다.',
      },
    },
  ],
  upgrades: [],
}
