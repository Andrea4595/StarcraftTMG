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
        ko: '이 유닛은 어떤 단계에서도 활성화될 수 없으며 행동을 수행할 수 없습니다. 또한 현재 인구수는 0으로 간주되며, 일반적인 "보급 0 규칙"을 무시하고 임무 마커를 점령하거나 이를 두고 경합할 수 없습니다. 별도 언급이 없는 한, 이 유닛은 능력의 대상이 될 수 없습니다.',
      },
    },
    {
      kind: 'rule',
      id: 'Have a Nice Day',
      name: { en: 'Have a Nice Day', ko: '좋은 하루 되시길' },
      phase: 'Assault',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'At the End of the Assault Phase, target each Unit Within 3" of this Unit (including Units with the Structure ability) suffers HITS 5 (1). If an affected Unit has the Structure ability, that Unit suffers an additional HITS 5 (1).',
        ko: '공세 단계 종료 시, 이 유닛의 3인치 이내에 들어온 각 유닛을 대상으로 지정합니다. 구조물 능력이 있는 유닛도 포함합니다. 각 대상 유닛은 명중 5(1) 효과를 받습니다. 영향을 받은 유닛에 구조물 능력이 있다면, 해당 유닛은 추가로 명중 5(1) 효과를 받습니다.',
      },
    },
  ],
  upgrades: [],
}
