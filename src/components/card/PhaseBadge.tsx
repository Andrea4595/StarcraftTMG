import type { Phase } from '../../types'

/** 페이즈 헤더(예: "MOVEMENT PHASE") 맨 앞에 붙는 표시. ANY는 대응하는 공식 아이콘이 없어 볼드체 'A'로 대신한다 */
export function PhaseBadge({ phase }: { phase: Phase }) {
  if (phase === 'Any') {
    return <span className="card-phase-any">A</span>
  }
  return (
    <span
      className={`card-phase-icon card-phase-icon-${phase.toLowerCase()}`}
      role="img"
      aria-label={`${phase} phase`}
    />
  )
}
