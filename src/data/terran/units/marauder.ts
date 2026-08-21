import type { UnitCard } from '../../../types'

export const marauder: UnitCard = {
  category: 'unit',
  id: 'Marauder',
  name: { en: 'Marauder', ko: '불곰' },
  isUnique: false,
  type: 'Core',
  stat: {
    shld: null,
    spd: { move: 4, cohesion: 3 },
    eva: '6+',
    arm: '4+',
    hp: 5,
    siz: 2,
  },
  tags: [{ name: 'Armoured' }, { name: 'Biological' }, { name: 'Ground' }],
  squad: [
    { modelMin: 1, modelMax: 1, supply: 0, pts: 150 },
    { modelMin: 2, modelMax: 2, supply: 1, pts: 150 },
    { modelMin: 3, modelMax: 4, supply: 2, pts: 280 },
  ],
  abilities: [
    {
      kind: 'rule',
      id: 'Stimpack',
      name: { en: 'Stimpack', ko: '전투 자극제' },
      phase: 'Movement',
      type: 'Active',
      cost: 1,
      rule: {
        en: 'This Unit suffers NON-LETHAL DAMAGE (2). This Unit gains BUFF Speed (3). Additionally, its Quad K12 and all Close Combat Weapons gain PRECISION (2).',
        ko: '이 유닛은 논 리썰 데미지(2)를 받고 버프 스피드(3)를 받는다. 추가로 쿼드 K12와 모든 근접무기가 프리시전(2)을 갖는다.',
      },
    },
    {
      kind: 'weapon',
      id: 'Quad K12',
      name: { en: 'Quad K12', ko: '쿼드 K12' },
      phase: 'Assault',
      stat: {
        rng: 12,
        tgt: 'Ground',
        roa: 3,
        hit: '3+',
        surge: ['Armoured'],
        sDie: 'D3',
        dmg: 1,
        keyword: [{ name: 'PIERCE', suffix: 'Armoured (2)' }],
      },
    },
    {
      kind: 'rule',
      id: 'Concussive Shells',
      name: { en: 'Concussive Shells', ko: '충격탄' },
      phase: 'Assault',
      type: 'Reaction',
      cost: 1,
      rule: {
        en: 'When an Enemy declares a Charge against a Friendly Unit Within 8", that Enemy gains DEBUFF Speed (2).',
        ko: '이 유닛의 8" 이내의 아군 유닛에게 상대 유닛이 차지를 선언했을 경우, 그 유닛은 디버프 스피드(2)를 받는다.',
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
      pts: [20, 20, 30],
      ability: {
        kind: 'rule',
        id: 'Veteran of Tarsonis',
        name: { en: 'Veteran of Tarsonis', ko: '타소니스의 베테랑' },
        phase: 'Any',
        type: 'Passive',
        cost: 0,
        rule: {
          en: 'While this Unit is Within 3" of a Mission Marker, its Armour characteristic is increased by 1.',
          ko: '이 유닛이 미션 마커로부터 3" 이내에 있을 경우, 아머 능력치를 1 향상시킨다.',
        },
      },
    },
    {
      pts: [20, 20, 40],
      ability: {
        kind: 'rule',
        id: 'Kinetic Foam',
        name: { en: 'Kinetic Foam', ko: '동역학 충격 완화복' },
        phase: 'Any',
        type: 'Passive',
        cost: 0,
        rule: {
          en: "Increase this Unit's Hit Points characteristic by 1.",
          ko: '이 유닛의 HP를 1 올린다.',
        },
      },
    },
    {
      pts: [20, 20, 40],
      ability: {
        kind: 'rule',
        id: 'Laser Targeting Systems',
        name: { en: 'Laser Targeting Systems', ko: '레이저 조준 시스템' },
        phase: 'Assault',
        type: 'Passive',
        cost: 0,
        rule: {
          en: "This Unit's Quad K12 weapon gains LONG RANGE (16\").",
          ko: '이 유닛의 쿼드 K12는 롱 레인지(16")를 갖는다.',
        },
      },
    },
  ],
}
