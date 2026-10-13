import type { UnitCard } from '../../../types'

export const holoDecoy: UnitCard = {
  category: 'unit',
  id: 'Holo Decoy',
  name: { en: 'Holo Decoy', ko: '홀로그램 미끼' },
  isUnique: false,
  type: 'Other',
  stat: {
    shld: null,
    spd: { move: 7, cohesion: 3 },
    eva: '6+',
    arm: '6+',
    hp: 1,
    siz: 2,
  },
  tags: [{ name: 'Biological' }, { name: 'Psionic' }, { name: 'Ground' }],
  ranges: [{ inch: 4, alwaysShow: true }],
  baseSize: { shape: 'circle', diameterMm: 40 },
  squad: [{ modelMin: 1, modelMax: 1, supply: 0, pts: 0 }],
  abilities: [
    {
      kind: 'rule',
      id: 'Lethal Hologram',
      name: { en: 'Lethal Hologram', ko: '치명적인 홀로그램' },
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'All Weapons of Friendly Units targeting an Enemy Unit Within 4" of this Unit gain PRECISION (1).',
        ko: '이 유닛의 4" 이내의 적 유닛을 목표로 하는 아군 유닛의 모든 무기는 프리시전(1)을 얻는다.',
      },
    },
    {
      kind: 'rule',
      id: 'Timed Life',
      name: { en: 'Timed Life', ko: '한시적 생명' },
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'Remove this Unit at the End of the Round.',
        ko: '라운드 종료 시 이 유닛을 제거한다.',
      },
    },
    {
      kind: 'rule',
      id: 'Decoy',
      name: { en: 'Decoy', ko: '미끼' },
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'This Unit is never Engaged. It cannot Engage Enemy Units, cannot be Engaged by Enemy Units and cannot perform a Charge Action. This Unit cannot be the target of an ability, unless stated otherwise. It can never Control or Contest Mission Markers.',
        ko: '이 유닛은 절대 인게이지 상태가 되지 않는다. 적 유닛과 인게이지할 수 없고, 적 유닛에게 인게이지될 수 없으며, 차지 액션을 할 수 없다. 별도로 언급이 있지 않는 한, 이 유닛은 다른 능력의 대상이 될 수 없다. 절대 미션 마커를 점령하거나 경쟁할 수 없다.',
      },
    },
    {
      kind: 'rule',
      id: 'Surprise!',
      name: { en: 'Surprise!', ko: '깜짝이야!' },
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'At the End of the Round, you can set a Friendly Nova Stealth Mode or Nova Assault Mode in Coherency with this Unit.',
        ko: '라운드 종료 시, 아군 노바 [은신 모드] 또는 노바 [강습 모드]를 이 유닛과 코헤런시가 유지되도록 배치할 수 있다.',
      },
    },
  ],
  upgrades: [],
}
