import type { ReactNode } from 'react'
import type { Ability, UnitCard } from '../../types'
import { StatBoxes } from './StatBoxes'
import { SquadTable, type SquadTableSelection } from './SquadTable'
import { KeywordList } from './KeywordText'
import { AbilitiesSection, type CrossFavoriteRef, type FavoriteToggle, type UpgradeToggleState } from './AbilitiesSection'
import { formatScaledCost } from './costDisplay'
import { useLocalize } from '../../LangContext'

export function UnitCardView({
  unit,
  resourceLabel,
  upgradeToggle,
  squadSelection,
  squadTierSelector,
  finalCost,
  abilitiesOverride,
  squadHighlightIndex,
  favorite,
  crossFavorites,
  onSelectAbility,
}: {
  unit: UnitCard
  resourceLabel: string
  /** 지정하면 업그레이드 PTS 배지가 켜고 끄는 버튼이 된다 (유닛 편집 화면) */
  upgradeToggle?: UpgradeToggleState
  /** 지정하면 스쿼드 등급 박스가 등급을 고르는 버튼이 된다 (유닛 편집 화면) */
  squadSelection?: SquadTableSelection
  /**
   * 지정하면 스탯 박스 왼쪽에 컴팩트 스쿼드 등급 선택기(SquadTierSelector)를 붙이고, 그 아래 큰
   * 스쿼드 박스(SquadTable)는 생략한다 — 로스터 편집 화면 전용. 게임 레퍼런스/내보내기 화면은
   * 기존 SquadTable을 그대로 쓴다.
   */
  squadTierSelector?: ReactNode
  /** 이 로스터 항목이 스쿼드+업그레이드를 합쳐 실제로 소모하는 최종 미네랄. 지정하면 헤더 우측에 배지로 표시 */
  finalCost?: number
  /**
   * 지정하면 unit.abilities/unit.upgrades 대신 이 목록만 보여준다 (완전 읽기 전용 참조 화면용:
   * 비활성 업그레이드와 봉인된 기본 무기를 뺀, 실제로 적용된 능력만 미리 걸러서 넘긴다).
   */
  abilitiesOverride?: Ability[]
  /** squadSelection이 없을 때, 이 인덱스를 현재 등급으로 배지 강조만 한다 (클릭 불가) */
  squadHighlightIndex?: number
  /** 지정하면 능력 이름 옆에 즐겨찾기 별 버튼이 붙는다 (게임 레퍼런스 화면 전용) */
  favorite?: FavoriteToggle
  /** 다른 유닛/카드에서 즐겨찾기한 능력들을 같은 페이즈 그룹 하단에 덧붙인다 (게임 레퍼런스 유닛 상세 모달 전용) */
  crossFavorites?: CrossFavoriteRef[]
  /** 지정하면 이름 직접 언급으로 찾은 연관 어빌리티/무기 항목을 눌러 그 대상의 상세 모달로 이동할 수 있다 */
  onSelectAbility?: (ability: Ability) => void
}) {
  const localize = useLocalize()
  const pts = formatScaledCost(unit.squad.map((s) => s.pts))

  return (
    <div className="game-card">
      <div className="card-header">
        <div>
          <div className="card-title">
            {localize(unit.name)}
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
          <div className="card-squad-stats-row">
            <StatBoxes unit={unit} />
            {squadTierSelector}
          </div>
          <div className="card-squad-row">
            {!squadTierSelector && (
              <SquadTable squad={unit.squad} selection={squadSelection} highlightIndex={squadHighlightIndex} />
            )}
            <div className="card-pts-badge card-pts-badge-header">PTS: {pts}</div>
          </div>
          <div className="card-tags">
            <span className="card-tags-label">TAGS: </span>
            <KeywordList keywords={unit.tags.filter((t) => t.name !== 'Unique')} />
          </div>
        </div>
      </div>

      {abilitiesOverride ? (
        <AbilitiesSection
          unit={unit}
          abilities={abilitiesOverride}
          resourceLabel={resourceLabel}
          favorite={favorite}
          crossFavorites={crossFavorites}
          onSelectAbility={onSelectAbility}
        />
      ) : (
        <AbilitiesSection
          unit={unit}
          abilities={unit.abilities}
          upgrades={unit.upgrades}
          resourceLabel={resourceLabel}
          upgradeToggle={upgradeToggle}
          favorite={favorite}
          crossFavorites={crossFavorites}
          onSelectAbility={onSelectAbility}
        />
      )}
    </div>
  )
}
