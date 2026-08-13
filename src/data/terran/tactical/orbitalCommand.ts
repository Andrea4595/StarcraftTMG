import type { TacticalCard } from '../../../types'

export const orbitalCommand: TacticalCard = {
  category: 'tactical',
  name: 'Orbital Command',
  isUnique: true,
  gasPts: 25,
  resource: 1,
  slot: [{ unitType: 'Core', count: 1 }],
  cardAbilities: [
    {
      kind: 'rule',
      name: 'ComSat Station',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: "Select one table edge that is not a player's Entry Edge. Until the End of the Round, Enemy Units cannot Deploy from that edge.",
        ko: '플레이어의 Entry Edge가 아닌 테이블 가장자리 하나를 선택한다. 라운드 종료 시까지, 적 유닛은 그 가장자리에서 Deploy할 수 없다.',
      },
    },
    {
      kind: 'rule',
      name: 'Scanner Sweep',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Set a Faction Indicator anywhere on the battlefield. While Enemy Units are Within 6" of this Faction Indicator, they lose HIDDEN Status.',
        ko: 'Faction Indicator를 전장의 어디든 놓는다. 적 유닛이 이 Faction Indicator로부터 6" 이내에 있는 동안, 그 유닛은 HIDDEN Status를 잃는다.',
      },
    },
  ],
}
