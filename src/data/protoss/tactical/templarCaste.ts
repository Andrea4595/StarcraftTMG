import type { TacticalCard } from '../../../types'

export const templarCaste: TacticalCard = {
  category: 'tactical',
  id: 'Templar Caste',
  name: { en: 'Templar Caste', ko: '기사단 계급' },
  isUnique: true,
  wave: 3,
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
      name: { en: 'Our Duty is Unending', ko: '우리의 임무는 끝이 없다' },
      phase: 'Any',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Once per Game. Select up to two of your Exhausted Tactical Cards. Return them to the Ready state.',
        ko: '게임당 1회. 자신의 소모 상태 전술 카드 중 최대 2장을 선택합니다. 해당 카드를 준비 상태로 되돌립니다.',
      },
    },
    {
      kind: 'rule',
      id: 'Khassar de Templari',
      name: { en: 'Khassar de Templari', ko: '카사르 디 템플라리' },
      phase: 'Any',
      type: 'Active',
      cost: 0,
      rule: {
        en: 'Instead of performing an action, select one other Friendly Biological Unit that has already been Activated this Phase. That Unit immediately performs one action available in the current Phase, then suffers NON-LETHAL DAMAGE (3).',
        ko: '행동을 수행하는 대신, 이번 단계에 이미 활성화된 다른 아군 생체 유닛 1개를 선택합니다. 해당 유닛은 즉시 현재 단계에 수행할 수 있는 행동 하나를 수행한 뒤 비살상 피해(3)를 받습니다.',
      },
    },
  ],
}
