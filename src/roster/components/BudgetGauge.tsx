import type { CSSProperties } from 'react'
import type { RaceData, Roster, Rule } from '../../types'
import { findUnit, groupedTacticalCards, sortedUnitEntries, unitEntryMineralCost } from '../rosterCalc'
import { UNIT_TYPE_COLORS } from '../unitTypeColor'

/** 게이지 버블 하나 = 같은 유닛(또는 같은 택티컬 카드) 묶음. parts는 묶음 안 항목 하나하나의 비용이고,
 *  버블 안에서 그 비율대로 세로선으로 나뉜다 */
export interface GaugeSegment {
  key: string
  name: string
  parts: number[]
  color: string
}

/** 같은 key끼리 처음 나온 자리에 묶는다 (순서는 처음 등장한 순서) */
function groupSegments(items: { key: string; name: string; value: number; color: string }[]): GaugeSegment[] {
  const groups = new Map<string, GaugeSegment>()
  for (const item of items) {
    const group = groups.get(item.key)
    if (group) group.parts.push(item.value)
    else groups.set(item.key, { key: item.key, name: item.name, parts: [item.value], color: item.color })
  }
  return [...groups.values()]
}

function segmentLabel(s: GaugeSegment): string {
  return s.parts.length > 1 ? `${s.name} x${s.parts.length}` : s.name
}

const MINERAL_COLOR = '#5b9dff'
const GAS_COLOR = '#4ade80'

/**
 * 게이지 칸 배경색: 원래 색에서 채도를 낮추고(회색 쪽으로 45%) 어둡게(60%) 만들어, 그 위에 흰 글씨가
 * 잘 읽히게 한다. 간소화 로스터 PNG에서도 같은 색이 나오도록 CSS 필터 대신 여기서 직접 계산한다.
 */
function mutedColor(hex: string): string {
  const n = parseInt(hex.slice(1), 16)
  const rgb = [(n >> 16) & 255, (n >> 8) & 255, n & 255]
  const gray = (rgb[0] + rgb[1] + rgb[2]) / 3
  const [r, g, b] = rgb.map((c) => Math.round((gray + (c - gray) * 0.55) * 0.6))
  return `rgb(${r}, ${g}, ${b})`
}

/** 같은 유닛끼리 버블 하나로 묶고, 그 안을 로스터 항목마다 비용 비율대로 나눈다. 로스터 화면과 같은
 *  순서(타입 순)이고 색은 유닛 타입 색이다. 비용이 0인 항목(자동 소환 유닛 등)은 넣지 않는다 */
export function mineralGaugeSegments(race: RaceData, roster: Roster, localize: (rule: Rule) => string): GaugeSegment[] {
  return groupSegments(
    sortedUnitEntries(race, roster.units).flatMap((entry) => {
      const unit = findUnit(race, entry.unitId)
      if (!unit) return []
      const value = unitEntryMineralCost(unit, entry)
      if (value <= 0) return []
      return [{ key: unit.id, name: localize(unit.name), value, color: UNIT_TYPE_COLORS[unit.type] }]
    }),
  )
}

/** 같은 택티컬 카드끼리 버블 하나로 묶고 장마다 나눈다. 가스 비용이 없는 카드는 넣지 않는다 */
export function gasGaugeSegments(race: RaceData, roster: Roster, localize: (rule: Rule) => string): GaugeSegment[] {
  return groupedTacticalCards(race, roster).flatMap(({ card, count }) => {
    const value = card.gasPts ?? 0
    if (value <= 0) return []
    return [{ key: card.id, name: localize(card.name), parts: Array.from({ length: count }, () => value), color: GAS_COLOR }]
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
  const sum = (parts: number[]) => parts.reduce((a, b) => a + b, 0)
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
        {segments.map((s) => {
          const label = segmentLabel(s)
          return (
            <div
              key={s.key}
              className="budget-gauge-segment"
              style={{ flexGrow: sum(s.parts), background: mutedColor(s.color) }}
              title={`${label} · ${sum(s.parts)}`}
            >
              {s.parts.length > 1 &&
                s.parts.map((value, i) => <div key={i} className="budget-gauge-part" style={{ flexGrow: value }} />)}
              <span className="budget-gauge-segment-label">{label}</span>
            </div>
          )
        })}
        {/* 남은 예산만큼 비워 두는 투명 칸. 칸 사이 간격이 있어도 비율이 어긋나지 않도록 폭을 flex-grow 비율로 나눈다 */}
        {scale > total && <div className="budget-gauge-rest" style={{ flexGrow: scale - total }} />}
        {over && <div className="budget-gauge-cap-line" style={{ left: `${(cap / scale) * 100}%` }} />}
      </div>
    </div>
  )
}
