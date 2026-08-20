import type { UnitCard } from '../../../types'

export const omegaWorm: UnitCard = {
  category: 'unit',
  id: 'Omega Worm',
  name: { en: 'Omega Worm', ko: 'Omega Worm' },
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
  squad: [{ modelMin: 1, modelMax: 1, supply: 0, pts: 0 }],
  abilities: [
    {
      kind: 'rule',
      id: 'Detection',
      name: { en: 'Detection', ko: 'Detection' },
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'While Enemy Units are Within 6" of this Unit, they lose HIDDEN Status.',
        ko: '적 유닛은 이 유닛의 6" 안에 있는 동안 은폐 상태를 잃는다.',
      },
    },
    {
      kind: 'rule',
      id: 'Source of Creep',
      name: { en: 'Source of Creep', ko: 'Source of Creep' },
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'A Friendly or Enemy Ground Zerg Unit Within 6" of this Unit, counts as being ON CREEP.',
        ko: '다른 6" 이내에 있는 적과 아군의 지상 저그 유닛은 점막 위에 있는 것으로 친다.',
      },
    },
    {
      kind: 'rule',
      id: 'Structure',
      name: { en: 'Structure', ko: 'Structure' },
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'This Unit cannot be Activated in any Phase and cannot perform actions. Additionally, its Current Supply Value is treated as 0, and it can never Control or Contest Mission Markers, ignoring the standard Zero Supply Exception. This Unit cannot be a target of an ability, unless stated otherwise.',
        ko: '이 유닛은 어떤 페이즈에도 활성화될 수 없고, 어떤 액션도 할 수 없다. 서플라이 값은 0으로 취급하지만 서플라이 값이 0인 유닛의 점령, 경쟁 규칙은 적용되지 않는다. 이 유닛은 점령이나 경쟁할 수 없고 다른 언급이 있지 않는 한 다른 능력의 대상이 될 수 없다.',
      },
    },
    {
      kind: 'rule',
      id: 'Omega Network',
      name: { en: 'Omega Network', ko: 'Omega Network' },
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: "The base of the Omega Worm counts as an Entry Edge. Each Round, Friendly Units with a combined Supply cost of 2 or less may be Deployed via this Entry Edge. If a Friendly Leading model finishes a Move, Disengage, or Run action in base-to-base contact with the Omega Worm, the controlling player may remove that Unit from the battlefield and return it to Reserves.",
        ko: '오메가 벌레의 베이스를 엔트리 엣지로 취급한다. 매 라운드마다 최대 서플라이 값 2까지의 아군 리저브 유닛을 이 엔트리 엣지에서 배치할 수 있다. 만약 이동, 질주, 이탈하려는 아군 유닛의 리딩 모델이 오메가 벌레와 베이스 접촉한 상태로 그 이동을 마친다면, 그 유닛을 조종하는 플레이어는 그 유닛을 전장에서 제거하고 리저브 상태로 되돌릴 수 있다.',
      },
    },
  ],
  upgrades: [],
}
