import type { Phase } from '../../types'

/**
 * 페이즈 헤더(예: "MOVEMENT PHASE") 맨 앞에 붙는 표시. ANY는 대응하는 공식 아이콘이 없어 볼드체 'A'로
 * 대신한다. tone은 로스터 편집 화면에서 업그레이드 활성/비활성 상태를 아이콘 색으로 구분할 때 쓴다
 * (active: 초록, inactive: 회색). 지정하지 않으면 기본(파란) 톤이다.
 */
export function PhaseBadge({ phase, tone = 'default' }: { phase: Phase; tone?: 'default' | 'active' | 'inactive' }) {
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
