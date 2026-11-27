import type { TacticalCard } from '../../../types'

export const defilerMound: TacticalCard = {
  category: 'tactical',
  id: 'Defiler Mound',
  name: { en: 'Defiler Mound', ko: '파멸충 언덕' },
  isUnique: true,
  wave: 3,
  gasPts: 35,
  resource: 1,
  slot: [
    { unitType: 'Elite', count: 1 },
    { unitType: 'Support', count: 1 },
  ],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Poisonous Essence',
      name: { en: 'Poisonous Essence', ko: '독성 정수' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Set a Faction Indicator on the active Friendly Unit. At the end of the Assault Phase, all Biological Enemy Units Engaged with the marked Unit suffer NON-LETHAL DAMAGE (2).',
        ko: '활성화된 아군 유닛 옆에 진영 표시 마커 1개를 놓습니다. 공세 단계 종료 시, 표시된 유닛과 교전 중인 모든 적 생체 유닛은 비살상 피해(2)를 받습니다.',
      },
      placesTokenId: 'Faction Marker',
      simulatorFeature: {
        kind: 'placeToken',
        tokenId: 'Faction Marker',
        placement: { rangeType: 'contact' },
      },
    },
    {
      kind: 'rule',
      id: 'Tunnel Network',
      name: { en: 'Tunnel Network', ko: '땅굴망' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'The active, Unengaged Ground Unit is returned to Reserves instead of performing an action.',
        ko: '활성화된 교전 중이 아닌 지상 유닛은 행동을 수행하는 대신 예비 병력으로 복귀합니다.',
      },
    },
  ],
}
