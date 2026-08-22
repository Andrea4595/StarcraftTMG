import type { UnitCard } from '../../../types'

export const zergling: UnitCard = {
  category: 'unit',
  id: 'Zergling',
  name: { en: 'Zergling', ko: '저글링' },
  isUnique: false,
  type: 'Core',
  stat: {
    shld: null,
    spd: { move: 4, cohesion: 4 },
    eva: '4+',
    arm: '6+',
    hp: 1,
    siz: 1,
  },
  tags: [{ name: 'Biological' }, { name: 'Light' }, { name: 'Ground' }],
  squad: [
    { modelMin: 1, modelMax: 6, supply: 0, pts: 180 },
    { modelMin: 7, modelMax: 12, supply: 1, pts: 180 },
    { modelMin: 13, modelMax: 18, supply: 2, pts: 220 },
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
      kind: 'rule',
      id: 'Metabolic Boost',
      name: { en: 'Metabolic Boost', ko: '대사 촉진' },
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
        en: 'Immediately after this Unit completes a successful Charge, resolve the IMPACT (1) 5+ effect.',
        ko: '이 유닛이 성공적으로 차지를 마쳤을 때 즉시 임팩트(1)를 5+로 입힌다.',
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
        surge: ['Light'],
        sDie: 'D3',
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
        id: 'Burrow Ambush',
        name: { en: 'Burrow Ambush', ko: '잠복 기습' },
        phase: 'Movement',
        type: 'Passive',
        cost: 0,
        rule: {
          en: "When this Unit is nominated to deploy from the Reserves, it may resolve the PLACE (18) effect from the controlling player's Entry Edge. No model may be set Within 10\" of any Enemy model. This Unit's Activation ends.",
          ko: '이 유닛이 리저브에서 나올 때, 조종하는 플레이어의 엔트리 엣지에서 위치(18)를 적용해 배치될 수 있다. 10" 이내에 다른 적 유닛이 없어야 하며, 이렇게 배치된 후에는 이 유닛의 활성화가 종료된다.',
        },
      },
    },
    {
      pts: 10,
      forId: 'Claws',
      ability: {
        kind: 'weapon',
        id: 'Shredding Claws',
        name: { en: 'Shredding Claws', ko: '분쇄하는 발톱' },
        phase: 'Combat',
        stat: {
          rng: 'E',
          tgt: 'Ground',
          roa: 2,
          hit: '4+',
          surge: ['Light', 'Armoured'],
          sDie: 'D3',
          dmg: 1,
          keyword: [],
        },
      },
    },
    {
      pts: 20,
      ability: {
        kind: 'rule',
        id: 'Adrenal Glands',
        name: { en: 'Adrenal Glands', ko: '아드레날린 분비선' },
        phase: 'Any',
        type: 'Passive',
        cost: 0,
        rule: {
          en: "This Unit's Claws and Shredding Claws weapons gain PRECISION (2).",
          ko: '이 유닛의 발톱, 분쇄하는 발톱은 프리시전(2)을 갖는다.',
        },
      },
    },
  ],
}
