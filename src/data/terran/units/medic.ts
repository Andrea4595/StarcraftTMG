import type { UnitCard } from '../../../types'

export const medic: UnitCard = {
  category: 'unit',
  id: 'Medic',
  name: { en: 'Medic', ko: '의무관' },
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
  baseSize: { shape: 'circle', diameterMm: 32 },
  squad: [
    { modelMin: 1, modelMax: 1, supply: 0, pts: 110 },
    { modelMin: 2, modelMax: 3, supply: 1, pts: 110 },
  ],
  abilities: [
    {
      kind: 'rule',
      id: 'Life Support',
      name: { en: 'Life Support', ko: '연명처치' },
      phase: 'Any',
      type: 'Reaction',
      cost: 1,
      rule: {
        en: 'Use when another Friendly Biological Unit suffers Damage Within 4". Reduce the Total Damage before allocation by 1 for each model in this Unit that is Within 4" of the damaged Unit.',
        ko: '4" 이내에서 데미지를 입은 아군 생체 유닛 하나를 선택한다. 그 유닛의 모델에 배분하기 전의 총 데미지를, 대상 유닛으로부터 4" 이내에 있는 이 유닛의 모델 수만큼 줄인다.',
      },
    },
    {
      kind: 'rule',
      id: 'Restoration',
      name: { en: 'Restoration', ko: '회복' },
      phase: 'Any',
      type: 'Reaction',
      cost: 1,
      rule: {
        en: 'Use when a Friendly Unit Within 4" receives a DEBUFF. Remove all DEBUFFs from it.',
        ko: '4" 이내에서 디버프를 받은 아군 유닛을 고른다. 그 유닛이 받은 모든 디버프를 제거한다.',
      },
    },
    {
      kind: 'rule',
      id: 'Medpack',
      name: { en: 'Medpack', ko: '의료 팩' },
      phase: 'Movement',
      type: 'Active',
      cost: 1,
      rule: {
        en: 'Select another Friendly Biological Unit Within 4". Resolve the HEAL (X) effect for the targeted Unit, where X is the number of models in this Unit that are Within 4" of the target Unit.',
        ko: '이 유닛의 4" 이내의 다른 아군 생체 유닛 하나를 선택한다. 치유(X)를 적용한다. 이때 X값은 대상 유닛으로부터 4" 이내에 있는 이 유닛의 모델 수만큼이다.',
      },
    },
    {
      kind: 'rule',
      id: 'Optical Flare',
      name: { en: 'Optical Flare', ko: '광학 섬광탄' },
      phase: 'Movement',
      type: 'Active',
      cost: 2,
      rule: {
        en: "Select one Enemy Unit Within 12\". Until the End of the Round, apply DEBUFF Range (4) to that Unit's Ranged Weapons. That Unit cannot benefit from LONG RANGE.",
        ko: '이 유닛의 12" 이내에 있는 적 유닛 하나를 고른다. 라운드 종료까지 그 유닛의 사격 무기는 디버프 레인지(4)를 갖고, 롱 레인지 능력을 사용할 수 없게 된다.',
      },
    },
    {
      kind: 'weapon',
      id: 'Strike',
      name: { en: 'Strike', ko: '타격' },
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
        id: 'Advanced Medic Facilities',
        name: { en: 'Advanced Medic Facilities', ko: '고급 의무관 시설' },
        phase: 'Any',
        type: 'Passive',
        cost: 0,
        rule: {
          en: "This Unit's Supply Value counts as 0 when calculating the Supply Pool.",
          ko: '이 유닛의 서플라이 값은 서플라이 풀을 계산할 때 0으로 취급한다.',
        },
      },
    },
    {
      pts: 20,
      ability: {
        kind: 'rule',
        id: 'A-13 Flash Grenade Launcher',
        name: { en: 'A-13 Flash Grenade Launcher', ko: 'A-13 섬광탄 발사기' },
        phase: 'Any',
        type: 'Passive',
        cost: 0,
        enhances: ['Optical Flare'],
        rule: {
          en: "Increase the Optical Flare special ability's Range to 16\".",
          ko: '광학 섬광탄의 사용 범위를 16"로 늘린다.',
        },
      },
    },
    {
      pts: 30,
      ability: {
        kind: 'rule',
        id: 'Stabilizer Medpacks',
        name: { en: 'Stabilizer Medpacks', ko: '전투 안정제' },
        phase: 'Any',
        type: 'Passive',
        cost: 0,
        enhances: ['Life Support', 'Medpack'],
        rule: {
          en: "When this Unit resolves a Life Support or Medpack ability, treat it as having 1 additional model Within Range for calculating that ability's effects.",
          ko: '이 유닛이 연명처치나 의료 팩을 사용할 때, 이 유닛의 모델 수를 1개 더 많은 것으로 친다.',
        },
      },
    },
  ],
}
