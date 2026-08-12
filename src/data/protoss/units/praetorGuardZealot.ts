import type { UnitCard } from '../../../types'

export const praetorGuardZealot: UnitCard = {
  category: 'unit',
  name: 'Praetor Guard (Zealot)',
  isUnique: true,
  type: 'Elite',
  stat: {
    shld: 3,
    spd: { move: 4, cohesion: 3 },
    eva: '5+',
    arm: '5+',
    hp: 4,
    siz: 2,
  },
  tags: [
    { name: 'Khalai' },
    { name: 'Biological' },
    { name: 'Light' },
    { name: 'Ground' },
    { name: 'Unique' },
  ],
  squad: [
    { modelMin: 1, modelMax: 1, supply: 1, pts: 280 },
    { modelMin: 2, modelMax: 3, supply: 2, pts: 280 },
  ],
  abilities: [
    {
      kind: 'rule',
      name: 'Shield Overcharge',
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'This Unit gains TOUGH (2) on the first Armour Roll each Round.',
        ko: '',
      },
    },
    {
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
    {
      kind: 'rule',
      name: 'Titan Killers',
      phase: 'Combat',
      type: 'Passive',
      cost: 0,
      rule: {
        en: "When this Unit makes a Close Combat Attack, and the target is Size 3 or larger, the weapon's Damage characteristic is treated as 2.",
        ko: '',
      },
    },
    {
      kind: 'rule',
      name: 'Precognition',
      phase: 'Combat',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'This Unit is eligible to make an Evade roll against all attacks targeting it.',
        ko: '',
      },
    },
  ],
  upgrades: [],
}
