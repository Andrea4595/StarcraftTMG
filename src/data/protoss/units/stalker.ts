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
        ko: '이 유닛의 Horizontal Coherency는 4"이다.',
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
        ko: 'PLACE (6) 효과를 처리한다. 이 효과로 배치되는 모델은 적 유닛의 Engagement Range 이내에 배치할 수 없다.',
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
          ko: '이 유닛은 다른 action을 수행할 때까지 HIDDEN Status를 얻는다.',
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
          ko: '이 유닛이 이번 Phase에 이미 Activated된 적 유닛을 공격할 때, 그 공격에 한해 Particle Disruptors는 INSTANT를 얻는다.',
        },
      },
    },
  ],
}
