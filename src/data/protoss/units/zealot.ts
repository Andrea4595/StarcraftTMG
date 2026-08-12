import type { UnitCard } from '../../../types'

export const zealot: UnitCard = {
  category: 'unit',
  name: 'Zealot',
  isUnique: false,
  type: 'Core',
  stat: {
    shld: 3,
    spd: { move: 4, cohesion: 3 },
    eva: '5+',
    arm: '5+',
    hp: 4,
    siz: 2,
  },
  tags: [{ name: 'Biological' }, { name: 'Light' }, { name: 'Ground' }],
  squad: [
    { modelMin: 1, modelMax: 1, supply: 1, pts: 160 },
    { modelMin: 2, modelMax: 3, supply: 2, pts: 160 },
  ],
  abilities: [
    {
      kind: 'rule',
      name: 'Charge',
      phase: 'Assault',
      type: 'Active',
      cost: 1,
      rule: {
        en: "When determining Charge Distance for this Unit, roll 2D6 instead of D6 and use the higher result to add to the Unit's Speed characteristic.",
        ko: '',
      },
    },
    {
      kind: 'rule',
      name: 'Devastating Charge',
      phase: 'Assault',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'Immediately after this Unit completes a successful Charge, resolve the IMPACT (3) 4+ effect.',
        ko: '',
      },
    },
    {
      kind: 'weapon',
      name: 'Psi Blades',
      phase: 'Combat',
      stat: {
        rng: 'E',
        tgt: 'Ground',
        roa: 4,
        hit: '3+',
        surge: ['Light'],
        sDie: 'D3',
        dmg: 1,
        keyword: [],
      },
    },
  ],
  upgrades: [
    {
      pts: 10,
      ability: {
        kind: 'rule',
        name: 'My Life for Aiur',
        phase: 'Any',
        type: 'Passive',
        cost: 0,
        rule: {
          en: 'When this Unit resolves IMPACT, each eligible model generates 1 additional IMPACT die.',
          ko: '',
        },
      },
    },
    {
      pts: 20,
      ability: {
        kind: 'rule',
        name: 'Leg Enhancements',
        phase: 'Movement',
        type: 'Active',
        cost: 1,
        rule: {
          en: 'This Unit performs a 2" Move action. This does not count towards its action limit.',
          ko: '',
        },
      },
    },
    {
      pts: 10,
      ability: {
        kind: 'rule',
        name: 'Zealous Round',
        phase: 'Assault',
        type: 'Reaction',
        cost: 0,
        rule: {
          en: 'When this Unit is not Activated and receives Damage, the controlling player may count this Unit as Activated in this Phase (flip its Activation Marker) to reduce the Total Damage by 2.',
          ko: '',
        },
      },
    },
    {
      pts: 20,
      ability: {
        kind: 'rule',
        name: 'We Stand as One',
        phase: 'Combat',
        type: 'Passive',
        cost: 0,
        rule: {
          en: "When this Unit makes a Close Combat Attack, if the target is Engaged with at least 1 other Friendly Unit, this Unit's Close Combat Weapon gains PRECISION (2).",
          ko: '',
        },
      },
    },
  ],
}
