import type { TacticalCard } from '../../../types'

export const defilerMound: TacticalCard = {
  category: 'tactical',
  id: 'Defiler Mound',
  name: { en: 'Defiler Mound', ko: '파멸충 둥지' },
  isUnique: true,
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
        ko: '활성화된 아군 유닛에 팩션 마커를 둔다. 어썰트 페이즈 종료 시, 표시된 유닛과 인게이지된 모든 적 생체 유닛은 논 리썰 데미지(2)를 받는다.',
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
        ko: '활성화중인 인게이지 상태가 아닌 지상 유닛을, 액션을 하는 것 대신 리저브로 되돌린다.',
      },
    },
  ],
}
