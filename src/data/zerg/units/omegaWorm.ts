import type { UnitCard } from '../../../types'

export const omegaWorm: UnitCard = {
  category: 'unit',
  id: 'Omega Worm',
  name: { en: 'Omega Worm', ko: '오메가 벌레' },
  isUnique: false,
  type: 'Other',
  stat: {
    shld: null,
    spd: null,
    eva: '-',
    arm: '5+',
    hp: 10,
    siz: 3,
  },
  tags: [{ name: "Kerrigan's Swarm" }, { name: 'Armoured' }, { name: 'Biological' }, { name: 'Ground' }],
  ranges: [{ inch: 6, alwaysShow: true }],
  baseSize: { shape: 'circle', diameterMm: 80 },
  squad: [{ modelMin: 1, modelMax: 1, supply: 0, pts: 0 }],
  abilities: [
    {
      kind: 'rule',
      id: 'Detection',
      name: { en: 'Detection', ko: '탐지' },
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'While Enemy Units are Within 6" of this Unit, they lose HIDDEN Status.',
        ko: '적 유닛이 이 유닛의 6인치 이내에 있는 동안, 해당 유닛은 은신 상태를 잃습니다.',
      },
    },
    {
      kind: 'rule',
      id: 'Source of Creep',
      name: { en: 'Source of Creep', ko: '점막 생성원' },
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'A Friendly or Enemy Ground Zerg Unit Within 6" of this Unit, counts as being ON CREEP.',
        ko: '이 유닛의 6인치 이내에 들어온 아군 또는 적 지상 저그 유닛은 점막 위에 있는 것으로 간주합니다.',
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
    {
      kind: 'rule',
      id: 'Omega Network',
      name: { en: 'Omega Network', ko: '오메가 망' },
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: "The base of the Omega Worm counts as an Entry Edge. Each Round, Friendly Units with a combined Supply cost of 2 or less may be Deployed via this Entry Edge. If a Friendly Leading model finishes a Move, Disengage, or Run action in base-to-base contact with the Omega Worm, the controlling player may remove that Unit from the battlefield and return it to Reserves.",
        ko: '오메가 벌레의 베이스는 진입 경계로 간주합니다. 매 라운드마다, 합산 인구수가 2 이하인 아군 유닛들은 이 진입 경계를 통해 전개할 수 있습니다. 만약 아군 대표 모형이 오메가 벌레와 베이스 접촉 상태에서 이동, 이탈 또는 질주 행동을 종료했다면, 조종 플레이어는 해당 유닛을 전장에서 제거하고 예비 병력으로 복귀시킬 수 있습니다.',
      },
    },
  ],
  upgrades: [],
}
