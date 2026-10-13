import type { UnitCard } from '../../../types'

export const sabotageDrone: UnitCard = {
  category: 'unit',
  id: 'Sabotage Drone',
  name: { en: 'Sabotage Drone', ko: '파괴 드론' },
  isUnique: false,
  wave: 3,
  type: 'Other',
  stat: {
    shld: null,
    spd: null,
    eva: '6+',
    arm: '6+',
    hp: 3,
    siz: 1,
  },
  tags: [{ name: 'Armoured' }, { name: 'Mechanical' }, { name: 'Ground' }],
  ranges: [{ inch: 3, alwaysShow: true }],
  baseSize: { shape: 'circle', diameterMm: 40 },
  squad: [{ modelMin: 1, modelMax: 1, supply: 0, pts: 0 }],
  abilities: [
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
    {
      kind: 'rule',
      id: 'Have a Nice Day',
      name: { en: 'Have a Nice Day', ko: '좋은 하루 되세요' },
      phase: 'Assault',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'At the End of the Assault Phase, target each Unit Within 3" of this Unit (including Units with the Structure ability) suffers HITS 5 (1). If an affected Unit has the Structure ability, that Unit suffers an additional HITS 5 (1).',
        ko: '어썰트 페이즈 종료 시, 이 유닛의 3" 이내의 각 유닛(구조물 능력을 지닌 유닛 포함)은 힛 5(1)를 받는다. 영향을 받은 유닛이 구조물 능력을 지녔다면, 그 유닛은 추가로 힛 5(1)를 받는다.',
      },
    },
  ],
  upgrades: [],
}
