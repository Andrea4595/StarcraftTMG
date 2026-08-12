import type { CSSProperties } from 'react'
import type { UnitType } from '../../types'
import type { SlotUsage } from '../rosterCalc'
import { UNIT_TYPE_COLORS } from '../unitTypeColor'

export function SlotUsageRow({
  slotUsage,
  activeFilter,
  onFilterClick,
}: {
  slotUsage: SlotUsage[]
  /** 지정하면 현재 필터로 선택된 타입을 강조 표시한다 */
  activeFilter?: UnitType | null
  /** 지정하면 각 칸이 해당 타입으로 필터링하는 버튼이 된다 */
  onFilterClick?: (unitType: UnitType) => void
}) {
  if (slotUsage.length === 0) return null

  return (
    <div className="roster-slots">
      {slotUsage.map((s) => {
        const over = s.used > s.budget
        const active = activeFilter === s.unitType
        /** 수용량이 0이거나(다른 타입으로 필터링 중이라 이 칸이 대상이 아니면) 비활성화된 것처럼 어둡게 표시. 이 칸이 활성 필터면 항상 색을 꽉 채운다 */
        const dimmed = !active && (s.budget === 0 || (Boolean(onFilterClick) && activeFilter != null))
        const style = { '--type-color': UNIT_TYPE_COLORS[s.unitType] } as CSSProperties
        const className = `roster-slot-pill ${over ? 'roster-budget-over' : ''} ${active ? 'roster-slot-pill-active' : ''} ${dimmed ? 'roster-slot-pill-dimmed' : ''}`
        const content = (
          <>
            <span className="roster-slot-pill-label">{s.unitType}</span> {s.used} / {s.budget}
          </>
        )

        if (onFilterClick) {
          return (
            <button
              type="button"
              key={s.unitType}
              className={className}
              style={style}
              onClick={() => onFilterClick(s.unitType)}
            >
              {content}
            </button>
          )
        }

        return (
          <div key={s.unitType} className={className} style={style}>
            {content}
          </div>
        )
      })}
    </div>
  )
}
