import type { RaceData, Roster } from '../../types'
import { findUnit } from '../rosterCalc'
import { useLocalize } from '../../LangContext'

/** 서플라이 바의 버블을 눌렀을 때 스크롤해 갈 유닛 항목의 DOM id */
export function spawnAnchorId(entryId: string): string {
  return `game-ref-unit-${entryId}`
}

/**
 * 게임 레퍼런스 화면 유닛 목록 위의 서플라이 바. 맵에 스폰한(스쿼드 칩을 고른) 유닛들을 로스터 순서대로
 * 버블로 잇고, 맨 왼쪽에 그 서플라이 합계를 보여준다. 사망한 유닛은 스폰 기록이 지워지므로 자연히 빠진다.
 * 버블을 누르면 그 유닛 항목으로 스크롤한다. 게임 진행 기록 초기화 버튼은 유닛만이 아니라 카드 소모까지
 * 지우므로 이 바가 아니라 화면 헤더(GameReferencePage, 닫기 버튼 왼쪽)에 둔다.
 */
export function SpawnSupplyBar({ race, roster }: { race: RaceData; roster: Roster }) {
  const localize = useLocalize()

  const spawned = roster.units.flatMap((entry) => {
    const unit = findUnit(race, entry.unitId)
    const tier = entry.spawnedTierIndex !== undefined ? unit?.squad[entry.spawnedTierIndex] : undefined
    if (!unit || !tier || entry.dead) return []
    return [{ entry, name: localize(unit.name), supply: tier.supply }]
  })
  const total = spawned.reduce((sum, s) => sum + s.supply, 0)

  return (
    <div className="game-ref-spawn-bar">
      <span className="game-ref-spawn-total">
        서플 <strong>{total}</strong>
      </span>
      <div className="game-ref-spawn-bubbles">
        {spawned.map(({ entry, name, supply }) => (
          <button
            type="button"
            key={entry.id}
            className="game-ref-spawn-bubble"
            onClick={() =>
              document.getElementById(spawnAnchorId(entry.id))?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
          >
            <span className="roster-squad-tier-supply">
              {supply === 0 ? (
                <span className="roster-squad-tier-supply-empty">×</span>
              ) : (
                Array.from({ length: supply }).map((_, j) => <span className="roster-squad-tier-supply-square" key={j} />)
              )}
            </span>
            {name}
          </button>
        ))}
      </div>
    </div>
  )
}
