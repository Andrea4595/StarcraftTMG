import type { UnitCard } from '../../../types'

export const adept: UnitCard = {
  category: 'unit',
  name: 'Adept',
  isUnique: false,
  type: 'Core',
  stat: {
    shld: 2,
    spd: { move: 5, cohesion: 3 },
    eva: '5+',
    arm: '5+',
    hp: 3,
    siz: 2,
  },
  tags: [{ name: 'Biological' }, { name: 'Light' }, { name: 'Ground' }],
  squad: [
    { modelMin: 1, modelMax: 2, supply: 0, pts: 150 },
    { modelMin: 3, modelMax: 4, supply: 1, pts: 150 },
  ],
  abilities: [
    {
      kind: 'rule',
      name: 'Psionic Presence',
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: "All Weapons of Friendly Units targeting an Enemy Unit Within 4\" of this Unit's Shade token gain PRECISION (1).",
        ko: '이 유닛의 Shade 토큰에서 4" 이내에 있는 적 유닛을 대상으로 지정한 아군 유닛의 모든 무기는 PRECISION (1)을 얻는다.',
      },
    },
    {
      kind: 'rule',
      name: 'Psionic Transfer',
      phase: 'Movement',
      type: 'Active',
      cost: 1,
      rule: {
        en: "Set a Shade token Wholly Within 12\" of any model in this Unit. At the End of the Round, the controlling player may set all models of this Unit in Coherency, treating the Shade token as the Leading Model. The Shade token has DISPLACEMENT.",
        ko: '이 유닛의 모델 하나로부터 12" 이내에 완전히 들어오도록 Shade 토큰을 놓는다. 라운드 종료 시, 소유 플레이어는 Shade 토큰을 Leading Model로 취급하여 이 유닛의 모든 모델을 Coherency에 맞게 배치할 수 있다. Shade 토큰은 DISPLACEMENT를 가진다.',
      },
    },
    {
      kind: 'weapon',
      name: 'Glaive Cannon',
      phase: 'Assault',
      stat: {
        rng: 8,
        tgt: 'All',
        roa: 2,
        hit: '3+',
        surge: ['Light'],
        sDie: 'D3+1',
        dmg: 1,
        keyword: [{ name: 'ANTI-EVADE', suffix: '(1)' }],
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
      pts: 20,
      for: 'Glaive Cannon',
      ability: {
        kind: 'rule',
        name: 'Resonating Glaives',
        phase: 'Assault',
        type: 'Active',
        cost: 1,
        rule: {
          en: "This Unit's Glaive Cannon gains BUFF RoA (1).",
          ko: '이 유닛의 Glaive Cannon은 BUFF RoA (1)을 얻는다.',
        },
      },
    },
    {
      pts: 10,
      for: 'Glaive Cannon',
      ability: {
        kind: 'rule',
        name: 'Guidance',
        phase: 'Assault',
        type: 'Passive',
        cost: 0,
        rule: {
          en: "This Unit's Glaive Cannon Ranged weapon gains ANTI-EVADE (2).",
          ko: '이 유닛의 Glaive Cannon 원거리 무기는 ANTI-EVADE (2)를 얻는다.',
        },
      },
    },
    {
      pts: 20,
      for: 'Strike',
      ability: {
        kind: 'weapon',
        name: 'Glaive Strike',
        phase: 'Combat',
        stat: {
          rng: 'E',
          tgt: 'Ground',
          roa: 1,
          hit: '4+',
          surge: ['Light'],
          sDie: 'D3',
          dmg: 1,
          keyword: [{ name: 'PIERCE', suffix: 'Light (2)' }],
        },
      },
    },
  ],
}
