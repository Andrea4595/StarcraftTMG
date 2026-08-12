import type { UnitCard } from '../../../types'

export const corpserRoach: UnitCard = {
  category: 'unit',
  name: 'Corpser (Roach)',
  isUnique: false,
  type: 'Core',
  stat: {
    shld: null,
    spd: { move: 4, cohesion: 3 },
    eva: '5+',
    arm: '3+',
    hp: 4,
    siz: 2,
  },
  tags: [{ name: 'Armoured' }, { name: 'Biological' }, { name: 'Ground' }],
  squad: [
    { modelMin: 1, modelMax: 1, supply: 0, pts: 240 },
    { modelMin: 2, modelMax: 3, supply: 1, pts: 240 },
  ],
  abilities: [
    {
      kind: 'rule',
      name: 'Burrow',
      phase: 'Any',
      type: 'Active',
      cost: 2,
      rule: {
        en: 'If this Unit is Unengaged, it gains or loses the Burrowed Status.',
        ko: '',
      },
    },
    {
      kind: 'rule',
      name: 'Roachling Infestation',
      phase: 'Movement',
      type: 'Active',
      cost: 2,
      rule: {
        en: 'Once per Game. Resolve the SUMMON (Roachling) effect.',
        ko: '',
      },
    },
    {
      kind: 'weapon',
      name: 'Acid Saliva',
      phase: 'Assault',
      stat: {
        rng: 8,
        tgt: 'Ground',
        roa: 2,
        hit: '3+',
        surge: [],
        sDie: '-',
        dmg: 1,
        keyword: [],
      },
    },
    {
      kind: 'rule',
      name: 'Regeneration',
      phase: 'Assault',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'When this Unit becomes Activated, if it has the Burrowed Status, resolve the HEAL (2) effect.',
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
      name: 'Claws',
      phase: 'Combat',
      stat: {
        rng: 'E',
        tgt: 'Ground',
        roa: 3,
        hit: '4+',
        surge: ['Light'],
        sDie: 'D3+1',
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
        name: 'Tunneling Claws',
        phase: 'Any',
        type: 'Passive',
        cost: 0,
        rule: {
          en: "While this Unit has the Burrowed Status, it may perform the Move and Run actions without losing that Status. It may also move through other Units' bases.",
          ko: '',
        },
      },
    },
    {
      pts: 20,
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
      pts: 20,
      ability: {
        kind: 'rule',
        name: 'Glial Reconstitution',
        phase: 'Movement',
        type: 'Active',
        cost: 1,
        rule: {
          en: 'This Unit gains BUFF SPEED (1), or BUFF SPEED (2) if the Unit is ON CREEP.',
          ko: '',
        },
      },
    },
    {
      pts: 10,
      ability: {
        kind: 'rule',
        name: 'Hydriodic Bile',
        phase: 'Assault',
        type: 'Passive',
        cost: 0,
        rule: {
          en: "This Unit's Acid Saliva weapon gains Surge Type: Light, and S Dice: D3+1.",
          ko: '',
        },
      },
    },
  ],
}
