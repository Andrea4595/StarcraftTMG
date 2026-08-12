import type { UnitCard } from '../../../types'

export const adept: UnitCard = {
  category: 'unit',
  name: 'Adept',
  isUnique: false,
  type: 'Core',
  stat: {
    shld: 2,
    spd: { move: 5, cohesion: 3 },
    eva: '5+',
    arm: '5+',
    hp: 3,
    siz: 2,
  },
  tags: [{ name: 'Biological' }, { name: 'Light' }, { name: 'Ground' }],
  squad: [
    { modelMin: 1, modelMax: 2, supply: 0, pts: 150 },
    { modelMin: 3, modelMax: 4, supply: 1, pts: 150 },
  ],
  abilities: [
    {
      kind: 'rule',
      name: 'Psionic Presence',
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: "All Weapons of Friendly Units targeting an Enemy Unit Within 4\" of this Unit's Shade token gain PRECISION (1).",
        ko: '',
      },
    },
    {
      kind: 'rule',
      name: 'Psionic Transfer',
      phase: 'Movement',
      type: 'Active',
      cost: 1,
      rule: {
        en: "Set a Shade token Wholly Within 12\" of any model in this Unit. At the End of the Round, the controlling player may set all models of this Unit in Coherency, treating the Shade token as the Leading Model. The Shade token has DISPLACEMENT.",
        ko: '',
      },
    },
    {
      kind: 'weapon',
      name: 'Glaive Cannon',
      phase: 'Assault',
      stat: {
        rng: 8,
        tgt: 'All',
        roa: 2,
        hit: '3+',
        surge: ['Light'],
        sDie: 'D3+1',
        dmg: 1,
        keyword: [{ name: 'ANTI-EVADE', suffix: '(1)' }],
      },
    },
    {
      kind: 'weapon',
      name: 'Strike',
      phase: 'Combat',
      stat: {
        rng: 'E',
        tgt: 'Ground',
        roa: 1,
        hit: '4+',
        surge: [],
        sDie: '-',
        dmg: 1,
        keyword: [],
      },
    },
  ],
  upgrades: [
    {
      pts: 20,
      for: 'Glaive Cannon',
      ability: {
        kind: 'rule',
        name: 'Resonating Glaives',
        phase: 'Assault',
        type: 'Active',
        cost: 1,
        rule: {
          en: "This Unit's Glaive Cannon gains BUFF RoA (1).",
          ko: '',
        },
      },
    },
    {
      pts: 10,
      for: 'Glaive Cannon',
      ability: {
        kind: 'rule',
        name: 'Guidance',
        phase: 'Assault',
        type: 'Passive',
        cost: 0,
        rule: {
          en: "This Unit's Glaive Cannon Ranged weapon gains ANTI-EVADE (2).",
          ko: '',
        },
      },
    },
    {
      pts: 20,
      for: 'Strike',
      ability: {
        kind: 'weapon',
        name: 'Glaive Strike',
        phase: 'Combat',
        stat: {
          rng: 'E',
          tgt: 'Ground',
          roa: 1,
          hit: '4+',
          surge: ['Light'],
          sDie: 'D3',
          dmg: 1,
          keyword: [{ name: 'PIERCE', suffix: 'Light (2)' }],
        },
      },
    },
  ],
}
