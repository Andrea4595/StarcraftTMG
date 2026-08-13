import type { UnitCard } from '../../../types'

export const omegaWorm: UnitCard = {
  category: 'unit',
  name: 'Omega Worm',
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
      name: 'Detection',
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'While Enemy Units are Within 6" of this Unit, they lose HIDDEN Status.',
        ko: '적 유닛이 이 유닛의 6" 이내에 있는 동안, 그 유닛은 HIDDEN Status를 잃는다.',
      },
    },
    {
      kind: 'rule',
      name: 'Source of Creep',
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'A Friendly or Enemy Ground Zerg Unit Within 6" of this Unit, counts as being ON CREEP.',
        ko: '이 유닛의 6" 이내에 있는 아군 또는 적 지상 Zerg 유닛은 ON CREEP인 것으로 취급한다.',
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
        ko: '이 유닛은 어떤 Phase에도 Activated될 수 없으며 action을 수행할 수 없다. 또한 이 유닛의 Current Supply Value는 0으로 취급하며, 표준 Zero Supply Exception을 무시하고 Mission Markers를 절대 점령하거나 쟁탈할 수 없다. 달리 명시되지 않는 한, 이 유닛은 능력의 대상이 될 수 없다.',
      },
    },
    {
      kind: 'rule',
      name: 'Omega Network',
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: "The base of the Omega Worm counts as an Entry Edge. Each Round, Friendly Units with a combined Supply cost of 2 or less may be Deployed via this Entry Edge. If a Friendly Leading model finishes a Move, Disengage, or Run action in base-to-base contact with the Omega Worm, the controlling player may remove that Unit from the battlefield and return it to Reserves.",
        ko: 'Omega Worm의 베이스는 Entry Edge로 취급한다. 각 라운드마다, 합계 Supply 비용이 2 이하인 아군 유닛을 이 Entry Edge를 통해 Deploy할 수 있다. 아군 Leading 모델이 Omega Worm과 base-to-base 접촉한 상태로 Move, Disengage, Run action을 마쳤다면, 소유 플레이어는 그 유닛을 전장에서 제거하고 Reserves로 되돌릴 수 있다.',
      },
    },
  ],
  upgrades: [],
}
