import type { UnitCard } from '../../../types'

export const praetorGuardZealot: UnitCard = {
  category: 'unit',
  name: 'Praetor Guard (Zealot)',
  isUnique: true,
  type: 'Elite',
  stat: {
    shld: 3,
    spd: { move: 4, cohesion: 3 },
    eva: '5+',
    arm: '5+',
    hp: 4,
    siz: 2,
  },
  tags: [
    { name: 'Khalai' },
    { name: 'Biological' },
    { name: 'Light' },
    { name: 'Ground' },
    { name: 'Unique' },
  ],
  squad: [
    { modelMin: 1, modelMax: 1, supply: 1, pts: 280 },
    { modelMin: 2, modelMax: 3, supply: 2, pts: 280 },
  ],
  abilities: [
    {
      kind: 'rule',
      name: 'Shield Overcharge',
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'This Unit gains TOUGH (2) on the first Armour Roll each Round.',
        ko: '이 유닛은 매 라운드 첫 번째 Armour Roll에 TOUGH (2)를 얻는다.',
      },
    },
    {
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
    {
      kind: 'rule',
      name: 'Titan Killers',
      phase: 'Combat',
      type: 'Passive',
      cost: 0,
      rule: {
        en: "When this Unit makes a Close Combat Attack, and the target is Size 3 or larger, the weapon's Damage characteristic is treated as 2.",
        ko: '이 유닛이 근접 공격을 할 때, 대상이 Size 3 이상이라면 그 무기의 Damage 특성치를 2로 취급한다.',
      },
    },
    {
      kind: 'rule',
      name: 'Precognition',
      phase: 'Combat',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'This Unit is eligible to make an Evade roll against all attacks targeting it.',
        ko: '이 유닛은 자신을 대상으로 지정한 모든 공격에 대해 Evade roll을 할 수 있다.',
      },
    },
  ],
  upgrades: [],
}
