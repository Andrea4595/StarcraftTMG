import { PHASES, type Ability, type RuleAbility, type Upgrade, type WeaponProfile } from '../../types'
import { WeaponTable, type WeaponRow } from './WeaponTable'
import { RuleAbilityBlock } from './RuleAbilityBlock'
import { formatScaledCost, resolveScaledCost } from './costDisplay'

export interface UpgradeToggleState {
  /** 비용 계산 기준이 되는 현재 선택된 스쿼드 등급 */
  squadTierIndex: number
  /** 켜져 있는 업그레이드들의 unit.upgrades 배열 내 인덱스 */
  activeIndexes: number[]
  onToggle: (index: number) => void
}

type Entry = { kind: 'ability'; ability: Ability } | { kind: 'upgrade'; upgrade: Upgrade; index: number }

function entryPhase(e: Entry) {
  return e.kind === 'ability' ? e.ability.phase : e.upgrade.ability.phase
}

function entryAbility(e: Entry): Ability {
  return e.kind === 'ability' ? e.ability : e.upgrade.ability
}

export function AbilitiesSection({
  abilities,
  upgrades = [],
  resourceLabel,
  title = 'ABILITIES',
  upgradeToggle,
}: {
  abilities: Ability[]
  /** 업그레이드로 얻는 능력. 지정하면 기본 능력과 같은 페이즈 그룹 안에 함께 표시된다 */
  upgrades?: Upgrade[]
  /** 이 종족의 자원 약어 (예: 'CP', 'BM', 'EN') */
  resourceLabel: string
  title?: string
  /** 지정하면 업그레이드 PTS 배지가 켜고 끄는 버튼이 된다 (유닛 편집 화면) */
  upgradeToggle?: UpgradeToggleState
}) {
  const entries: Entry[] = [
    ...abilities.map((ability): Entry => ({ kind: 'ability', ability })),
    ...upgrades.map((upgrade, index): Entry => ({ kind: 'upgrade', upgrade, index })),
  ]
  if (entries.length === 0) return null

  const groups = PHASES.map((phase) => ({
    phase,
    items: entries.filter((e) => entryPhase(e) === phase),
  })).filter((g) => g.items.length > 0)

  const ptsLabelFor = (upgrade: Upgrade) =>
    upgradeToggle ? String(resolveScaledCost(upgrade.pts, upgradeToggle.squadTierIndex)) : formatScaledCost(upgrade.pts)
  const interactiveFor = (index: number) =>
    upgradeToggle
      ? { active: upgradeToggle.activeIndexes.includes(index), onToggle: () => upgradeToggle.onToggle(index) }
      : undefined

  return (
    <div className="card-section">
      <div className="card-section-title">{title}</div>
      {groups.map((g) => {
        const weapons = g.items.filter((e) => entryAbility(e).kind === 'weapon')
        const rules = g.items.filter((e) => entryAbility(e).kind === 'rule')
        return (
          <div className="card-phase-group" key={g.phase}>
            <div className="card-phase-header">
              <span className="card-phase-dot" />
              {g.phase.toUpperCase()} PHASE
            </div>
            <div className="card-phase-body">
              {weapons.length > 0 && (
                <WeaponTable
                  rows={weapons.map((e): WeaponRow => {
                    if (e.kind === 'ability') return { weapon: e.ability as WeaponProfile }
                    return {
                      weapon: e.upgrade.ability as WeaponProfile,
                      for: e.upgrade.for,
                      ptsLabel: ptsLabelFor(e.upgrade),
                      interactive: interactiveFor(e.index),
                    }
                  })}
                />
              )}
              {rules.map((e, i) =>
                e.kind === 'ability' ? (
                  <RuleAbilityBlock key={i} ability={e.ability as RuleAbility} resourceLabel={resourceLabel} />
                ) : (
                  <RuleAbilityBlock
                    key={i}
                    ability={e.upgrade.ability as RuleAbility}
                    resourceLabel={resourceLabel}
                    forWeapon={e.upgrade.for}
                    ptsLabel={ptsLabelFor(e.upgrade)}
                    interactive={interactiveFor(e.index)}
                  />
                ),
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
