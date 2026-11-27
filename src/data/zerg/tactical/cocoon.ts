import type { TacticalCard } from '../../../types'

export const cocoon: TacticalCard = {
  category: 'tactical',
  id: 'Cocoon',
  name: { en: 'Cocoon', ko: '고치' },
  isUnique: true,
  wave: 2,
  gasPts: 30,
  resource: 0,
  slot: [{ unitType: 'Elite', count: 1 }],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Spawn Larva',
      name: { en: 'Spawn Larva', ko: '애벌레 생성' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'The active Friendly non-Unique Biological Unit with a Size Characteristic of 1 resolve the RESPAWN (2) effect.',
        ko: '활성화된 아군 유닛 중 유일이 아닌 생체 유닛이며 크기 특성이 1인 유닛은 재생성(2) 효과를 수행합니다.',
      },
    },
    {
      kind: 'rule',
      id: 'Ravager Morph',
      name: { en: 'Ravager Morph', ko: '궤멸충 변태' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Once per Game. The active Friendly Roach Unit performs MORPH (Ravager) 1.',
        ko: '게임당 1회. 활성화된 아군 바퀴 유닛은 변형(궤멸충) 1을 수행합니다.',
      },
      // summonsUnitId는 일부러 안 쓴다 - 로스터에 궤멸충을 자동으로 추가하면 안 되고(바퀴를 변환하는
      // 것일 뿐 별도 슬롯이 아니다), 시뮬레이터 상호작용 정보만 필요하기 때문
      simulatorFeature: {
        kind: 'summonUnit',
        unitId: 'Ravager',
        placement: { rangeType: 'contact' },
        replacesSelfModel: true,
      },
    },
  ],
}
