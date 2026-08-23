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
  squad: [
    { modelMin: 1, modelMax: 1, supply: 1, pts: 160 },
    { modelMin: 2, modelMax: 3, supply: 2, pts: 160 },
  ],
  abilities: [
    {
      kind: 'rule',
      id: 'Charge',
      name: { en: 'Charge', ko: '돌진' },
      phase: 'Assault',
      type: 'Active',
      cost: 1,
      rule: {
        en: "When determining Charge Distance for this Unit, roll 2D6 instead of D6 and use the higher result to add to the Unit's Speed characteristic.",
        ko: '이 유닛이 차지할 때 차지 값을 정할 때 기존의 D6 대신 2D6를 굴려서 그중 더 높은 값을 스피드 능력치에 더한다.',
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
        ko: '이 유닛이 성공적으로 차지를 마쳤을 때 즉시 임팩트(3)를 4+로 입힌다.',
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
          ko: '이 유닛이 임팩트를 처리할 때, 적합한 모델마다 하나의 주사위를 추가로 굴린다.',
        },
      },
    },
    {
      pts: 20,
      ability: {
        kind: 'rule',
        id: 'Leg Enhancements',
        name: { en: 'Leg Enhancements', ko: '각력 강화' },
        phase: 'Movement',
        type: 'Active',
        cost: 1,
        rule: {
          en: 'This Unit performs a 2" Move action. This does not count towards its action limit.',
          ko: '이 유닛은 2”의 이동액션을 한다. 이 이동은 라운드의 남은 기간동안 액션을 제한하는 조건이 되지 않는다.',
        },
      },
    },
    {
      pts: 10,
      ability: {
        kind: 'rule',
        id: 'Zealous Round',
        name: { en: 'Zealous Round', ko: '광전사의 원' },
        phase: 'Assault',
        type: 'Reaction',
        cost: 0,
        rule: {
          en: 'When this Unit is not Activated and receives Damage, the controlling player may count this Unit as Activated in this Phase (flip its Activation Marker) to reduce the Total Damage by 2.',
          ko: '이 유닛이 아직 활성화되지 않은 채 데미지를 받게 될 때, 이 유닛을 조종하는 플레이어는 이 유닛이 활성화한 것으로 치고 발생한 총 데미지를 2만큼 줄일 수 있다.',
        },
      },
    },
    {
      pts: 20,
      ability: {
        kind: 'rule',
        id: 'We Stand as One',
        name: { en: 'We Stand as One', ko: '우리는 하나되어 싸운다' },
        phase: 'Combat',
        type: 'Passive',
        cost: 0,
        enhances: ['Psi Blades'],
        rule: {
          en: "When this Unit makes a Close Combat Attack, if the target is Engaged with at least 1 other Friendly Unit, this Unit's Close Combat Weapon gains PRECISION (2).",
          ko: '이 유닛이 근접공격을 할 때, 이 유닛이 아닌 다른 아군 유닛 하나 이상과 인게이지된 상태라면 이 유닛의 근접무기는 프리시전(2)를 갖는다.',
        },
      },
    },
  ],
}
