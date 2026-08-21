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
        ko: '이 유닛의 4" 이내의 다른 아군 유닛이 인스턴트 공격이 아닌 사격의 대상이 되었을 때, 어택 풀에서 주사위를 최대 2개까지 지운다. 그 후 이 유닛을 전장에서 제거한다.',
      },
    },
    {
      kind: 'rule',
      id: 'Gliding',
      name: { en: 'Gliding', ko: '부유체' },
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'This model has DISPLACEMENT.',
        ko: '이 유닛은 변위를 지닌다.',
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
        ko: '이 유닛은 어떤 페이즈에도 활성화될 수 없고 어떤 액션도 할 수 없다. 서플라이 값은 0으로 취급하지만, 서플라이 값이 0인 유닛의 점령·경쟁 예외 규칙은 적용되지 않아 절대 점령하거나 경쟁할 수 없다. 별도로 언급이 있지 않는 한, 이 유닛은 다른 능력의 대상이 될 수 없다.',
      },
    },
  ],
  upgrades: [],
}
