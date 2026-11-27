import type { Ability, UnitCard, WeaponProfile } from '../../../types'

/**
 * 리버가 소환(SUMMON)하는 스캐럽 3종. 스탯/능력 구성이 거의 같고 이동 속도와 근접 무기만 달라
 * 공통 부분을 한 곳에서 만든다.
 */
const scarabCommonAbilities: Ability[] = [
  {
    kind: 'rule',
    id: 'Timed Life',
    name: { en: 'Timed Life', ko: '시한부 생명' },
    phase: 'Any',
    type: 'Passive',
    cost: 0,
    rule: {
      en: 'Remove this Unit at the End of the Round.',
      ko: '라운드 종료 시 이 유닛을 제거합니다.',
    },
  },
  {
    kind: 'rule',
    id: 'Nimble',
    name: { en: 'Nimble', ko: '날렵함' },
    phase: 'Any',
    type: 'Passive',
    cost: 0,
    rule: {
      en: 'This Unit is always eligible to use Evade Rolls against Attacks or Special Abilities.',
      ko: '이 유닛은 공격이나 특수 능력에 대해 항상 회피 굴림을 할 수 있습니다.',
    },
  },
  {
    kind: 'rule',
    id: 'Proximity Detonation',
    name: { en: 'Proximity Detonation', ko: '근접 폭발' },
    phase: 'Assault',
    type: 'Passive',
    cost: 0,
    rule: {
      en: 'When an Enemy Ground Unit ends its Activation Within 2" of this Unit. This Unit immediately performs a Close Combat Attack against that Enemy Unit. Immediately after this Close Combat Attack is resolved, remove this Unit from the battlefield.',
      ko: '적 지상 유닛이 이 유닛의 2인치 이내에서 활성화를 끝낼 때 사용합니다. 이 유닛은 즉시 해당 적 유닛을 대상으로 근접전 공격을 수행합니다. 이 근접전 공격을 처리한 직후, 이 유닛을 전장에서 제거합니다.',
    },
  },
  {
    kind: 'rule',
    id: 'Explosive Charge',
    name: { en: 'Explosive Charge', ko: '폭발 돌격' },
    phase: 'Assault',
    type: 'Passive',
    cost: 0,
    rule: {
      en: 'Immediately after this Unit completes a successful Charge, it performs a Close Combat Attack against one of the targets of that Charge. Immediately after this Close Combat Attack is resolved, remove this Unit from the battlefield.',
      ko: '이 유닛이 돌격에 성공한 직후, 해당 돌격의 대상 중 하나를 대상으로 근접전 공격을 수행합니다. 이 근접전 공격을 처리한 직후, 이 유닛을 전장에서 제거합니다.',
    },
  },
]

function makeScarab(id: string, ko: string, move: number, weapon: WeaponProfile): UnitCard {
  return {
    category: 'unit',
    id,
    name: { en: id, ko },
    isUnique: false,
    wave: 4,
    type: 'Other',
    stat: {
      shld: 1,
      spd: { move, cohesion: 3 },
      eva: '3+',
      arm: '6+',
      hp: 2,
      siz: 1,
    },
    tags: [{ name: 'Psionic' }, { name: 'Ground' }],
    baseSize: { shape: 'circle', diameterMm: 25 },
    squad: [{ modelMin: 1, modelMax: 1, supply: 0, pts: 0 }],
    abilities: [...scarabCommonAbilities, weapon],
    upgrades: [],
  }
}

export const scarab = makeScarab('Scarab', '스캐럽', 3, {
  kind: 'weapon',
  id: 'Scarab Detonation',
  name: { en: 'Scarab Detonation', ko: '스캐럽 폭발' },
  phase: 'Combat',
  stat: {
    rng: 'E',
    tgt: 'Ground',
    roa: 12,
    hit: '2+',
    surge: [],
    sDie: '-',
    dmg: 1,
    keyword: [{ name: 'CRITICAL HIT', suffix: '(2)' }],
  },
})

export const solariteScarab = makeScarab('Solarite Scarab', '태양석 스캐럽', 5, {
  kind: 'weapon',
  id: 'Solarite Blast',
  name: { en: 'Solarite Blast', ko: '태양석 폭발' },
  phase: 'Combat',
  stat: {
    rng: 'E',
    tgt: 'Ground',
    roa: 5,
    hit: '2+',
    surge: [],
    sDie: '-',
    dmg: 2,
    keyword: [{ name: 'CRITICAL HIT', suffix: '(2)' }, { name: 'INSTANT' }],
  },
})

export const phasingScarab = makeScarab('Phasing Scarab', '위상 스캐럽', 3, {
  kind: 'weapon',
  id: 'Phase Blast',
  name: { en: 'Phase Blast', ko: '위상 폭발' },
  phase: 'Combat',
  stat: {
    rng: 'E',
    tgt: 'Ground',
    roa: 6,
    hit: '2+',
    surge: ['Armoured'],
    sDie: 'D3',
    dmg: 1,
    keyword: [{ name: 'CRITICAL HIT', suffix: '(2)' }, { name: 'PIERCE', suffix: 'Armoured (2)' }],
  },
})
