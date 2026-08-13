import type { UnitCard } from '../../types'
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
}: {
  unit: UnitCard
  resourceLabel: string
  /** 지정하면 업그레이드 PTS 배지가 켜고 끄는 버튼이 된다 (유닛 편집 화면) */
  upgradeToggle?: UpgradeToggleState
  /** 지정하면 스쿼드 등급 박스가 등급을 고르는 버튼이 된다 (유닛 편집 화면) */
  squadSelection?: SquadTableSelection
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
      </div>

      <div className="card-body-top">
        <div className="card-top-right">
          <StatBoxes unit={unit} />
          <div className="card-squad-row">
            <SquadTable squad={unit.squad} selection={squadSelection} />
            <div className="card-pts-badge card-pts-badge-header">PTS: {pts}</div>
          </div>
          <div className="card-tags">
            <span className="card-tags-label">TAGS: </span>
            <KeywordList keywords={unit.tags} />
          </div>
        </div>
      </div>

      <AbilitiesSection
        abilities={unit.abilities}
        upgrades={unit.upgrades}
        resourceLabel={resourceLabel}
        upgradeToggle={upgradeToggle}
      />
    </div>
  )
}
