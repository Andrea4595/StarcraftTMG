import type { UnitCard } from '../../../types'

export const stalker: UnitCard = {
  category: 'unit',
  name: 'Stalker',
  isUnique: false,
  type: 'Elite',
  stat: {
    shld: 3,
    spd: { move: 4, cohesion: 4 },
    eva: '6+',
    arm: '4+',
    hp: 6,
    siz: 3,
  },
  tags: [{ name: 'Armoured' }, { name: 'Mechanical' }, { name: 'Ground' }],
  squad: [
    { modelMin: 1, modelMax: 1, supply: 1, pts: 170 },
    { modelMin: 2, modelMax: 2, supply: 2, pts: 270 },
  ],
  abilities: [
    {
      kind: 'rule',
      name: 'Squadron',
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: "This Unit's Horizontal Coherency is 4\".",
        ko: '',
      },
    },
    {
      kind: 'rule',
      name: 'Blink',
      phase: 'Movement',
      type: 'Active',
      cost: 1,
      rule: {
        en: 'Resolve the PLACE (6) effect. Models set by this effect cannot be set up Within the Engagement Range of any Enemy Unit.',
        ko: '',
      },
    },
    {
      kind: 'weapon',
      name: 'Particle Disruptors',
      phase: 'Assault',
      stat: {
        rng: 12,
        tgt: 'All',
        roa: 4,
        hit: '3+',
        surge: ['Armoured'],
        sDie: 'D3',
        dmg: 2,
        keyword: [],
      },
    },
    {
      kind: 'weapon',
      name: 'Stomp',
      phase: 'Combat',
      stat: {
        rng: 'E',
        tgt: 'Ground',
        roa: 2,
        hit: '5+',
        surge: [],
        sDie: '-',
        dmg: 1,
        keyword: [],
      },
    },
  ],
  upgrades: [
    {
      pts: [20, 40],
      ability: {
        kind: 'rule',
        name: 'Path of Shadows',
        phase: 'Any',
        type: 'Active',
        cost: 1,
        rule: {
          en: 'This Unit gains HIDDEN Status until it performs another action.',
          ko: '',
        },
      },
    },
    {
      pts: [20, 30],
      ability: {
        kind: 'rule',
        name: 'Fury of the Nerazim',
        phase: 'Assault',
        type: 'Passive',
        cost: 0,
        rule: {
          en: 'When this Unit attacks an Enemy Unit that has already been Activated during this Phase, its Particle Disruptors gain INSTANT for that attack.',
          ko: '',
        },
      },
    },
  ],
}
