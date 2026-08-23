import type { Phase } from '../../types'

/**
 * 페이즈 헤더(예: "MOVEMENT PHASE") 맨 앞에 붙는 표시. ANY는 대응하는 공식 아이콘이 없어 볼드체 'A'로
 * 대신한다. tone은 어빌리티 칩(AbilityChipsRow)에서 어빌리티 타입에 따라 아이콘 색을 구분할 때 쓴다
 * (active: 파랑, passive: 초록, reaction: 노랑). 타입 개념이 없는 곳(페이즈 섹션 헤더, 무기 종합 칩
 * 등)은 지정하지 않아 기본(파란) 톤을 그대로 쓴다.
 *
 * 비활성(미구매 업그레이드 등) 상태는 이 컴포넌트가 직접 표현하지 않는다 — 호출자(칩 버튼)가 이미
 * 전체를 옅게 누르는 opacity를 쓰고 있어서, 그 위에 얹히는 이 아이콘도 같은 색조를 유지한 채 함께
 * 옅어진다. 그래서 비활성 상태에서도 색조로 타입을 계속 알아볼 수 있다.
 */
export function PhaseBadge({
  phase,
  tone = 'default',
}: {
  phase: Phase
  tone?: 'default' | 'active' | 'passive' | 'reaction'
}) {
  if (phase === 'Any') {
    return <span className={`card-phase-any card-phase-tone-${tone}`}>A</span>
  }
  return (
    <span
      className={`card-phase-icon card-phase-icon-${phase.toLowerCase()} card-phase-tone-${tone}`}
      role="img"
      aria-label={`${phase} phase`}
    />
  )
}
