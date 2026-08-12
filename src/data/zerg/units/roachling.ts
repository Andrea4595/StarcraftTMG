import type { UnitCard } from '../../../types'

export const roachling: UnitCard = {
  category: 'unit',
  name: 'Roachling',
  isUnique: false,
  type: 'Other',
  stat: {
    shld: null,
    spd: { move: 4, cohesion: 3 },
    eva: '6+',
    arm: '6+',
    hp: 1,
    siz: 1,
  },
  tags: [{ name: 'Biological' }, { name: 'Light' }, { name: 'Ground' }],
  squad: [{ modelMin: 1, modelMax: 3, supply: 0, pts: 0 }],
  abilities: [
    {
      kind: 'rule',
      name: 'Underdeveloped Claws',
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'This Unit cannot gain Burrowed Status.',
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
        roa: 2,
        hit: '4+',
        surge: [],
        sDie: '-',
        dmg: 1,
        keyword: [],
      },
    },
  ],
  upgrades: [],
}
