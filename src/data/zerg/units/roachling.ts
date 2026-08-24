import type { UnitCard } from '../../../types'

export const roachling: UnitCard = {
  category: 'unit',
  id: 'Roachling',
  name: { en: 'Roachling', ko: '애바퀴' },
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
  baseSize: { shape: 'circle', diameterMm: 32 },
  squad: [{ modelMin: 1, modelMax: 3, supply: 0, pts: 0 }],
  abilities: [
    {
      kind: 'rule',
      id: 'Underdeveloped Claws',
      name: { en: 'Underdeveloped Claws', ko: '발달되지 않은 발톱' },
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'This Unit cannot gain Burrowed Status.',
        ko: '이 유닛은 잠복상태가 될 수 없다.',
      },
    },
    {
      kind: 'weapon',
      id: 'Claws',
      name: { en: 'Claws', ko: '발톱' },
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
