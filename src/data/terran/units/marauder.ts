import type { UnitCard } from '../../../types'

export const marauder: UnitCard = {
  category: 'unit',
  name: 'Marauder',
  isUnique: false,
  type: 'Core',
  stat: {
    shld: null,
    spd: { move: 4, cohesion: 3 },
    eva: '6+',
    arm: '4+',
    hp: 5,
    siz: 2,
  },
  tags: [{ name: 'Armoured' }, { name: 'Biological' }, { name: 'Ground' }],
  squad: [
    { modelMin: 1, modelMax: 1, supply: 0, pts: 150 },
    { modelMin: 2, modelMax: 2, supply: 1, pts: 150 },
    { modelMin: 3, modelMax: 4, supply: 2, pts: 280 },
  ],
  abilities: [
    {
      kind: 'rule',
      name: 'Stimpack',
      phase: 'Movement',
      type: 'Active',
      cost: 1,
      rule: {
        en: 'This Unit suffers NON-LETHAL DAMAGE (2). This Unit gains BUFF Speed (3). Additionally, its Quad K12 and all Close Combat Weapons gain PRECISION (2).',
        ko: '',
      },
    },
    {
      kind: 'weapon',
      name: 'Quad K12',
      phase: 'Assault',
      stat: {
        rng: 12,
        tgt: 'Ground',
        roa: 3,
        hit: '3+',
        surge: ['Armoured'],
        sDie: 'D3',
        dmg: 1,
        keyword: [{ name: 'PIERCE', suffix: 'Armoured (2)' }],
      },
    },
    {
      kind: 'rule',
      name: 'Concussive Shells',
      phase: 'Assault',
      type: 'Reaction',
      cost: 1,
      rule: {
        en: 'When an Enemy declares a Charge against a Friendly Unit Within 8", that Enemy gains DEBUFF Speed (2).',
        ko: '',
      },
    },
    {
      kind: 'weapon',
      name: 'Strike',
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
      pts: [20, 20, 30],
      ability: {
        kind: 'rule',
        name: 'Veteran of Tarsonis',
        phase: 'Any',
        type: 'Passive',
        cost: 0,
        rule: {
          en: 'While this Unit is Within 3" of a Mission Marker, its Armour characteristic is increased by 1.',
          ko: '',
        },
      },
    },
    {
      pts: [20, 20, 40],
      ability: {
        kind: 'rule',
        name: 'Kinetic Foam',
        phase: 'Any',
        type: 'Passive',
        cost: 0,
        rule: {
          en: "Increase this Unit's Hit Points characteristic by 1.",
          ko: '',
        },
      },
    },
    {
      pts: [20, 20, 40],
      ability: {
        kind: 'rule',
        name: 'Laser Targeting Systems',
        phase: 'Assault',
        type: 'Passive',
        cost: 0,
        rule: {
          en: "This Unit's Quad K12 weapon gains LONG RANGE (16\").",
          ko: '',
        },
      },
    },
  ],
}
