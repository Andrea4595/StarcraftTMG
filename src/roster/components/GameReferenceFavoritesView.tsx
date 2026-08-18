import type { CSSProperties } from 'react'
import type { RaceData, Roster, RuleAbility } from '../../types'
import { rosterFavoriteAbilities } from '../rosterCalc'
import { useRosterStore } from '../RosterContext'
import { UNIT_TYPE_COLORS } from '../unitTypeColor'
import { RuleAbilityBlock } from '../../components/card/RuleAbilityBlock'

export function GameReferenceFavoritesView({ race, roster }: { race: RaceData; roster: Roster }) {
  const store = useRosterStore()
  const groups = rosterFavoriteAbilities(race, roster)

  if (groups.length === 0) {
    return <div className="game-ref-empty">즐겨찾기한 능력이 없습니다. 어빌리티 이름 옆 별표를 눌러 추가하세요.</div>
  }

  return (
    <div className="game-ref-phase-groups">
      {groups.map((group) => {
        const style = group.unitType ? ({ '--type-color': UNIT_TYPE_COLORS[group.unitType] } as CSSProperties) : undefined
        return (
          <div className="game-card game-ref-phase-group" style={style} key={group.sourceLabel}>
            <div className="game-ref-phase-group-title">{group.sourceLabel}</div>
            <div className="card-phase-body">
              {(group.abilities as RuleAbility[]).map((ability, i) => (
                <RuleAbilityBlock
                  key={i}
                  ability={ability}
                  resourceLabel={race.resourceLabel.abbr}
                  favorite={{
                    active: true,
                    onToggle: () => store.toggleFavoriteAbility(roster.id, group.sourceName, ability.name),
                  }}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
