import type { UnitCard } from '../../../types'

export const medic: UnitCard = {
  category: 'unit',
  name: 'Medic',
  isUnique: false,
  type: 'Support',
  stat: {
    shld: null,
    spd: { move: 4, cohesion: 3 },
    eva: '5+',
    arm: '5+',
    hp: 2,
    siz: 2,
  },
  tags: [{ name: 'Biological' }, { name: 'Light' }, { name: 'Ground' }],
  squad: [
    { modelMin: 1, modelMax: 1, supply: 0, pts: 110 },
    { modelMin: 2, modelMax: 3, supply: 1, pts: 110 },
  ],
  abilities: [
    {
      kind: 'rule',
      name: 'Life Support',
      phase: 'Any',
      type: 'Reaction',
      cost: 1,
      rule: {
        en: 'Use when another Friendly Biological Unit suffers Damage Within 4". Reduce the Total Damage before allocation by 1 for each model in this Unit that is Within 4" of the damaged Unit.',
        ko: '4" 이내의 다른 아군 Biological 유닛이 데미지를 입었을 때 사용한다. 데미지를 입은 유닛으로부터 4" 이내에 있는 이 유닛의 모델 1개당, 배분 전 Total Damage를 1 감소시킨다.',
      },
    },
    {
      kind: 'rule',
      name: 'Restoration',
      phase: 'Any',
      type: 'Reaction',
      cost: 1,
      rule: {
        en: 'Use when a Friendly Unit Within 4" receives a DEBUFF. Remove all DEBUFFs from it.',
        ko: '4" 이내의 아군 유닛이 DEBUFF를 받았을 때 사용한다. 그 유닛에서 모든 DEBUFF를 제거한다.',
      },
    },
    {
      kind: 'rule',
      name: 'Medpack',
      phase: 'Movement',
      type: 'Active',
      cost: 1,
      rule: {
        en: 'Select another Friendly Biological Unit Within 4". Resolve the HEAL (X) effect for the targeted Unit, where X is the number of models in this Unit that are Within 4" of the target Unit.',
        ko: '4" 이내의 다른 아군 Biological 유닛 하나를 선택한다. 대상으로 지정된 유닛에 HEAL (X) 효과를 해결하며, X는 대상 유닛으로부터 4" 이내에 있는 이 유닛의 모델 수이다.',
      },
    },
    {
      kind: 'rule',
      name: 'Optical Flare',
      phase: 'Movement',
      type: 'Active',
      cost: 2,
      rule: {
        en: "Select one Enemy Unit Within 12\". Until the End of the Round, apply DEBUFF Range (4) to that Unit's Ranged Weapons. That Unit cannot benefit from LONG RANGE.",
        ko: '12" 이내의 적 유닛 하나를 선택한다. 라운드 종료 시까지, 그 유닛의 원거리 무기에 DEBUFF Range (4)를 적용한다. 그 유닛은 LONG RANGE의 이득을 받을 수 없다.',
      },
    },
    {
      kind: 'weapon',
      name: 'Strike',
      phase: 'Combat',
      stat: {
        rng: 'E',
        tgt: 'Ground',
        roa: 1,
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
      pts: 60,
      ability: {
        kind: 'rule',
        name: 'Advanced Medic Facilities',
        phase: 'Any',
        type: 'Passive',
        cost: 0,
        rule: {
          en: "This Unit's Supply Value counts as 0 when calculating the Supply Pool.",
          ko: 'Supply Pool을 계산할 때 이 유닛의 Supply 수치는 0으로 취급한다.',
        },
      },
    },
    {
      pts: 20,
      ability: {
        kind: 'rule',
        name: 'A-13 Flash Grenade Launcher',
        phase: 'Any',
        type: 'Passive',
        cost: 0,
        rule: {
          en: "Increase the Optical Flare special ability's Range to 16\".",
          ko: 'Optical Flare Special Ability의 Range를 16"로 증가시킨다.',
        },
      },
    },
    {
      pts: 30,
      ability: {
        kind: 'rule',
        name: 'Stabilizer Medpacks',
        phase: 'Any',
        type: 'Passive',
        cost: 0,
        rule: {
          en: "When this Unit resolves a Life Support or Medpack ability, treat it as having 1 additional model Within Range for calculating that ability's effects.",
          ko: '이 유닛이 Life Support 또는 Medpack 능력을 해결할 때, 해당 능력의 효과를 계산할 때 Range 이내에 모델 1개가 추가로 있는 것으로 취급한다.',
        },
      },
    },
  ],
}
