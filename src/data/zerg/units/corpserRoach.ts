import type { UnitCard } from '../../../types'

export const corpserRoach: UnitCard = {
  category: 'unit',
  name: 'Corpser (Roach)',
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
    { modelMin: 1, modelMax: 1, supply: 0, pts: 240 },
    { modelMin: 2, modelMax: 3, supply: 1, pts: 240 },
  ],
  abilities: [
    {
      kind: 'rule',
      name: 'Burrow',
      phase: 'Any',
      type: 'Active',
      cost: 2,
      rule: {
        en: 'If this Unit is Unengaged, it gains or loses the Burrowed Status.',
        ko: '이 유닛이 Unengaged 상태라면, Burrowed Status를 얻거나 잃는다.',
      },
    },
    {
      kind: 'rule',
      name: 'Roachling Infestation',
      phase: 'Movement',
      type: 'Active',
      cost: 2,
      rule: {
        en: 'Once per Game. Resolve the SUMMON (Roachling) effect.',
        ko: '게임당 1회. SUMMON (Roachling) 효과를 해결한다.',
      },
    },
    {
      kind: 'weapon',
      name: 'Acid Saliva',
      phase: 'Assault',
      stat: {
        rng: 8,
        tgt: 'Ground',
        roa: 2,
        hit: '3+',
        surge: [],
        sDie: '-',
        dmg: 1,
        keyword: [],
      },
    },
    {
      kind: 'rule',
      name: 'Regeneration',
      phase: 'Assault',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'When this Unit becomes Activated, if it has the Burrowed Status, resolve the HEAL (2) effect.',
        ko: '이 유닛이 Activated될 때, Burrowed Status를 가지고 있다면 HEAL (2) 효과를 해결한다.',
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
        ko: '이 유닛이 Charge에 성공한 직후, IMPACT (3) 4+ 효과를 해결한다.',
      },
    },
    {
      kind: 'weapon',
      name: 'Claws',
      phase: 'Combat',
      stat: {
        rng: 'E',
        tgt: 'Ground',
        roa: 3,
        hit: '4+',
        surge: ['Light'],
        sDie: 'D3+1',
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
        name: 'Tunneling Claws',
        phase: 'Any',
        type: 'Passive',
        cost: 0,
        rule: {
          en: "While this Unit has the Burrowed Status, it may perform the Move and Run actions without losing that Status. It may also move through other Units' bases.",
          ko: '이 유닛이 Burrowed Status를 가지고 있는 동안, 그 Status를 잃지 않고 Move 및 Run action을 수행할 수 있다. 또한 다른 유닛의 베이스를 통과해 이동할 수 있다.',
        },
      },
    },
    {
      pts: 20,
      ability: {
        kind: 'rule',
        name: 'Burrow Ambush',
        phase: 'Movement',
        type: 'Passive',
        cost: 0,
        rule: {
          en: "When this Unit is nominated to deploy from the Reserves, it may resolve the PLACE (18) effect from the controlling player's Entry Edge. No model may be set Within 10\" of any Enemy model. This Unit's Activation ends.",
          ko: '이 유닛이 Reserves에서 Deploy하도록 지명되었을 때, 소유 플레이어의 Entry Edge에서 PLACE (18) 효과를 해결할 수 있다. 어떤 모델도 적 모델의 10" 이내에 놓을 수 없다. 이 유닛의 Activation이 종료된다.',
        },
      },
    },
    {
      pts: 20,
      ability: {
        kind: 'rule',
        name: 'Glial Reconstitution',
        phase: 'Movement',
        type: 'Active',
        cost: 1,
        rule: {
          en: 'This Unit gains BUFF SPEED (1), or BUFF SPEED (2) if the Unit is ON CREEP.',
          ko: '이 유닛은 BUFF SPEED (1)을 얻는다. 유닛이 ON CREEP이라면 대신 BUFF SPEED (2)를 얻는다.',
        },
      },
    },
    {
      pts: 10,
      ability: {
        kind: 'rule',
        name: 'Hydriodic Bile',
        phase: 'Assault',
        type: 'Passive',
        cost: 0,
        rule: {
          en: "This Unit's Acid Saliva weapon gains Surge Type: Light, and S Dice: D3+1.",
          ko: '이 유닛의 Acid Saliva 무기는 Surge Type: Light와 S Dice: D3+1을 얻는다.',
        },
      },
    },
  ],
}
