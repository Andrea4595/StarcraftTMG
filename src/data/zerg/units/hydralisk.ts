import type { UnitCard } from '../../../types'

export const hydralisk: UnitCard = {
  category: 'unit',
  name: 'Hydralisk',
  isUnique: false,
  type: 'Elite',
  stat: {
    shld: null,
    spd: { move: 4, cohesion: 4 },
    eva: '5+',
    arm: '5+',
    hp: 4,
    siz: 2,
  },
  tags: [{ name: 'Biological' }, { name: 'Light' }, { name: 'Ground' }],
  squad: [
    { modelMin: 1, modelMax: 1, supply: 1, pts: 140 },
    { modelMin: 2, modelMax: 2, supply: 2, pts: 140 },
    { modelMin: 3, modelMax: 4, supply: 3, pts: 260 },
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
      kind: 'weapon',
      name: 'Needle Spines',
      phase: 'Assault',
      stat: {
        rng: 12,
        tgt: 'All',
        roa: 3,
        hit: '3+',
        surge: ['Light', 'Armoured'],
        sDie: 'D3+1',
        dmg: 2,
        keyword: [],
      },
    },
    {
      kind: 'rule',
      name: 'Lunge',
      phase: 'Assault',
      type: 'Reaction',
      cost: 1,
      rule: {
        en: 'When another Friendly Unit Within 10" is the target of a Ranged Attack, after the attack is fully resolved, this Unit, if Unengaged, may perform a Move action Directly Towards the attacking Unit.',
        ko: '',
      },
    },
    {
      kind: 'weapon',
      name: 'Scythe',
      phase: 'Combat',
      stat: {
        rng: 'E',
        tgt: 'Ground',
        roa: 2,
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
      pts: [20, 20, 40],
      ability: {
        kind: 'rule',
        name: 'Ancillary Carapace',
        phase: 'Any',
        type: 'Passive',
        cost: 0,
        rule: {
          en: 'This Unit gains TOUGH (1) on the first Armour Roll of each Activation.',
          ko: '',
        },
      },
    },
    {
      pts: [10, 10, 20],
      ability: {
        kind: 'rule',
        name: 'Lurking',
        phase: 'Any',
        type: 'Passive',
        cost: 0,
        rule: {
          en: 'If this Unit has Stationary Status, it is eligible to make an Evade Roll against the first Ranged Attack targeting it this Round. If this Unit is ON CREEP, it gains +1 Modifier to the Evade Roll.',
          ko: '',
        },
      },
    },
    {
      pts: [20, 20, 40],
      ability: {
        kind: 'rule',
        name: 'Burrow Ambush',
        phase: 'Movement',
        type: 'Passive',
        cost: 0,
        rule: {
          en: "When this Unit is nominated to deploy from the Reserves, it may resolve the PLACE (18) effect from the controlling player's Entry Edge. No model may be set Within 10\" of any Enemy model. This Unit's Activation ends.",
          ko: '',
        },
      },
    },
    {
      pts: [20, 20, 40],
      ability: {
        kind: 'rule',
        name: 'Grooved Spines',
        phase: 'Assault',
        type: 'Passive',
        cost: 0,
        rule: {
          en: 'This Unit\'s Needle Spines ranged weapon gains LONG RANGE (16").',
          ko: '',
        },
      },
    },
  ],
}
