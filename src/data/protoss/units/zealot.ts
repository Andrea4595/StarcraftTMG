import type { UnitCard } from '../../../types'

export const zealot: UnitCard = {
  category: 'unit',
  name: 'Zealot',
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
      name: 'Charge',
      phase: 'Assault',
      type: 'Active',
      cost: 1,
      rule: {
        en: "When determining Charge Distance for this Unit, roll 2D6 instead of D6 and use the higher result to add to the Unit's Speed characteristic.",
        ko: '이 유닛의 Charge Distance를 결정할 때, D6 대신 2D6을 굴려 더 높은 결과를 유닛의 Speed 특성치에 더한다.',
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
        ko: '이 유닛이 Charge에 성공한 직후, IMPACT (3) 4+ 효과를 처리한다.',
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
  ],
  upgrades: [
    {
      pts: 10,
      ability: {
        kind: 'rule',
        name: 'My Life for Aiur',
        phase: 'Any',
        type: 'Passive',
        cost: 0,
        rule: {
          en: 'When this Unit resolves IMPACT, each eligible model generates 1 additional IMPACT die.',
          ko: '이 유닛이 IMPACT를 처리할 때, 조건을 만족하는 각 모델은 IMPACT 주사위를 1개 추가로 생성한다.',
        },
      },
    },
    {
      pts: 20,
      ability: {
        kind: 'rule',
        name: 'Leg Enhancements',
        phase: 'Movement',
        type: 'Active',
        cost: 1,
        rule: {
          en: 'This Unit performs a 2" Move action. This does not count towards its action limit.',
          ko: '이 유닛은 2" Move action을 수행한다. 이는 행동 제한에 포함되지 않는다.',
        },
      },
    },
    {
      pts: 10,
      ability: {
        kind: 'rule',
        name: 'Zealous Round',
        phase: 'Assault',
        type: 'Reaction',
        cost: 0,
        rule: {
          en: 'When this Unit is not Activated and receives Damage, the controlling player may count this Unit as Activated in this Phase (flip its Activation Marker) to reduce the Total Damage by 2.',
          ko: '이 유닛이 Activated 상태가 아닐 때 데미지를 받으면, 소유 플레이어는 이 유닛을 이번 Phase에 Activated로 취급하여 (Activation Marker를 뒤집는다) Total Damage를 2 감소시킬 수 있다.',
        },
      },
    },
    {
      pts: 20,
      ability: {
        kind: 'rule',
        name: 'We Stand as One',
        phase: 'Combat',
        type: 'Passive',
        cost: 0,
        rule: {
          en: "When this Unit makes a Close Combat Attack, if the target is Engaged with at least 1 other Friendly Unit, this Unit's Close Combat Weapon gains PRECISION (2).",
          ko: '이 유닛이 근접 공격을 할 때, 대상이 다른 아군 유닛 1개 이상과 Engaged 상태라면, 이 유닛의 근접 무기는 PRECISION (2)를 얻는다.',
        },
      },
    },
  ],
}
