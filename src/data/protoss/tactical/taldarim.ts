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
        ko: '모든 아군 유닛이 잃은 인구수의 합계를 계산합니다. 이 합계가 다음과 같은 동안:',
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
        ko: '자신의 모든 유닛이 처음 사용하는 무기는 정밀(1) 특성을 얻습니다.',
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
        ko: '자신의 모든 유닛이 처음 사용하는 무기는 치명타(1) 특성을 얻습니다.',
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
        ko: '전장에 아군 탈다림 수정탑이 없다면, 적 모형으로부터 10인치 초과해서 떨어진 전장의 지면 아무 위치에 아군 탈다림 수정탑 유닛 1개를 놓습니다. 이번 라운드 동안 해당 탈다림 수정탑은 특수 능력(구조물 제외)을 사용할 수 없습니다.',
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
