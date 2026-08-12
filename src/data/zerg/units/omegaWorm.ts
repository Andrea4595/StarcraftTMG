import type { UnitCard } from '../../../types'

export const omegaWorm: UnitCard = {
  category: 'unit',
  name: 'Omega Worm',
  isUnique: false,
  type: 'Other',
  stat: {
    shld: null,
    spd: null,
    eva: '-',
    arm: '5+',
    hp: 10,
    siz: 3,
  },
  tags: [{ name: "Kerrigan's Swarm" }, { name: 'Armoured' }, { name: 'Biological' }, { name: 'Ground' }],
  squad: [{ modelMin: 1, modelMax: 1, supply: 0, pts: 0 }],
  abilities: [
    {
      kind: 'rule',
      name: 'Detection',
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'While Enemy Units are Within 6" of this Unit, they lose HIDDEN Status.',
        ko: '',
      },
    },
    {
      kind: 'rule',
      name: 'Source of Creep',
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'A Friendly or Enemy Ground Zerg Unit Within 6" of this Unit, counts as being ON CREEP.',
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
    {
      kind: 'rule',
      name: 'Omega Network',
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: "The base of the Omega Worm counts as an Entry Edge. Each Round, Friendly Units with a combined Supply cost of 2 or less may be Deployed via this Entry Edge. If a Friendly Leading model finishes a Move, Disengage, or Run action in base-to-base contact with the Omega Worm, the controlling player may remove that Unit from the battlefield and return it to Reserves.",
        ko: '',
      },
    },
  ],
  upgrades: [],
}
