import type { UnitCard } from '../../../types'

export const pointDefenseDrone: UnitCard = {
  category: 'unit',
  name: 'Point Defense Drone',
  isUnique: false,
  type: 'Other',
  stat: {
    shld: null,
    spd: null,
    eva: '6+',
    arm: '6+',
    hp: 3,
    siz: null,
  },
  tags: [{ name: "Raynor's Raiders" }, { name: 'Armoured' }, { name: 'Flying' }, { name: 'Mechanical' }],
  squad: [{ modelMin: 1, modelMax: 1, supply: 0, pts: 0 }],
  abilities: [
    {
      kind: 'rule',
      name: 'Point Defense Laser',
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'When another Friendly Unit Within 4" is targeted by a Ranged Attack without the INSTANT keyword, remove up to 2 dice from the Attack Pool. Then remove this Unit from the battlefield.',
        ko: '',
      },
    },
    {
      kind: 'rule',
      name: 'Gliding',
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'This model has DISPLACEMENT.',
        ko: '',
      },
    },
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
  ],
  upgrades: [],
}
