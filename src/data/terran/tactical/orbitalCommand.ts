import type { TacticalCard } from '../../../types'

export const orbitalCommand: TacticalCard = {
  category: 'tactical',
  id: 'Orbital Command',
  name: { en: 'Orbital Command', ko: '궤도 사령부' },
  isUnique: true,
  gasPts: 25,
  resource: 1,
  slot: [{ unitType: 'Core', count: 1 }],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'ComSat Station',
      name: { en: 'ComSat Station', ko: '통신 위성 중계소' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: "Select one table edge that is not a player's Entry Edge. Until the End of the Round, Enemy Units cannot Deploy from that edge.",
        ko: '플레이어의 진입 경계가 아닌 테이블 가장자리 1개를 선택합니다. 라운드 종료 시까지, 적 유닛은 해당 가장자리에서 전개할 수 없습니다.',
      },
    },
    {
      kind: 'rule',
      id: 'Scanner Sweep',
      name: { en: 'Scanner Sweep', ko: '스캐너 탐색' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Set a Faction Indicator anywhere on the battlefield. While Enemy Units are Within 6" of this Faction Indicator, they lose HIDDEN Status.',
        ko: '전장 아무 위치에 진영 표시 마커 1개를 놓습니다. 적 유닛이 해당 진영 표시 마커의 6인치 이내에 있는 동안, 은신 상태를 잃습니다.',
      },
      placesTokenId: 'Faction Marker',
      simulatorFeature: {
        kind: 'placeToken',
        tokenId: 'Faction Marker',
        placement: { rangeType: 'anywhere' },
      },
    },
  ],
}
