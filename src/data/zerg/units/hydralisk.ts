import type { UnitCard } from '../../../types'

export const hydralisk: UnitCard = {
  category: 'unit',
  id: 'Hydralisk',
  name: { en: 'Hydralisk', ko: '히드라리스크' },
  isUnique: false,
  type: 'Elite',
  stat: {
    shld: null,
    spd: { move: 4, cohesion: 4 },
    eva: '5+',
    arm: '5+',
    hp: 4,
    siz: 2,
  },
  tags: [{ name: 'Biological' }, { name: 'Light' }, { name: 'Ground' }],
  baseSize: { shape: 'oval', widthMm: 40, lengthMm: 100 },
  squad: [
    { modelMin: 1, modelMax: 1, supply: 1, pts: 140 },
    { modelMin: 2, modelMax: 2, supply: 2, pts: 140 },
    { modelMin: 3, modelMax: 4, supply: 3, pts: 260 },
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
      kind: 'weapon',
      id: 'Needle Spines',
      name: { en: 'Needle Spines', ko: '바늘 가시뼈' },
      phase: 'Assault',
      stat: {
        rng: 12,
        tgt: 'All',
        roa: 3,
        hit: '3+',
        surge: ['Light', 'Armoured'],
        sDie: 'D3+1',
        dmg: 2,
        keyword: [],
      },
    },
    {
      kind: 'rule',
      id: 'Lunge',
      name: { en: 'Lunge', ko: '달려들기' },
      phase: 'Assault',
      type: 'Reaction',
      cost: 1,
      rule: {
        en: 'When another Friendly Unit Within 10" is the target of a Ranged Attack, after the attack is fully resolved, this Unit, if Unengaged, may perform a Move action Directly Towards the attacking Unit.',
        ko: '10인치 이내의 다른 아군 유닛이 원거리 공격의 대상이 되었을 때, 해당 공격이 완전히 해결된 후 이 유닛이 교전 중이 아니라면 공격한 유닛을 향해 가까워지도록 이동 행동을 수행할 수 있습니다.',
      },
      // 실제 이동 목적지(공격한 유닛 위치)는 시뮬레이터가 도와줄 수 없어, 발동 조건인
      // "10" 이내 아군"을 확인하는 대상 지정으로 표현한다
      simulatorFeature: { kind: 'targetOne', side: 'ally', range: 10 },
    },
    {
      kind: 'weapon',
      id: 'Scythe',
      name: { en: 'Scythe', ko: '낫' },
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
  upgrades: [
    {
      pts: [20, 20, 30],
      ability: {
        kind: 'rule',
        id: 'Ancillary Carapace',
        name: { en: 'Ancillary Carapace', ko: '보조 갑피' },
        phase: 'Any',
        type: 'Passive',
        cost: 0,
        rule: {
          en: 'This Unit gains TOUGH (1) on the first Armour Roll of each Activation.',
          ko: '이 유닛은 각 활성화마다 처음 수행하는 방어 굴림에서 강인함(1)을 얻습니다.',
        },
      },
    },
    {
      pts: [10, 10, 10],
      ability: {
        kind: 'rule',
        id: 'Lurking',
        name: { en: 'Lurking', ko: '매복' },
        phase: 'Any',
        type: 'Passive',
        cost: 0,
        rule: {
          en: 'If this Unit has Stationary Status, it is eligible to make an Evade Roll against the first Ranged Attack targeting it this Round. If this Unit is ON CREEP, it gains +1 Modifier to the Evade Roll.',
          ko: '이 유닛이 정지한 상태라면, 이번 라운드에 자신을 대상으로 하는 첫 번째 원거리 공격에 대해 회피 굴림을 할 수 있습니다. 이 유닛이 점막 위에 있다면, 해당 회피 굴림에 +1 수정치를 얻습니다.',
        },
      },
    },
    {
      pts: [20, 20, 40],
      ability: {
        kind: 'rule',
        id: 'Burrow Ambush',
        name: { en: 'Burrow Ambush', ko: '잠복 기습' },
        phase: 'Movement',
        type: 'Passive',
        cost: 0,
        rule: {
          en: "When this Unit is nominated to deploy from the Reserves, it may resolve the PLACE (18) effect from the controlling player's Entry Edge. No model may be set Within 10\" of any Enemy model. This Unit's Activation ends.",
          ko: '이 유닛이 예비 병력에서 전개 대상으로 지정되면, 조종 플레이어의 진입 경계로부터 배치(18) 효과를 수행할 수 있습니다. 어떠한 모형도 적 모형의 10인치 이내에 놓을 수 없습니다. 이 유닛의 활성화는 종료됩니다.',
        },
      },
    },
    {
      pts: [20, 20, 30],
      ability: {
        kind: 'rule',
        id: 'Grooved Spines',
        name: { en: 'Grooved Spines', ko: '가시 홈' },
        phase: 'Assault',
        type: 'Passive',
        cost: 0,
        enhances: ['Needle Spines'],
        rule: {
          en: 'This Unit\'s Needle Spines ranged weapon gains LONG RANGE (16").',
          ko: '이 유닛의 바늘 가시뼈 원거리 무기는 장거리 사격(16")을 얻습니다.',
        },
      },
    },
  ],
}
