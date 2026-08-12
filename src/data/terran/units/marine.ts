import type { UnitCard } from '../../../types'

export const marine: UnitCard = {
  category: 'unit',
  name: 'Marine',
  isUnique: false,
  type: 'Core',
  stat: {
    shld: null,
    spd: { move: 4, cohesion: 3 },
    eva: '5+',
    arm: '5+',
    hp: 2,
    siz: 2,
  },
  tags: [{ name: 'Biological' }, { name: 'Light' }, { name: 'Ground' }],
  squad: [
    { modelMin: 1, modelMax: 3, supply: 0, pts: 160 },
    { modelMin: 4, modelMax: 6, supply: 1, pts: 160 },
    { modelMin: 7, modelMax: 9, supply: 2, pts: 210 },
  ],
  abilities: [
    {
      kind: 'rule',
      name: 'Stimpack',
      phase: 'Movement',
      type: 'Active',
      cost: 1,
      rule: {
        en: 'This Unit suffers NON-LETHAL DAMAGE (2). This Unit gains BUFF Speed (3). Additionally, its C-14 Rifle and all Close Combat Weapons gain PRECISION (3).',
        ko: '',
      },
    },
    {
      kind: 'weapon',
      name: 'C-14 rifle',
      phase: 'Assault',
      stat: {
        rng: 12,
        tgt: 'All',
        roa: 2,
        hit: '3+',
        surge: ['Light'],
        sDie: 'D3',
        dmg: 1,
        keyword: [],
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
      pts: [20, 20, 30],
      ability: {
        kind: 'rule',
        name: 'Combat Shield',
        phase: 'Movement',
        type: 'Active',
        cost: 1,
        rule: {
          en: 'This Unit is always eligible to make an Evade Roll against any Close Combat Attack targeting it and any Damage from an Enemy Special Ability.',
          ko: '',
        },
      },
    },
    {
      pts: 10,
      for: 'C-14 Rifle',
      ability: {
        kind: 'weapon',
        name: 'AGG-12',
        phase: 'Assault',
        stat: {
          rng: 12,
          tgt: 'Ground',
          roa: 2,
          hit: '3+',
          surge: ['Armoured'],
          sDie: 'D3',
          dmg: 1,
          keyword: [
            { name: 'LONG RANGE', suffix: '(18")' },
            { name: 'SPECIALIST' },
          ],
        },
      },
    },
    {
      pts: 40,
      ability: {
        kind: 'weapon',
        name: 'Rocket Launcher',
        phase: 'Assault',
        stat: {
          rng: 12,
          tgt: 'Ground',
          roa: 4,
          hit: '3+',
          surge: [],
          sDie: '-',
          dmg: 1,
          keyword: [
            { name: 'INDIRECT FIRE' },
            { name: 'LONG RANGE', suffix: '(18")' },
            { name: 'SIDEARM' },
            { name: 'SPECIALIST' },
          ],
        },
      },
    },
    {
      pts: [10, 10, 20],
      ability: {
        kind: 'rule',
        name: 'Slugthrower',
        phase: 'Assault',
        type: 'Passive',
        cost: 0,
        rule: {
          en: 'When this Unit makes a Ranged Attack with a C-14 Rifle and the target is Within 8", that weapon gains ANTI-EVADE (1).',
          ko: '',
        },
      },
    },
    {
      pts: 10,
      ability: {
        kind: 'rule',
        name: 'Grenades - Frag',
        phase: 'Assault',
        type: 'Passive',
        cost: 0,
        rule: {
          en: "When this Unit makes a Ranged Attack with a C-14 Rifle and the target is Within 8\", that weapon's S Dice is replaced by D6.",
          ko: '',
        },
      },
    },
    {
      pts: [20, 20, 30],
      for: 'Strike',
      ability: {
        kind: 'weapon',
        name: 'Bayonet',
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
    },
  ],
}
