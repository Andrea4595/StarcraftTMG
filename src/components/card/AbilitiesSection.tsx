import { PHASES, type Ability } from '../../types'
import { WeaponTable } from './WeaponTable'
import { RuleAbilityBlock } from './RuleAbilityBlock'

export function AbilitiesSection({
  abilities,
  title = 'ABILITIES',
}: {
  abilities: Ability[]
  title?: string
}) {
  if (abilities.length === 0) return null
  const groups = PHASES.map((phase) => ({
    phase,
    items: abilities.filter((a) => a.phase === phase),
  })).filter((g) => g.items.length > 0)

  return (
    <div className="card-section">
      <div className="card-section-title">{title}</div>
      {groups.map((g) => {
        const weapons = g.items.filter((a) => a.kind === 'weapon')
        const rules = g.items.filter((a) => a.kind === 'rule')
        return (
          <div className="card-phase-group" key={g.phase}>
            <div className="card-phase-header">
              <span className="card-phase-dot" />
              {g.phase.toUpperCase()} PHASE
            </div>
            <div className="card-phase-body">
              {weapons.length > 0 && <WeaponTable rows={weapons.map((weapon) => ({ weapon }))} />}
              {rules.map((ability, i) => (
                <RuleAbilityBlock key={i} ability={ability} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
