import type { TacticalCard } from '../../../types'

export const nexus: TacticalCard = {
  category: 'tactical',
  name: 'Nexus',
  isUnique: true,
  gasPts: 35,
  resource: 1,
  slot: [{ unitType: 'Core', count: 2 }],
  cardAbilities: [
    {
      kind: 'rule',
      name: 'Ancient Pride',
      phase: 'Any',
      type: 'Active',
      cost: 0,
      rule: {
        en: "The active Unit's first Weapon used gains INSTANT.",
        ko: '활성화 중인 유닛이 처음 사용하는 무기는 INSTANT를 얻는다.',
      },
    },
    {
      kind: 'rule',
      name: 'Strategic Recall',
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'The active, Unengaged Ground Unit is returned to Reserves instead of performing an action.',
        ko: '활성화 중인 Unengaged 지상 유닛은 action을 수행하는 대신 Reserves로 돌아간다.',
      },
    },
  ],
}
