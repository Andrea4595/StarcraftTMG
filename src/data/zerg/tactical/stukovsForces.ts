import type { TacticalCard } from '../../../types'

export const stukovsForces: TacticalCard = {
  category: 'tactical',
  id: "Stukov's Forces",
  name: { en: "Stukov's Forces", ko: '스투코프의 군대' },
  isUnique: true,
  requiredCardGroup: 'Virus',
  wave: 4,
  resource: 1,
  slot: [
    { unitType: 'Hero', count: 1 },
    { unitType: 'Elite', count: 2 },
    { unitType: 'Core', count: 4 },
  ],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Ashes of the UED',
      name: { en: 'Ashes of the UED', ko: 'UED의 잔재' },
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      // 테란 유닛을 그대로 편입하는 로직은 만들지 않는다. 편입 가능한 유닛(감염된 공성 전차/골리앗 등)은
      // 별도 유닛 프로필로 제공되기 때문에, 이 능력은 규칙 텍스트로만 보여준다.
      rule: {
        en: "During Army Building, you may include Units with the Terran Faction Tag and both Ground and Mechanical Combat Tags in your army. Those Units gain the Infested Combat Tag. Treat any CP cost for those Units' Special Abilities as BM. These Units cannot gain the BURROWED Status.",
        ko: '아미 구성 시, 테란 팩션 태그와 지상, 기계 전투 태그를 모두 가진 유닛을 아미에 넣을 수 있다. 그 유닛들은 감염 전투 태그를 얻는다. 그 유닛들의 특수능력 CP 비용은 BM으로 취급한다. 그 유닛들은 잠복 상태를 얻을 수 없다.',
      },
    },
    {
      kind: 'rule',
      id: 'Infestation',
      name: { en: 'Infestation', ko: '감염' },
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'During Army Building, select exactly one Virus Card and add it to your Army List, paying its listed cost (if any).',
        ko: '아미 구성 시, 바이러스 카드 중 하나를 선택해 아미에 넣는다. (그 카드가 자원을 소모한다면 그만큼 소모한다)',
      },
    },
    {
      kind: 'rule',
      id: 'Hostile Incubation',
      name: { en: 'Hostile Incubation', ko: '적대적 배양' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'If there is no Friendly Infested Missile Turret on the battlefield, set a Friendly Infested Missile Turret Unit anywhere on the GROUND LEVEL of the battlefield more than 10" away from any Enemy model. This Round, the Missile Turret is not eligible to use its Special Abilities (excluding Structure).',
        ko: '전장에 아군 감염된 미사일 포탑이 없다면, 모든 적 모델로부터 10" 이상 떨어진 전장의 지면 아무곳에 아군 감염된 미사일 포탑을 배치한다. 그 라운드 동안 미사일 포탑은 특수능력을 사용할 수 없다. (구조물 규칙은 제외한다)',
      },
      summonsUnitId: 'Infested Missile Turret',
      simulatorFeature: {
        kind: 'summonUnit',
        unitId: 'Infested Missile Turret',
        placement: { rangeType: 'atLeast', range: 10 },
      },
    },
  ],
}
