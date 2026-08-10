import type { SquadScaledCost } from '../../types'

/** 첫 tier와 마지막 tier의 가격이 다르면 'A/B', 같으면 'A'로 표시 */
export function formatScaledCost(pts: SquadScaledCost): string {
  if (typeof pts === 'number') return String(pts)
  if (pts.length === 0) return '0'
  const first = pts[0]
  const last = pts[pts.length - 1]
  return first === last ? String(first) : `${first}/${last}`
}
