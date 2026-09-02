import type { TacticalCard } from '../../../types'

export const nerazim: TacticalCard = {
  category: 'tactical',
  id: 'Nerazim',
  name: { en: 'Nerazim', ko: '네라짐' },
  isUnique: true,
  resource: 1,
  slot: [
    { unitType: 'Core', count: 2 },
    { unitType: 'Elite', count: 3 },
    { unitType: 'Hero', count: 1 },
  ],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Might of the Nerazim',
      name: { en: 'Might of the Nerazim', ko: '네라짐의 힘' },
      phase: 'Any',
      type: 'Reaction',
      cost: 0,
      rule: {
        en: 'If a Friendly Unit loses the HIDDEN Status it gains Buff Speed (2) and its first Weapon used CRITICAL HIT (2).',
        ko: '아군 유닛이 은폐 상태를 잃으면, 그 유닛은 버프 스피드(2)를 얻고 처음으로 사용하는 무기는 크리티컬 힛(2)를 얻는다.',
      },
    },
    {
      kind: 'rule',
      id: 'Darkness Descends',
      name: { en: 'Darkness Descends', ko: '어둠의 강림' },
      phase: 'Movement',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'The active Biological Unit gains the HIDDEN Status until the End of the Round.',
        ko: '활성화된 아군 생체 유닛은 라운드 종료까지 은폐 상태를 얻는다.',
      },
    },
  ],
}
