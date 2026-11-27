import type { UnitCard } from '../../../types'

export const zealot: UnitCard = {
  category: 'unit',
  id: 'Zealot',
  name: { en: 'Zealot', ko: '광전사' },
  isUnique: false,
  type: 'Core',
  stat: {
    shld: 3,
    spd: { move: 4, cohesion: 3 },
    eva: '5+',
    arm: '5+',
    hp: 4,
    siz: 2,
  },
  tags: [{ name: 'Biological' }, { name: 'Light' }, { name: 'Ground' }],
  baseSize: { shape: 'circle', diameterMm: 40 },
  squad: [
    { modelMin: 1, modelMax: 1, supply: 1, pts: 170 },
    { modelMin: 2, modelMax: 3, supply: 2, pts: 170 },
  ],
  abilities: [
    {
      kind: 'rule',
      id: 'Charge',
      name: { en: 'Charge', ko: '돌격' },
      phase: 'Assault',
      type: 'Active',
      cost: 1,
      rule: {
        en: "When determining Charge Distance for this Unit, roll 2D6 instead of D6 and use the higher result to add to the Unit's Speed characteristic.",
        ko: '이 유닛의 돌격 거리를 결정할 때, D6 대신 2D6을 굴리고 더 높은 결과값을 이 유닛의 속도 수치에 더합니다.',
      },
    },
    {
      kind: 'rule',
      id: 'Devastating Charge',
      name: { en: 'Devastating Charge', ko: '파괴적인 돌진' },
      phase: 'Assault',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'Immediately after this Unit completes a successful Charge, resolve the IMPACT (3) 4+ effect.',
        ko: '이 유닛이 돌격에 성공한 직후, 충격(3) 4+ 효과를 수행합니다.',
      },
    },
    {
      kind: 'weapon',
      id: 'Psi Blades',
      name: { en: 'Psi Blades', ko: '사이오닉 검' },
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
  ],
  upgrades: [
    {
      pts: 10,
      ability: {
        kind: 'rule',
        id: 'My Life for Aiur',
        name: { en: 'My Life for Aiur', ko: '내 목숨을 아이어에' },
        phase: 'Any',
        type: 'Passive',
        cost: 0,
        enhances: ['Devastating Charge'],
        rule: {
          en: 'When this Unit resolves IMPACT, each eligible model generates 1 additional IMPACT die.',
          ko: '이 유닛이 충격을 해결할 때, 조건을 만족하는 각 모형은 추가 충격 주사위 1개를 생성합니다.',
        },
      },
    },
    {
      pts: 20,
      ability: {
        kind: 'rule',
        id: 'Leg Enhancements',
        name: { en: 'Leg Enhancements', ko: '다리 강화' },
        phase: 'Movement',
        type: 'Active',
        cost: 1,
        rule: {
          en: 'This Unit performs a 2" Move action. This does not count towards its action limit.',
          ko: '이 유닛은 2인치 이동 행동을 수행합니다. 이 행동은 행동 제한에 포함되지 않습니다.',
        },
      },
    },
    {
      pts: 10,
      ability: {
        kind: 'rule',
        id: 'Zealous Round',
        name: { en: 'Zealous Round', ko: '열성의 원' },
        phase: 'Assault',
        type: 'Reaction',
        cost: 0,
        rule: {
          en: 'When this Unit is not Activated and receives Damage, the controlling player may count this Unit as Activated in this Phase (flip its Activation Marker) to reduce the Total Damage by 2.',
          ko: '이 유닛이 활성화되지 않은 상태에서 피해를 받을 때, 조종 플레이어는 이 유닛을 이번 단계에서 활성화된 것으로 간주할 수 있습니다. 그렇게 한다면, 이 유닛의 활성화 마커를 뒤집고, 최종 피해를 2 감소시킵니다.',
        },
      },
    },
    {
      pts: 20,
      ability: {
        kind: 'rule',
        id: 'We Stand as One',
        name: { en: 'We Stand as One', ko: '우리는 하나다' },
        phase: 'Combat',
        type: 'Passive',
        cost: 0,
        enhances: ['Psi Blades'],
        rule: {
          en: "When this Unit makes a Close Combat Attack, if the target is Engaged with at least 1 other Friendly Unit, this Unit's Close Combat Weapon gains PRECISION (2).",
          ko: '이 유닛이 근접전 공격을 수행할 때, 그 대상이 최소 1개의 다른 아군 유닛과 교전 중이라면 이 유닛의 근접전 무기는 정밀(2) 특성을 얻습니다.',
        },
      },
    },
  ],
}
