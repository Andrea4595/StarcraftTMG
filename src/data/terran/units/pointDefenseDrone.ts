import type { UnitCard } from '../../../types'

export const pointDefenseDrone: UnitCard = {
  category: 'unit',
  id: 'Point Defense Drone',
  name: { en: 'Point Defense Drone', ko: '국지 방어기' },
  isUnique: false,
  type: 'Other',
  stat: {
    shld: null,
    spd: null,
    eva: '6+',
    arm: '6+',
    hp: 3,
    siz: null,
  },
  tags: [{ name: "Raynor's Raiders" }, { name: 'Armoured' }, { name: 'Flying' }, { name: 'Mechanical' }],
  hasDisplacement: true,
  ranges: [{ inch: 4, alwaysShow: true }],
  baseSize: { shape: 'circle', diameterMm: 32 },
  squad: [{ modelMin: 1, modelMax: 1, supply: 0, pts: 0 }],
  abilities: [
    {
      kind: 'rule',
      id: 'Point Defense Laser',
      name: { en: 'Point Defense Laser', ko: '국지 방어기 레이저' },
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'When another Friendly Unit Within 4" is targeted by a Ranged Attack without the INSTANT keyword, remove up to 2 dice from the Attack Pool. Then remove this Unit from the battlefield.',
        ko: '4인치 이내의 다른 아군 유닛이 반응 불가 키워드가 없는 원거리 공격의 대상이 되었을 때, 공격 주사위를 최대 2개 제거합니다. 그 후 이 유닛을 전장에서 제거합니다.',
      },
    },
    {
      kind: 'rule',
      id: 'Gliding',
      name: { en: 'Gliding', ko: '활공' },
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'This model has DISPLACEMENT.',
        ko: '이 모형은 위치 변환 특성을 가집니다.',
      },
    },
    {
      kind: 'rule',
      id: 'Structure',
      name: { en: 'Structure', ko: '구조물' },
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'This Unit cannot be Activated in any Phase and cannot perform actions. Additionally, its Current Supply Value is treated as 0, and it can never Control or Contest Mission Markers, ignoring the standard Zero Supply Exception. This Unit cannot be a target of an ability, unless stated otherwise.',
        ko: '이 유닛은 어떤 단계에서도 활성화될 수 없으며 행동을 수행할 수 없습니다. 또한 현재 인구수는 0으로 간주되며, 일반적인 "보급 0 규칙"을 무시하고 임무 마커를 점령하거나 이를 두고 경합할 수 없습니다. 별도 언급이 없는 한, 이 유닛은 능력의 대상이 될 수 없습니다.',
      },
    },
  ],
  upgrades: [],
}
