import type { UnitCard } from '../../../types'

export const swarmlingZergling: UnitCard = {
  category: 'unit',
  id: 'Swarmling (Zergling)',
  name: { en: 'Swarmling (Zergling)', ko: '군단충 [저글링]' },
  isUnique: false,
  type: 'Core',
  stat: {
    shld: null,
    spd: { move: 4, cohesion: 4 },
    eva: '5+',
    arm: '6+',
    hp: 1,
    siz: 1,
  },
  tags: [{ name: 'Biological' }, { name: 'Light' }, { name: 'Ground' }],
  squad: [
    { modelMin: 1, modelMax: 6, supply: 0, pts: 260 },
    { modelMin: 7, modelMax: 18, supply: 1, pts: 260 },
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
      id: 'Zergling Reconstitution',
      name: { en: 'Zergling Reconstitution', ko: '저글링 재구성' },
      phase: 'Movement',
      type: 'Active',
      cost: 1,
      rule: {
        en: 'Resolve the RESPAWN (2) effect, or RESPAWN (3) if the Unit is ON CREEP.',
        ko: '리스폰(2)한다. 이 유닛이 점막 위라면 리스폰(3)한다.',
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
        ko: '이 유닛이 성공적으로 차지를 마쳤을 때 즉시 5+로 임팩트(1)를 입힌다.',
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
      pts: 20,
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
  ],
}
