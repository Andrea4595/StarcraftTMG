import type { UnitCard } from '../../../types'

export const medic: UnitCard = {
  category: 'unit',
  name: 'Medic',
  isUnique: false,
  type: 'Support',
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
    { modelMin: 1, modelMax: 1, supply: 0, pts: 110 },
    { modelMin: 2, modelMax: 3, supply: 1, pts: 110 },
  ],
  abilities: [
    {
      kind: 'rule',
      name: 'Life Support',
      phase: 'Any',
      type: 'Reaction',
      cost: 1,
      rule: {
        en: 'Use when another Friendly Biological Unit suffers Damage Within 4". Reduce the Total Damage before allocation by 1 for each model in this Unit that is Within 4" of the damaged Unit.',
        ko: '',
      },
    },
    {
      kind: 'rule',
      name: 'Restoration',
      phase: 'Any',
      type: 'Reaction',
      cost: 1,
      rule: {
        en: 'Use when a Friendly Unit Within 4" receives a DEBUFF. Remove all DEBUFFs from it.',
        ko: '',
      },
    },
    {
      kind: 'rule',
      name: 'Medpack',
      phase: 'Movement',
      type: 'Active',
      cost: 1,
      rule: {
        en: 'Select another Friendly Biological Unit Within 4". Resolve the HEAL (X) effect for the targeted Unit, where X is the number of models in this Unit that are Within 4" of the target Unit.',
        ko: '',
      },
    },
    {
      kind: 'rule',
      name: 'Optical Flare',
      phase: 'Movement',
      type: 'Active',
      cost: 2,
      rule: {
        en: "Select one Enemy Unit Within 12\". Until the End of the Round, apply DEBUFF Range (4) to that Unit's Ranged Weapons. That Unit cannot benefit from LONG RANGE.",
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
      pts: 60,
      ability: {
        kind: 'rule',
        name: 'Advanced Medic Facilities',
        phase: 'Any',
        type: 'Passive',
        cost: 0,
        rule: {
          en: "This Unit's Supply Value counts as 0 when calculating the Supply Pool.",
          ko: '',
        },
      },
    },
    {
      pts: 20,
      ability: {
        kind: 'rule',
        name: 'A-13 Flash Grenade Launcher',
        phase: 'Any',
        type: 'Passive',
        cost: 0,
        rule: {
          en: "Increase the Optical Flare special ability's Range to 16\".",
          ko: '',
        },
      },
    },
    {
      pts: 30,
      ability: {
        kind: 'rule',
        name: 'Stabilizer Medpacks',
        phase: 'Any',
        type: 'Passive',
        cost: 0,
        rule: {
          en: "When this Unit resolves a Life Support or Medpack ability, treat it as having 1 additional model Within Range for calculating that ability's effects.",
          ko: '',
        },
      },
    },
  ],
}
