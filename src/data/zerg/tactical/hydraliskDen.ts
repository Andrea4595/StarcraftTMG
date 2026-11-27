import type { TacticalCard } from '../../../types'

export const hydraliskDen: TacticalCard = {
  category: 'tactical',
  id: 'Hydralisk Den',
  name: { en: 'Hydralisk Den', ko: '히드라리스크 굴' },
  isUnique: false,
  gasPts: 30,
  resource: 1,
  slot: [{ unitType: 'Elite', count: 2 }],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Missile Attacks',
      name: { en: 'Missile Attacks', ko: '발사 공격' },
      phase: 'Assault',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Unit's first Ranged Weapon used gains PRECISION (1).",
        ko: '활성화된 유닛이 이번 단계에서 처음 사용하는 원거리 무기는 정밀(1) 특성을 얻습니다.',
      },
    },
  ],
}
