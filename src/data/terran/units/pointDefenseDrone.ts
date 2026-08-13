import type { UnitCard } from '../../../types'

export const pointDefenseDrone: UnitCard = {
  category: 'unit',
  name: 'Point Defense Drone',
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
  squad: [{ modelMin: 1, modelMax: 1, supply: 0, pts: 0 }],
  abilities: [
    {
      kind: 'rule',
      name: 'Point Defense Laser',
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'When another Friendly Unit Within 4" is targeted by a Ranged Attack without the INSTANT keyword, remove up to 2 dice from the Attack Pool. Then remove this Unit from the battlefield.',
        ko: '4" 이내의 다른 아군 유닛이 INSTANT 키워드가 없는 원거리 공격의 대상으로 지정되었을 때, Attack Pool에서 최대 2개의 주사위를 제거한다. 그 후 이 유닛을 전장에서 제거한다.',
      },
    },
    {
      kind: 'rule',
      name: 'Gliding',
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'This model has DISPLACEMENT.',
        ko: '이 모델은 DISPLACEMENT를 가진다.',
      },
    },
    {
      kind: 'rule',
      name: 'Structure',
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'This Unit cannot be Activated in any Phase and cannot perform actions. Additionally, its Current Supply Value is treated as 0, and it can never Control or Contest Mission Markers, ignoring the standard Zero Supply Exception. This Unit cannot be a target of an ability, unless stated otherwise.',
        ko: '이 유닛은 어떤 Phase에도 Activated될 수 없으며 행동을 수행할 수 없다. 추가로, 현재 Supply 수치는 0으로 취급하며, 표준 Zero Supply Exception을 무시하고 Mission Marker를 절대 점령하거나 쟁탈할 수 없다. 별도로 명시되지 않는 한, 이 유닛은 능력의 대상이 될 수 없다.',
      },
    },
  ],
  upgrades: [],
}
