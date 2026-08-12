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
        ko: '',
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
        ko: '',
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
        ko: '',
      },
    },
  ],
  upgrades: [],
}
