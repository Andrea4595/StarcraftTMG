import type { Squad } from '../../types'

export interface SquadTableSelection {
  activeIndex: number
  /** 이 인덱스들만 클릭해서 고를 수 있다 (최소 인원 tier는 실전에서 선택할 이유가 없어 제외됨) */
  selectableIndexes: number[]
  onSelect: (index: number) => void
}

export function SquadTable({
  squad,
  selection,
  highlightIndex,
}: {
  squad: Squad[]
  selection?: SquadTableSelection
  /** selection이 없을 때, 이 인덱스의 칸을 현재 등급으로 강조 표시한다 (버튼이 아닌 읽기 전용 강조) */
  highlightIndex?: number
}) {
  return (
    <div className="card-squad">
      {squad.map((s, i) => {
        const content = (
          <>
            <div className="card-squad-tier-value">
              {s.modelMin === s.modelMax ? s.modelMin : `${s.modelMin} - ${s.modelMax}`}
            </div>
            <div className="card-squad-tier-label">MODELS</div>
            <div className="card-squad-tier-value">{s.supply}</div>
            <div className="card-squad-tier-label">SUPPLY</div>
          </>
        )

        if (selection?.selectableIndexes.includes(i)) {
          const active = selection.activeIndex === i
          return (
            <button
              type="button"
              key={i}
              className={`card-squad-tier card-squad-tier-btn ${active ? 'card-squad-tier-btn-active' : ''}`}
              onClick={() => selection.onSelect(i)}
            >
              {content}
            </button>
          )
        }

        return (
          <div
            className={`card-squad-tier ${i === highlightIndex ? 'card-squad-tier-highlight' : ''}`}
            key={i}
          >
            {content}
          </div>
        )
      })}
    </div>
  )
}
