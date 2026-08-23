import type { Roster, RosterUnitEntry, UnitCard } from '../../types'
import { useRosterStore } from '../RosterContext'
import { catalogSquadTierIndexes } from '../rosterCalc'

/**
 * 컴팩트 스쿼드 등급 선택기. 서플라이(사각형)와 그 등급의 최대 모델 수만 보여준다. 고를 이유가
 * 없는(dominated) tier도 함께 보여주되, 클릭할 수 없는 빈(홀로우) 사각형 칩으로 표시한다 —
 * 실전에서 고를 일은 없어도, 서플라이가 등급마다 어떻게 바뀌는지 한눈에 파악하는 데 필요한
 * 정보이기 때문이다. 서플라이가 0인 tier는 사각형(서플라이 1개짜리 홀로우 칩과 헷갈리기 쉽다)
 * 대신 'X' 표시로 확실히 구분한다. tier가 하나뿐인 유닛도 그 정보(서플라이 몇, 모델 몇)를
 * 보여주기 위해 항상 표시한다.
 */
export function SquadTierSelector({
  roster,
  unit,
  entry,
  interactive = true,
}: {
  roster: Roster
  unit: UnitCard
  entry: RosterUnitEntry
  /** false면 게임 레퍼런스 화면 전용 읽기 전용 모드: 등급을 클릭해 바꿀 수 없고, 지금 등급만 강조해 보여준다 */
  interactive?: boolean
}) {
  const store = useRosterStore()
  const selectableIndexes = new Set(catalogSquadTierIndexes(unit))

  return (
    <div className="roster-squad-tier-selector">
      {unit.squad.map((tier, i) => {
        const selectable = interactive && selectableIndexes.has(i)
        const active = entry.squadTierIndex === i
        const content = (
          <>
            <span className="roster-squad-tier-supply">
              {tier.supply === 0 ? (
                <span className="roster-squad-tier-supply-empty">×</span>
              ) : (
                Array.from({ length: tier.supply }).map((_, j) => (
                  <span
                    className={`roster-squad-tier-supply-square ${!selectable ? 'roster-squad-tier-supply-square-hollow' : ''}`}
                    key={j}
                  />
                ))
              )}
            </span>
            {tier.modelMax}
          </>
        )

        if (!selectable) {
          return (
            <div
              className={`roster-squad-tier-chip roster-squad-tier-chip-disabled ${active ? 'roster-squad-tier-chip-active' : ''}`}
              key={i}
            >
              {content}
            </div>
          )
        }

        return (
          <button
            type="button"
            key={i}
            className={`roster-squad-tier-chip ${active ? 'roster-squad-tier-chip-active' : ''}`}
            onClick={() => store.setUnitEntrySquadTier(roster.id, entry.id, i)}
          >
            {content}
          </button>
        )
      })}
    </div>
  )
}
