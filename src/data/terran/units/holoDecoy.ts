import type { UnitCard } from '../../../types'

export const holoDecoy: UnitCard = {
  category: 'unit',
  id: 'Holo Decoy',
  name: { en: 'Holo Decoy', ko: '홀로그램 분신' },
  isUnique: false,
  wave: 3,
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
      name: { en: 'Lethal Hologram', ko: '살상용 분신' },
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'All Weapons of Friendly Units targeting an Enemy Unit Within 4" of this Unit gain PRECISION (1).',
        ko: '이 유닛의 4인치 이내에 들어온 적 유닛을 대상으로 하는 아군 유닛의 모든 무기는 정밀(1) 특성을 얻습니다.',
      },
    },
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
      id: 'Decoy',
      name: { en: 'Decoy', ko: '분신' },
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'This Unit is never Engaged. It cannot Engage Enemy Units, cannot be Engaged by Enemy Units and cannot perform a Charge Action. This Unit cannot be the target of an ability, unless stated otherwise. It can never Control or Contest Mission Markers.',
        ko: '이 유닛은 절대 교전 중인 상태가 되지 않습니다. 적 유닛과 교전할 수 없고, 적 유닛도 이 유닛과 교전할 수 없으며, 돌격 행동을 수행할 수 없습니다. 별도 언급이 없는 한, 이 유닛은 능력의 대상이 될 수 없습니다. 또한 임무 마커를 점령하거나 이를 두고 경합할 수 없습니다.',
      },
    },
    {
      kind: 'rule',
      id: 'Surprise!',
      name: { en: 'Surprise!', ko: '까꿍!' },
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'At the End of the Round, you can set a Friendly Nova Stealth Mode or Nova Assault Mode in Coherency with this Unit.',
        ko: '라운드 종료 시, 아군 노바 은신 모드 또는 노바 돌격 모드 유닛 1개를 이 유닛과 대형을 유지한 상태로 놓을 수 있습니다.',
      },
    },
  ],
  upgrades: [],
}
