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
        ko: '플레이어의 엔트리 엣지가 아닌 전장 가장자리를 하나 고른다. 라운드 종료까지 상대는 그 가장자리에서 배치할 수 없다.',
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
        ko: '팩션 마커를 전장에 둔다. 그 팩션 마커의 6" 이내의 모든 적은 은폐 상태를 잃는다.',
      },
    },
  ],
}
