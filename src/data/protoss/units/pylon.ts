import type { UnitCard } from '../../../types'

export const pylon: UnitCard = {
  category: 'unit',
  name: 'Pylon',
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
  squad: [{ modelMin: 1, modelMax: 1, supply: 0, pts: 0 }],
  abilities: [
    {
      kind: 'rule',
      name: 'Structure',
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'This Unit cannot be Activated in any Phase and cannot perform actions. Additionally, its Current Supply Value is treated as 0, and it can never Control or Contest Mission Markers, ignoring the standard Zero Supply Exception. This Unit cannot be a target of an ability, unless stated otherwise.',
        ko: '이 유닛은 어떤 Phase에도 Activated될 수 없으며 action을 수행할 수 없다. 또한 이 유닛의 Current Supply Value는 0으로 취급하며, 표준 Zero Supply Exception을 무시하고 Mission Markers를 절대 점령하거나 쟁탈할 수 없다. 별도로 명시되지 않는 한, 이 유닛은 능력의 대상이 될 수 없다.',
      },
    },
    {
      kind: 'rule',
      name: 'Khalai Ingenuity',
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: "Once per Round, when a Friendly Unit Within 4\" of this Pylon uses a Special Ability that costs Psionic Energy, that ability's PE cost is reduced by 1.",
        ko: '라운드당 1회, 이 Pylon에서 4" 이내의 아군 유닛이 Psionic Energy를 소모하는 Special Ability를 사용할 때, 그 능력의 PE 비용이 1 감소한다.',
      },
    },
    {
      kind: 'rule',
      name: 'Warp Conduit',
      phase: 'Movement',
      type: 'Passive',
      cost: 0,
      rule: {
        en: "Once per Round, the controlling player may deploy a Ground Unit from Reserves using this Pylon base as the Entry Edge. This Unit's Activation ends.",
        ko: '라운드당 1회, 소유 플레이어는 이 Pylon의 베이스를 Entry Edge로 사용하여 Reserves에서 지상 유닛을 배치할 수 있다. 이 유닛의 Activation이 종료된다.',
      },
    },
  ],
  upgrades: [],
}
