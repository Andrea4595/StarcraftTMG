import type { UnitCard } from '../../../types'

export const kerriganSwarmRaptorZergling: UnitCard = {
  category: 'unit',
  name: 'Kerrigan Swarm Raptor (Zergling)',
  isUnique: true,
  type: 'Elite',
  stat: {
    shld: null,
    spd: { move: 5, cohesion: 4 },
    eva: '4+',
    arm: '5+',
    hp: 2,
    siz: 1,
  },
  tags: [
    { name: "Kerrigan's Swarm" },
    { name: 'Biological' },
    { name: 'Light' },
    { name: 'Ground' },
    { name: 'Unique' },
  ],
  squad: [
    { modelMin: 1, modelMax: 3, supply: 0, pts: 250 },
    { modelMin: 4, modelMax: 6, supply: 1, pts: 250 },
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
      name: 'Leap',
      phase: 'Assault',
      type: 'Active',
      cost: 1,
      rule: {
        en: 'When determining Charge Distance for this Unit, add 2 to the Charge Distance.',
        ko: '이 유닛의 Charge Distance를 결정할 때, Charge Distance에 2를 더한다.',
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
      name: 'Devastating Charge',
      phase: 'Assault',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'Immediately after this Unit completes a successful Charge, resolve the IMPACT (2) 5+ effect.',
        ko: '이 유닛이 Charge에 성공한 직후, IMPACT (2) 5+ 효과를 해결한다.',
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
        hit: '3+',
        surge: ['Light', 'Armoured'],
        sDie: 'D6',
        dmg: 1,
        keyword: [{ name: 'INSTANT' }],
      },
    },
  ],
  upgrades: [],
}
