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
    { modelMin: 1, modelMax: 1, supply: 1, pts: 160 },
    { modelMin: 2, modelMax: 2, supply: 2, pts: 270 },
  ],
  abilities: [
    {
      kind: 'rule',
      id: 'Squadron',
      name: { en: 'Squadron', ko: '분대' },
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: "This Unit's Horizontal Coherency is 4\".",
        ko: '이 유닛의 수평 대형은 4인치입니다.',
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
        ko: '배치(6) 효과를 수행합니다. 이 효과로 배치되는 모형은 적 유닛의 교전 범위 안쪽에 놓일 수 없습니다.',
      },
      simulatorFeature: { kind: 'selfMove', range: 6 },
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
          ko: '이 유닛은 다른 행동을 수행할 때까지 은신 상태를 얻습니다.',
        },
      },
    },
    {
      pts: [20, 30],
      ability: {
        kind: 'rule',
        id: 'Fury of the Nerazim',
        name: { en: 'Fury of the Nerazim', ko: '네라짐의 분노' },
        phase: 'Assault',
        type: 'Passive',
        cost: 0,
        rule: {
          en: 'When this Unit attacks an Enemy Unit that has already been Activated during this Phase, its Particle Disruptors gain INSTANT for that attack.',
          ko: '이 유닛이 이번 단계에 이미 활성화된 적 유닛을 공격할 때, 해당 공격에 사용하는 입자 분열기는 반응 불가 특성을 얻습니다.',
        },
      },
    },
  ],
}
