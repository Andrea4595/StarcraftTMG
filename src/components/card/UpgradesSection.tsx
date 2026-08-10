import { PHASES, type RuleAbility, type Upgrade, type WeaponProfile } from '../../types'
import { WeaponTable } from './WeaponTable'
import { RuleAbilityBlock } from './RuleAbilityBlock'

function isWeaponUpgrade(u: Upgrade): u is Upgrade & { ability: WeaponProfile } {
  return u.ability.kind === 'weapon'
}

function isRuleUpgrade(u: Upgrade): u is Upgrade & { ability: RuleAbility } {
  return u.ability.kind === 'rule'
}

export function UpgradesSection({ upgrades }: { upgrades: Upgrade[] }) {
  if (upgrades.length === 0) return null
  const groups = PHASES.map((phase) => ({
    phase,
    items: upgrades.filter((u) => u.ability.phase === phase),
  })).filter((g) => g.items.length > 0)

  return (
    <div className="card-section">
      <div className="card-section-title card-section-title-upgrades">UPGRADES</div>
      {groups.map((g) => {
        const weapons = g.items.filter(isWeaponUpgrade)
        const rules = g.items.filter(isRuleUpgrade)
        return (
          <div className="card-phase-group card-phase-group-upgrades" key={g.phase}>
            <div className="card-phase-header card-phase-header-upgrades">
              <span className="card-phase-dot" />
              {g.phase.toUpperCase()} PHASE - UPGRADES
            </div>
            <div className="card-phase-body">
              {weapons.length > 0 && (
                <WeaponTable
                  rows={weapons.map((u) => ({ weapon: u.ability, for: u.for, pts: u.pts }))}
                />
              )}
              {rules.map((u, i) => (
                <RuleAbilityBlock key={i} ability={u.ability} pts={u.pts} forWeapon={u.for} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
