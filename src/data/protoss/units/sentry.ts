import type { UnitCard } from '../../../types'

export const sentry: UnitCard = {
  category: 'unit',
  name: 'Sentry',
  isUnique: false,
  type: 'Support',
  stat: {
    shld: 2,
    spd: { move: 4, cohesion: 3 },
    eva: '6+',
    arm: '5+',
    hp: 4,
    siz: 1,
  },
  tags: [{ name: 'Light' }, { name: 'Mechanical' }, { name: 'Psionic' }, { name: 'Ground' }],
  squad: [
    { modelMin: 1, modelMax: 1, supply: 0, pts: 130 },
    { modelMin: 2, modelMax: 2, supply: 1, pts: 130 },
  ],
  abilities: [
    {
      kind: 'rule',
      name: 'Restoration',
      phase: 'Any',
      type: 'Reaction',
      cost: 1,
      rule: {
        en: 'Use when a Friendly Unit Within 4" receives a DEBUFF. Remove all DEBUFFS from it.',
        ko: '',
      },
    },
    {
      kind: 'rule',
      name: 'Force Field',
      phase: 'Movement',
      type: 'Active',
      cost: 1,
      rule: {
        en: "Set a Force Field token Within 8\" in an unoccupied space. Units of Size 2 or lower cannot move across Force Fields. Models of Size 3 or more can move over it, and it's then removed.",
        ko: '',
      },
    },
    {
      kind: 'rule',
      name: 'Guardian Shield',
      phase: 'Movement',
      type: 'Active',
      cost: 1,
      rule: {
        en: 'All Ranged Attacks targeting a Friendly Unit Within 4" (Line of Sight is not required) are made with 1 fewer die in the Attack Pool.',
        ko: '',
      },
    },
    {
      kind: 'weapon',
      name: 'Disruption Beam',
      phase: 'Assault',
      stat: {
        rng: 8,
        tgt: 'All',
        roa: 2,
        hit: '2+',
        surge: [],
        sDie: '-',
        dmg: 1,
        keyword: [{ name: 'INSTANT' }],
      },
    },
    {
      kind: 'weapon',
      name: 'Beam',
      phase: 'Combat',
      stat: {
        rng: 'E',
        tgt: 'Ground',
        roa: 2,
        hit: '3+',
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
      ability: {
        kind: 'rule',
        name: 'Solid-Field Projectors',
        phase: 'Movement',
        type: 'Active',
        cost: 1,
        rule: {
          en: "Set a Force Field token Within 8\" in an unoccupied space. Units of Size 2 or lower cannot move across Force Fields. Models of Size 3 or more can move over it, and it's then removed.",
          ko: '',
        },
      },
    },
    {
      pts: 30,
      ability: {
        kind: 'rule',
        name: 'Hallucination',
        phase: 'Assault',
        type: 'Reaction',
        cost: 0,
        rule: {
          en: 'When an Enemy Unit declares a Ranged Attack against a Friendly Unit Within 4", the targeted Friendly Unit is eligible to make an Evade Roll against that attack.',
          ko: '',
        },
      },
    },
  ],
}
