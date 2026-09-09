import type { TacticalCard } from '../../../types'

export const cocoon: TacticalCard = {
  category: 'tactical',
  id: 'Cocoon',
  name: { en: 'Cocoon', ko: '고치' },
  isUnique: true,
  gasPts: 0,
  resource: 0,
  slot: [{ unitType: 'Elite', count: 1 }],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Spawn Larva',
      name: { en: 'Spawn Larva', ko: '유충 생성' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'The active Friendly non-Unique Biological Unit with a Size Characteristic of 1 resolve the RESPAWN (2) effect.',
        ko: '사이즈 특성이 1인, 활성화된 아군 비유니크 생체 유닛은 리스폰(2)한다.',
      },
    },
    {
      kind: 'rule',
      id: 'Ravager Morph',
      name: { en: 'Ravager Morph', ko: '궤멸충 변화' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Once per Game. The active Friendly Roach Unit performs MORPH (Ravager) 1.',
        ko: '게임당 한번. 활성화된 아군 바퀴 유닛은 변화(궤멸충) 1을 수행한다.',
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
