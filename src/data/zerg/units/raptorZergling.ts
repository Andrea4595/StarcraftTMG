import type { UnitCard } from '../../../types'

export const raptorZergling: UnitCard = {
  category: 'unit',
  name: 'Raptor (Zergling)',
  isUnique: false,
  type: 'Elite',
  stat: {
    shld: null,
    spd: { move: 5, cohesion: 4 },
    eva: '4+',
    arm: '6+',
    hp: 1,
    siz: 1,
  },
  tags: [{ name: 'Biological' }, { name: 'Light' }, { name: 'Ground' }],
  squad: [
    { modelMin: 1, modelMax: 6, supply: 0, pts: 240 },
    { modelMin: 7, modelMax: 12, supply: 1, pts: 240 },
    { modelMin: 13, modelMax: 18, supply: 2, pts: 300 },
  ],
  abilities: [
    {
      kind: 'rule',
      name: 'Squadron',
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: "This Unit's Horizontal Coherency is 4\".",
        ko: '이 유닛의 Horizontal Coherency는 4"이다.',
      },
    },
    {
      kind: 'rule',
      name: 'Raptor Strain',
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'This Unit can move through IMPASSABLE TERRAIN of Size 4 or less and change elevation without using ACCESS POINTS.',
        ko: '이 유닛은 Size 4 이하의 IMPASSABLE TERRAIN을 통과해 이동할 수 있으며, ACCESS POINTS를 사용하지 않고 고도를 변경할 수 있다.',
      },
    },
    {
      kind: 'rule',
      name: 'Adrenal Overload',
      phase: 'Assault',
      type: 'Active',
      cost: 1,
      rule: {
        en: 'This Unit gains a +1 Modifier to all IMPACT Hit Rolls.',
        ko: '이 유닛은 모든 IMPACT Hit Roll에 +1 수정치를 얻는다.',
      },
    },
    {
      kind: 'rule',
      name: 'Metabolic Boost',
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
        en: 'Immediately after this Unit completes a successful Charge, resolve the IMPACT (1) 5+ effect.',
        ko: '이 유닛이 Charge에 성공한 직후, IMPACT (1) 5+ 효과를 해결한다.',
      },
    },
    {
      kind: 'weapon',
      name: 'Claws',
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
      pts: 10,
      for: 'Claws',
      ability: {
        kind: 'weapon',
        name: 'Shredding Claws',
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
        name: 'Adrenal Glands',
        phase: 'Any',
        type: 'Passive',
        cost: 0,
        rule: {
          en: "This Unit's Claws and Shredding Claws weapons gain PRECISION (2).",
          ko: '이 유닛의 Claws 및 Shredding Claws 무기는 PRECISION (2)를 얻는다.',
        },
      },
    },
  ],
}
