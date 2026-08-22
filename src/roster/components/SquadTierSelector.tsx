import type { Roster, RosterUnitEntry, UnitCard } from '../../types'
import { useRosterStore } from '../RosterContext'
import { catalogSquadTierIndexes } from '../rosterCalc'

/**
 * 로스터 목록 행에서 유닛 이름 옆에 바로 붙는 컴팩트 스쿼드 등급 선택기. 유닛 상세 패널의
 * SquadTable(인원수 범위까지 보여주는 카드용)과 달리, 서플라이(파란 사각형)와 그 등급의 최대
 * 모델 수만 보여준다. 고를 이유가 없는(dominated) tier는 catalogSquadTierIndexes가 걸러준다.
 */
export function SquadTierSelector({
  roster,
  unit,
  entry,
}: {
  roster: Roster
  unit: UnitCard
  entry: RosterUnitEntry
}) {
  const store = useRosterStore()
  const selectableIndexes = catalogSquadTierIndexes(unit)
  if (selectableIndexes.length <= 1) return null

  return (
    <div className="roster-squad-tier-selector">
      {selectableIndexes.map((i) => {
        const tier = unit.squad[i]
        const active = entry.squadTierIndex === i
        return (
          <button
            type="button"
            key={i}
            className={`roster-squad-tier-chip ${active ? 'roster-squad-tier-chip-active' : ''}`}
            onClick={(e) => {
              e.stopPropagation()
              store.setUnitEntrySquadTier(roster.id, entry.id, i)
            }}
          >
            <span className="roster-squad-tier-supply">
              {Array.from({ length: tier.supply }).map((_, j) => (
                <span className="roster-squad-tier-supply-square" key={j} />
              ))}
            </span>
            {tier.modelMax}
          </button>
        )
      })}
    </div>
  )
}
