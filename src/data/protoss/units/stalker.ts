import type { UnitCard } from '../../../types'

export const stalker: UnitCard = {
  category: 'unit',
  id: 'Stalker',
  name: { en: 'Stalker', ko: '추적자' },
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
  baseSize: { shape: 'circle', diameterMm: 80 },
  squad: [
    { modelMin: 1, modelMax: 1, supply: 1, pts: 170 },
    { modelMin: 2, modelMax: 2, supply: 2, pts: 270 },
  ],
  abilities: [
    {
      kind: 'rule',
      id: 'Squadron',
      name: { en: 'Squadron', ko: '부대' },
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: "This Unit's Horizontal Coherency is 4\".",
        ko: '이 유닛의 코헤런시는 4”이다.',
      },
    },
    {
      kind: 'rule',
      id: 'Blink',
      name: { en: 'Blink', ko: '점멸' },
      phase: 'Movement',
      type: 'Active',
      cost: 1,
      rule: {
        en: 'Resolve the PLACE (6) effect. Models set by this effect cannot be set up Within the Engagement Range of any Enemy Unit.',
        ko: '위치(6)한다, 적 유닛과 인게이지 상태가 되게 배치될 수 없다.',
      },
    },
    {
      kind: 'weapon',
      id: 'Particle Disruptors',
      name: { en: 'Particle Disruptors', ko: '입자 분열기' },
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
      id: 'Stomp',
      name: { en: 'Stomp', ko: '짓밟기' },
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
        id: 'Path of Shadows',
        name: { en: 'Path of Shadows', ko: '그림자의 길' },
        phase: 'Any',
        type: 'Active',
        cost: 1,
        rule: {
          en: 'This Unit gains HIDDEN Status until it performs another action.',
          ko: '이 유닛은 다른 액션을 할 때까지 은폐 상태를 갖는다.',
        },
      },
    },
    {
      pts: [20, 30],
      ability: {
        kind: 'rule',
        id: 'Fury of the Nerazim',
        name: { en: 'Fury of the Nerazim', ko: '네라짐의 격노' },
        phase: 'Assault',
        type: 'Passive',
        cost: 0,
        rule: {
          en: 'When this Unit attacks an Enemy Unit that has already been Activated during this Phase, its Particle Disruptors gain INSTANT for that attack.',
          ko: '이 유닛이 공격하는 대상이 이 페이즈에 이미 활성화된 유닛이라면, 입자분열기는 그 공격에서 인스턴트를 갖는다.',
        },
      },
    },
  ],
}
