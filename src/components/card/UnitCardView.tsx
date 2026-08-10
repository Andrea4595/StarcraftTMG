import type { UnitCard } from '../../types'
import { StatBoxes } from './StatBoxes'
import { SquadTable } from './SquadTable'
import { KeywordList } from './KeywordText'
import { AbilitiesSection } from './AbilitiesSection'
import { UpgradesSection } from './UpgradesSection'
import { formatScaledCost } from './costDisplay'

export function UnitCardView({ unit }: { unit: UnitCard }) {
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
        <div className="card-thumb">ART PLACEHOLDER</div>
        <div className="card-top-right">
          <StatBoxes unit={unit} />
          <div className="card-squad-row">
            <SquadTable squad={unit.squad} />
            <div className="card-pts-badge card-pts-badge-header">PTS: {pts}</div>
          </div>
          <div className="card-tags">
            <span className="card-tags-label">TAGS: </span>
            <KeywordList keywords={unit.tags} />
          </div>
        </div>
      </div>

      <AbilitiesSection abilities={unit.abilities} />
      <UpgradesSection upgrades={unit.upgrades} />
    </div>
  )
}
