import type { CSSProperties } from 'react'
import type { RaceData, Roster, Rule } from '../../types'
import { findUnit, groupedTacticalCards, sortedUnitEntries, unitEntryMineralCost } from '../rosterCalc'
import { UNIT_TYPE_COLORS } from '../unitTypeColor'

export interface GaugeSegment {
  key: string
  label: string
  value: number
  color: string
}

const MINERAL_COLOR = '#5b9dff'
const GAS_COLOR = '#4ade80'

/** 로스터 유닛 항목 하나당 한 칸. 로스터 화면과 같은 순서(타입 순)이고, 칸 색은 유닛 타입 색이다.
 *  비용이 0인 항목(자동 소환 유닛 등)은 칸을 만들지 않는다 */
export function mineralGaugeSegments(race: RaceData, roster: Roster, localize: (rule: Rule) => string): GaugeSegment[] {
  return sortedUnitEntries(race, roster.units).flatMap((entry) => {
    const unit = findUnit(race, entry.unitId)
    if (!unit) return []
    const value = unitEntryMineralCost(unit, entry)
    if (value <= 0) return []
    return [{ key: entry.id, label: localize(unit.name), value, color: UNIT_TYPE_COLORS[unit.type] }]
  })
}

/** 택티컬 카드 한 장당 한 칸 (같은 카드를 여러 장 넣으면 칸도 여러 개). 가스 비용이 없는 카드는 칸이 없다 */
export function gasGaugeSegments(race: RaceData, roster: Roster, localize: (rule: Rule) => string): GaugeSegment[] {
  return groupedTacticalCards(race, roster).flatMap(({ card, count }) => {
    const value = card.gasPts ?? 0
    if (value <= 0) return []
    return Array.from({ length: count }, (_, i) => ({
      key: `${card.id}#${i}`,
      label: localize(card.name),
      value,
      color: GAS_COLOR,
    }))
  })
}

/**
 * 예산(미네랄/가스) 게이지. 가로로 긴 막대가 예산 전체이고, 항목마다 비용만큼의 폭을 차지하는 칸이
 * 이름과 함께 채워진다. 칸이 좁아 이름이 안 들어가면 말줄임되고, 마우스를 올리면 이름/비용이 뜬다.
 * 예산을 넘기면 막대 전체를 합계 기준으로 줄여 그리고, 예산 위치에 세로선을 긋고 빨갛게 표시한다.
 */
export function BudgetGauge({
  label,
  total,
  cap,
  segments,
  kind,
}: {
  label: string
  total: number
  cap: number
  segments: GaugeSegment[]
  kind: 'mineral' | 'gas'
}) {
  const over = total > cap
  const scale = Math.max(cap, total, 1)
  const color = kind === 'mineral' ? MINERAL_COLOR : GAS_COLOR
  return (
    <div className={`budget-gauge ${over ? 'budget-gauge-over' : ''}`} style={{ '--gauge-color': color } as CSSProperties}>
      <div className="budget-gauge-head">
        <span className="budget-gauge-label">{label}</span>
        <span className="budget-gauge-value">
          {total} <span className="budget-gauge-cap">/ {cap}</span>
        </span>
      </div>
      <div className="budget-gauge-track">
        {segments.map((s) => (
          <div
            key={s.key}
            className="budget-gauge-segment"
            style={{ width: `${(s.value / scale) * 100}%`, background: s.color }}
            title={`${s.label} ${s.value}`}
          >
            <span className="budget-gauge-segment-label">{s.label}</span>
          </div>
        ))}
        {over && <div className="budget-gauge-cap-line" style={{ left: `${(cap / scale) * 100}%` }} />}
      </div>
    </div>
  )
}
