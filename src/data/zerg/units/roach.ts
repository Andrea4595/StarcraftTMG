import type { UnitCard } from '../../../types'

export const roach: UnitCard = {
  category: 'unit',
  id: 'Roach',
  name: { en: 'Roach', ko: 'Roach' },
  isUnique: false,
  type: 'Core',
  stat: {
    shld: null,
    spd: { move: 4, cohesion: 3 },
    eva: '5+',
    arm: '3+',
    hp: 4,
    siz: 2,
  },
  tags: [{ name: 'Armoured' }, { name: 'Biological' }, { name: 'Ground' }],
  squad: [
    { modelMin: 1, modelMax: 1, supply: 0, pts: 170 },
    { modelMin: 2, modelMax: 3, supply: 1, pts: 170 },
  ],
  abilities: [
    {
      kind: 'rule',
      id: 'Burrow',
      name: { en: 'Burrow', ko: 'Burrow' },
      phase: 'Any',
      type: 'Active',
      cost: 2,
      rule: {
        en: 'If this Unit is Unengaged, it gains or loses the Burrowed Status.',
        ko: '이 유닛이 인게이지 상태가 아니라면, 이 유닛이 잠복 상태를 잃거나, 얻을 수 있다.',
      },
    },
    {
      kind: 'weapon',
      id: 'Acid Saliva',
      name: { en: 'Acid Saliva', ko: 'Acid Saliva' },
      phase: 'Assault',
      stat: {
        rng: 8,
        tgt: 'Ground',
        roa: 3,
        hit: '3+',
        surge: [],
        sDie: '-',
        dmg: 1,
        keyword: [],
      },
    },
    {
      kind: 'rule',
      id: 'Regeneration',
      name: { en: 'Regeneration', ko: 'Regeneration' },
      phase: 'Assault',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'When this Unit becomes Activated, if it has the Burrowed Status, resolve the HEAL (2) effect.',
        ko: '이 유닛이 활성화될 때 잠복 상태라면, 치유(2)한다.',
      },
    },
    {
      kind: 'rule',
      id: 'Devastating Charge',
      name: { en: 'Devastating Charge', ko: 'Devastating Charge' },
      phase: 'Assault',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'Immediately after this Unit completes a successful Charge, resolve the IMPACT (2) 4+ effect.',
        ko: '이 유닛이 성공적으로 차지를 마쳤을 때 즉시 4+로 임팩트(2)를 입힌다.',
      },
    },
    {
      kind: 'weapon',
      id: 'Claws',
      name: { en: 'Claws', ko: 'Claws' },
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
      pts: 10,
      ability: {
        kind: 'rule',
        id: 'Tunneling Claws',
        name: { en: 'Tunneling Claws', ko: 'Tunneling Claws' },
        phase: 'Any',
        type: 'Passive',
        cost: 0,
        rule: {
          en: "While this Unit has the Burrowed Status, it may perform the Move and Run actions without losing that Status. It may also move through other Units' bases.",
          ko: '이 유닛이 잠복 상태일 때, 이동과 질주를 해도 잠복 상태를 잃지 않는다. 또한 이렇게 이동할 때 다른 유닛의 베이스를 존재하지 않는 것처럼 통과해 이동할 수 있다.',
        },
      },
    },
    {
      pts: 20,
      ability: {
        kind: 'rule',
        id: 'Burrow Ambush',
        name: { en: 'Burrow Ambush', ko: 'Burrow Ambush' },
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
      pts: 20,
      ability: {
        kind: 'rule',
        id: 'Glial Reconstitution',
        name: { en: 'Glial Reconstitution', ko: 'Glial Reconstitution' },
        phase: 'Movement',
        type: 'Active',
        cost: 1,
        rule: {
          en: 'This Unit gains BUFF SPEED (1), or BUFF SPEED (2) if the Unit is ON CREEP.',
          ko: '이 유닛이 버프 스피드(1)을 얻는다. 점막 위라면 대신 버프 스피드(2)를 얻는다.',
        },
      },
    },
    {
      pts: 10,
      ability: {
        kind: 'rule',
        id: 'Hydriodic Bile',
        name: { en: 'Hydriodic Bile', ko: 'Hydriodic Bile' },
        phase: 'Assault',
        type: 'Passive',
        cost: 0,
        rule: {
          en: "This Unit's Acid Saliva weapon gains Surge Type: Light, and S Dice: D3+1.",
          ko: '이 유닛의 산성 타액은 서지 타입: 경장갑과 S DICE: D3+1을 얻는다.',
        },
      },
    },
  ],
}
