import type { TacticalCard } from '../../../types'

export const templarCaste: TacticalCard = {
  category: 'tactical',
  id: 'Templar Caste',
  name: { en: 'Templar Caste', ko: '기사 계급' },
  isUnique: true,
  resource: 1,
  slot: [
    { unitType: 'Hero', count: 1 },
    { unitType: 'Core', count: 3 },
    { unitType: 'Support', count: 2 },
  ],
  cardAbilities: [
    {
      kind: 'rule',
      id: 'Our Duty is Unending',
      name: { en: 'Our Duty is Unending', ko: '우리의 의무는 끝나지 않는다' },
      phase: 'Any',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Once per Game. Select up to two of your Exhausted Tactical Cards. Return them to the Ready state.',
        ko: '게임당 한번. 소모된 자신의 택티컬 카드를 최대 두 장까지 골라 준비 상태로 되돌린다.',
      },
    },
    {
      kind: 'rule',
      id: 'Khassar de Templari',
      name: { en: 'Khassar de Templari', ko: '카사르 드 템플라리' },
      phase: 'Any',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Instead of performing an action, select one other Friendly Biological Unit that has already been Activated this Phase. That Unit immediately performs one action available in the current Phase, then suffers NON-LETHAL DAMAGE (3).',
        ko: '액션을 하는 것 대신, 이번 페이즈에 이미 활성화된 다른 아군 생체 유닛 하나를 고른다. 그 유닛은 즉시 현재 페이즈에 할 수 있는 액션 하나를 하고, 그 후 논 리썰 데미지(3)를 받는다.',
      },
    },
  ],
}
