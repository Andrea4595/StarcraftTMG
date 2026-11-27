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
        ko: '병력 편성 중, 테란 진영 분류와 지상 및 기계 전투 분류를 모두 가진 유닛을 병력에 포함할 수 있습니다. 해당 유닛은 감염 전투 분류를 얻습니다. 해당 유닛의 특수 능력에 있는 CP 비용은 BM으로 취급합니다. 해당 유닛은 잠복 상태를 얻을 수 없습니다.',
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
        ko: '병력 편성 중, 바이러스 카드 1장을 반드시 선택하여 병력 목록에 추가해야 하며, 명시된 비용이 있다면 해당 비용을 지불해야 합니다.',
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
        ko: '전장에 아군 감염된 미사일 포탑이 없다면, 적 모형으로부터 10인치 초과해서 떨어진 전장의 지면 아무 위치에 아군 감염된 미사일 포탑 유닛 1개를 놓습니다. 이번 라운드 동안 해당 미사일 포탑은 특수 능력(구조물 제외)을 사용할 수 없습니다.',
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
