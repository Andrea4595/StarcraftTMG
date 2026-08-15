import type { CSSProperties } from 'react'
import type { Phase, RaceData, Roster, RuleAbility, WeaponProfile } from '../../types'
import { rosterAbilitiesByPhase } from '../rosterCalc'
import { UNIT_TYPE_COLORS } from '../unitTypeColor'
import { WeaponTable, type WeaponRow } from '../../components/card/WeaponTable'
import { RuleAbilityBlock } from '../../components/card/RuleAbilityBlock'

export function GameReferencePhaseView({ race, roster, phase }: { race: RaceData; roster: Roster; phase: Phase }) {
  const groups = rosterAbilitiesByPhase(race, roster, phase)

  if (groups.length === 0) {
    return <div className="game-ref-empty">이 페이즈에 쓸 수 있는 능력이 없습니다.</div>
  }

  return (
    <div className="game-ref-phase-groups">
      {groups.map((group, i) => {
        const weapons = group.abilities.filter((a): a is WeaponProfile => a.kind === 'weapon')
        const rules = group.abilities.filter((a): a is RuleAbility => a.kind === 'rule')
        const style = group.unitType
          ? ({ '--type-color': UNIT_TYPE_COLORS[group.unitType] } as CSSProperties)
          : undefined

        return (
          <div className="game-card game-ref-phase-group" style={style} key={`${group.sourceLabel}-${i}`}>
            <div className="game-ref-phase-group-title">{group.sourceLabel}</div>
            <div className="card-phase-body">
              {weapons.length > 0 && (
                <WeaponTable
                  rows={weapons.map((weapon): WeaponRow => ({ weapon, anyPhase: weapon.phase === 'Any' }))}
                />
              )}
              {rules.map((ability, j) => (
                <RuleAbilityBlock
                  key={j}
                  ability={ability}
                  resourceLabel={race.resourceLabel.abbr}
                  anyPhase={ability.phase === 'Any'}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
