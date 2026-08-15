import type { Ability, UnitCard } from '../../types'
import { StatBoxes } from './StatBoxes'
import { SquadTable, type SquadTableSelection } from './SquadTable'
import { KeywordList } from './KeywordText'
import { AbilitiesSection, type UpgradeToggleState } from './AbilitiesSection'
import { formatScaledCost } from './costDisplay'

export function UnitCardView({
  unit,
  resourceLabel,
  upgradeToggle,
  squadSelection,
  finalCost,
  abilitiesOverride,
  squadHighlightIndex,
}: {
  unit: UnitCard
  resourceLabel: string
  /** 지정하면 업그레이드 PTS 배지가 켜고 끄는 버튼이 된다 (유닛 편집 화면) */
  upgradeToggle?: UpgradeToggleState
  /** 지정하면 스쿼드 등급 박스가 등급을 고르는 버튼이 된다 (유닛 편집 화면) */
  squadSelection?: SquadTableSelection
  /** 이 로스터 항목이 스쿼드+업그레이드를 합쳐 실제로 소모하는 최종 미네랄. 지정하면 헤더 우측에 배지로 표시 */
  finalCost?: number
  /**
   * 지정하면 unit.abilities/unit.upgrades 대신 이 목록만 보여준다 (완전 읽기 전용 참조 화면용:
   * 비활성 업그레이드와 봉인된 기본 무기를 뺀, 실제로 적용된 능력만 미리 걸러서 넘긴다).
   */
  abilitiesOverride?: Ability[]
  /** squadSelection이 없을 때, 이 인덱스를 현재 등급으로 배지 강조만 한다 (클릭 불가) */
  squadHighlightIndex?: number
}) {
  const pts = formatScaledCost(unit.squad.map((s) => s.pts))

  return (
    <div className="game-card">
      <div className="card-header">
        <div>
          <div className="card-title">
            {unit.name}
            {unit.isUnique && <span className="card-unique-badge">UNIQUE</span>}
          </div>
          <div className="card-subtitle">{unit.type}</div>
        </div>
        {finalCost !== undefined && (
          <div className="card-pts-badge card-header-cost-badge">COST: {finalCost}</div>
        )}
      </div>

      <div className="card-body-top">
        <div className="card-top-right">
          <StatBoxes unit={unit} />
          <div className="card-squad-row">
            <SquadTable squad={unit.squad} selection={squadSelection} highlightIndex={squadHighlightIndex} />
            <div className="card-pts-badge card-pts-badge-header">PTS: {pts}</div>
          </div>
          <div className="card-tags">
            <span className="card-tags-label">TAGS: </span>
            <KeywordList keywords={unit.tags} />
          </div>
        </div>
      </div>

      {abilitiesOverride ? (
        <AbilitiesSection abilities={abilitiesOverride} resourceLabel={resourceLabel} />
      ) : (
        <AbilitiesSection
          abilities={unit.abilities}
          upgrades={unit.upgrades}
          resourceLabel={resourceLabel}
          upgradeToggle={upgradeToggle}
        />
      )}
    </div>
  )
}
