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
  squad: [
    { modelMin: 1, modelMax: 1, supply: 1, pts: 140 },
    { modelMin: 2, modelMax: 2, supply: 2, pts: 140 },
    { modelMin: 3, modelMax: 4, supply: 3, pts: 260 },
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
        ko: '이 유닛의 코헤런시는 4"이다.',
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
        ko: '다른 10" 이내에 있는 아군 유닛이 원거리 공격의 대상이 되었을 때, 그 공격이 완전히 처리된 후, 이 유닛이 인게이지 상태가 아닐 경우, 공격했던 유닛에게 곧바로 이동할 수 있다.',
      },
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
      pts: [20, 20, 40],
      ability: {
        kind: 'rule',
        id: 'Ancillary Carapace',
        name: { en: 'Ancillary Carapace', ko: '보조갑피' },
        phase: 'Any',
        type: 'Passive',
        cost: 0,
        rule: {
          en: 'This Unit gains TOUGH (1) on the first Armour Roll of each Activation.',
          ko: '이 유닛은 각 활성화의 첫 아머 롤에서 터프(1)을 갖는다.',
        },
      },
    },
    {
      pts: [10, 10, 20],
      ability: {
        kind: 'rule',
        id: 'Lurking',
        name: { en: 'Lurking', ko: '숨기' },
        phase: 'Any',
        type: 'Passive',
        cost: 0,
        rule: {
          en: 'If this Unit has Stationary Status, it is eligible to make an Evade Roll against the first Ranged Attack targeting it this Round. If this Unit is ON CREEP, it gains +1 Modifier to the Evade Roll.',
          ko: '이 유닛이 정지 상태이면 이 라운드에서 받는 첫 사격에서 이 유닛이 회피 롤을 할 수 있다. 점막 위에 있다면 추가로 그 회피 롤에서 +1를 얻는다.',
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
          ko: '이 유닛이 리저브에서 나올 때, 조종하는 플레이어의 엔트리 엣지에서 배치(18)을 적용해 배치될 수 있다. 10" 이내에 다른 적 유닛이 없어야 하며, 이렇게 배치된 후에는 이 유닛의 활성화가 종료된다.',
        },
      },
    },
    {
      pts: [20, 20, 40],
      ability: {
        kind: 'rule',
        id: 'Grooved Spines',
        name: { en: 'Grooved Spines', ko: '가시 홈' },
        phase: 'Assault',
        type: 'Passive',
        cost: 0,
        rule: {
          en: 'This Unit\'s Needle Spines ranged weapon gains LONG RANGE (16").',
          ko: '이 유닛의 바늘 가시뼈는 롱 레인지(16")을 갖는다.',
        },
      },
    },
  ],
}
