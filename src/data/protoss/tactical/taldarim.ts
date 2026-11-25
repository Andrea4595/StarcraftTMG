import type { TacticalCard } from '../../../types'

export const taldarim: TacticalCard = {
  category: 'tactical',
  id: "Tal'darim",
  name: { en: "Tal'darim", ko: '탈다림' },
  isUnique: true,
  wave: 4,
  resource: 0,
  slot: [
    { unitType: 'Hero', count: 1 },
    { unitType: 'Elite', count: 1 },
    { unitType: 'Core', count: 4 },
  ],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Chain of Ascension',
      name: { en: 'Chain of Ascension', ko: '승천의 사슬' },
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: 'Calculate the total lost Supply of all Friendly Units. While this total is:',
        ko: '모든 아군 유닛이 잃은 서플라이의 합을 계산한다. 그 합이:',
      },
    },
    {
      kind: 'rule',
      id: '4 or more',
      name: { en: '4 or more', ko: '4 이상' },
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: "All your Units' first used weapons gain PRECISION (1).",
        ko: '모든 아군 유닛이 처음으로 사용하는 무기는 프리시전(1)을 얻는다.',
      },
    },
    {
      kind: 'rule',
      id: '6 or more',
      name: { en: '6 or more', ko: '6 이상' },
      phase: 'Any',
      type: 'Passive',
      cost: 0,
      rule: {
        en: "All your Units' first used weapons gain CRITICAL HIT (1).",
        ko: '모든 아군 유닛이 처음으로 사용하는 무기는 크리티컬 힛(1)을 얻는다.',
      },
    },
    {
      kind: 'rule',
      id: 'Proxy Pylon',
      name: { en: 'Proxy Pylon', ko: '전진 수정탑' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: "If there is no Friendly Tal'darim Pylon on the battlefield, set a Friendly Tal'darim Pylon Unit anywhere on the GROUND LEVEL of the battlefield more than 10\" away from any Enemy model. This Round, the Tal'darim Pylon is not eligible to use its Special Abilities (excluding Structure).",
        ko: '전장에 아군 탈다림 수정탑이 없다면, 모든 적 모델로부터 10" 이상 떨어진 전장의 지면 아무곳에 아군 탈다림 수정탑을 배치한다. 그 라운드 동안 탈다림 수정탑은 특수능력을 사용할 수 없다. (구조물 규칙은 제외한다)',
      },
      summonsUnitId: "Tal'darim Pylon",
      simulatorFeature: {
        kind: 'summonUnit',
        unitId: "Tal'darim Pylon",
        placement: { rangeType: 'atLeast', range: 10 },
      },
    },
  ],
}
