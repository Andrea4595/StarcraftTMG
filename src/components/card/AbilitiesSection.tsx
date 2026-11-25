import { PHASES, type Ability, type RuleAbility, type UnitCard, type Upgrade, type WeaponProfile } from '../../types'
import { WeaponTable, type WeaponRow } from './WeaponTable'
import { RuleAbilityBlock } from './RuleAbilityBlock'
import { PhaseBadge } from './PhaseBadge'
import { formatScaledCost, resolveScaledCost } from './costDisplay'
import { useLocalize } from '../../LangContext'
import { abilityEnhancedBy, abilityEnhances, abilityResourceCost } from './abilityReferences'
import type { RelatedAbilityTarget } from './RelatedAbilities'
import { abilityActiveState } from '../../roster/rosterCalc'
import { forLabelWithScope, upgradeSealsBaseWeapon } from './upgradeRules'

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
  unit,
  abilities,
  upgrades = [],
  resourceLabel,
  title = 'ABILITIES',
  upgradeToggle,
  onSelectAbility,
  showRelated = true,
  forNameOf,
}: {
  /** 연관 어빌리티 항목이 지금 활성인지/비용이 얼마인지 조회할 때 쓴다 (unit.upgrades 전체가 필요).
   *  택티컬/팩션 카드처럼 유닛이 없는 경우엔 생략 — 그 카드 능력들은 항상 활성으로 취급한다 */
  unit?: UnitCard
  abilities: Ability[]
  /** 업그레이드로 얻는 능력. 지정하면 기본 능력과 같은 페이즈 그룹 안에 함께 표시된다 */
  upgrades?: Upgrade[]
  /** 이 종족의 자원 약어 (예: 'CP', 'BM', 'EN') */
  resourceLabel: string
  title?: string
  /** 지정하면 업그레이드 PTS 배지가 켜고 끄는 버튼이 된다 (유닛 편집 화면) */
  upgradeToggle?: UpgradeToggleState
  /** 지정하면 연관 어빌리티/무기 항목을 눌러 그 대상의 상세 모달로 이동할 수 있다 */
  onSelectAbility?: (ability: Ability) => void
  /**
   * '강화:' 연관 어빌리티/무기 블록을 보여줄지. 유닛 카드 전체(UnitCardView)처럼 같은 페이지 안에
   * 모든 능력이 이미 나열돼 있는 화면에서는 중복이라 꺼둔다. 어빌리티 하나만 단독으로 보여주는
   * AbilityDetailModal에서는 다른 능력으로 옮겨갈 진입점이 되므로 계속 켜둔다.
   */
  showRelated?: boolean
  /**
   * 업그레이드 능력이 upgrades가 아니라 abilities에 섞여 넘어올 때(읽기 전용 화면: 지금 적용된 능력만
   * 미리 걸러 넘기는 경우), 그 능력이 대체(FOR)하는 원본 이름을 알려준다
   */
  forNameOf?: (ability: Ability) => string | undefined
}) {
  const localize = useLocalize()
  const entries: Entry[] = [
    ...abilities.map((ability): Entry => ({ kind: 'ability', ability })),
    ...upgrades.map((upgrade, index): Entry => ({ kind: 'upgrade', upgrade, index })),
  ]
  if (entries.length === 0) return null

  /**
   * ability.enhances(데이터에 명시된 id)를 실제 Ability로 풀 때 검색 대상이 되는, 지금 이 섹션에
   * 실제로 표시되는 어빌리티/무기 전체 목록. abilities/upgrades를 그대로 쓰는 이유는, 게임 레퍼런스
   * 화면처럼 abilitiesOverride로 '지금 실제로 활성화된 것'만 걸러서 넘긴 경우 연관 표시도 그 범위
   * 안에서만 이뤄져야 하기 때문이다 — 선택하지 않은 업그레이드를 참조하는 링크가 읽기 전용 화면에
   * 나타나면 안 된다.
   */
  const allAbilities: Ability[] = [...abilities, ...upgrades.map((u) => u.ability)]
  const relatedTargets = (list: Ability[]): RelatedAbilityTarget[] =>
    list.map((a) => {
      const state = unit
        ? abilityActiveState(unit, a, {
            activeIndexes: upgradeToggle?.activeIndexes,
            squadTierIndex: upgradeToggle?.squadTierIndex,
          })
        : { active: true, cost: undefined }
      return {
        ability: a,
        onClick: onSelectAbility ? () => onSelectAbility(a) : undefined,
        active: state.active,
        cost: state.cost,
        resourceCost: abilityResourceCost(a, resourceLabel),
      }
    })

  const groups = PHASES.map((phase) => ({
    phase,
    items: entries.filter((e) => entryPhase(e) === phase),
  })).filter((g) => g.items.length > 0)

  /** 업그레이드의 forId(원본 무기/능력의 영문 id)를 그 이름의 현재 언어 표기로 바꾼다. abilities에서
   *  못 찾으면(있어선 안 되지만) id 그대로 보여준다 */
  const resolveForName = (forId: string | undefined): string | undefined => {
    if (!forId) return undefined
    const found = abilities.find((a) => a.id === forId)
    return found ? localize(found.name) : forId
  }

  const ptsLabelFor = (upgrade: Upgrade) =>
    upgradeToggle ? String(resolveScaledCost(upgrade.pts, upgradeToggle.squadTierIndex)) : formatScaledCost(upgrade.pts)
  const interactiveFor = (index: number) =>
    upgradeToggle
      ? { active: upgradeToggle.activeIndexes.includes(index), onToggle: () => upgradeToggle.onToggle(index) }
      : undefined

  /**
   * 현재 활성화된 업그레이드가 대체(봉인)하는 기본 무기 id들.
   * 일부 모델만 쓰는 무기 업그레이드(SPECIALIST, 원하는 모델만)는 나머지 모델이 여전히 원래 무기를
   * 쓰므로 원본을 봉인하지 않는다.
   */
  const sealedWeaponIds = new Set<string>()
  if (upgradeToggle) {
    for (const index of upgradeToggle.activeIndexes) {
      const upgrade = upgrades[index]
      if (upgrade?.forId && upgradeSealsBaseWeapon(upgrade)) sealedWeaponIds.add(upgrade.forId)
    }
  }

  /** 업그레이드 FOR 표기. '원하는 모델만' 업그레이드면 범위를 덧붙인다 */
  const upgradeForName = (upgrade: Upgrade): string | undefined => {
    const name = resolveForName(upgrade.forId)
    return name === undefined ? undefined : forLabelWithScope(name, upgrade, localize)
  }

  return (
    <div className="card-section">
      <div className="card-section-title">{title}</div>
      {groups.map((g) => {
        const weapons = g.items.filter((e) => entryAbility(e).kind === 'weapon')
        const rules = g.items.filter((e) => entryAbility(e).kind === 'rule')
        return (
          <div className="card-phase-group" key={g.phase}>
            <div className="card-phase-header">
              <PhaseBadge phase={g.phase} />
              {g.phase.toUpperCase()} PHASE
            </div>
            <div className="card-phase-body">
              {weapons.length > 0 && (
                <WeaponTable
                  rows={weapons.map((e): WeaponRow => {
                    if (e.kind === 'ability') {
                      return {
                        weapon: e.ability as WeaponProfile,
                        for: forNameOf?.(e.ability),
                        sealed: sealedWeaponIds.has(e.ability.id),
                        referencedBy: showRelated ? relatedTargets(abilityEnhancedBy(allAbilities, e.ability)) : undefined,
                      }
                    }
                    return {
                      weapon: e.upgrade.ability as WeaponProfile,
                      for: upgradeForName(e.upgrade),
                      ptsLabel: ptsLabelFor(e.upgrade),
                      interactive: interactiveFor(e.index),
                      referencedBy: showRelated
                        ? relatedTargets(abilityEnhancedBy(allAbilities, e.upgrade.ability))
                        : undefined,
                    }
                  })}
                />
              )}
              {rules.map((e, i) => {
                const ability = entryAbility(e) as RuleAbility
                return e.kind === 'ability' ? (
                  <RuleAbilityBlock
                    key={i}
                    ability={ability}
                    resourceLabel={resourceLabel}
                    forWeapon={forNameOf?.(ability)}
                    relatedTo={showRelated ? relatedTargets(abilityEnhances(allAbilities, ability)) : undefined}
                    referencedBy={showRelated ? relatedTargets(abilityEnhancedBy(allAbilities, ability)) : undefined}
                  />
                ) : (
                  <RuleAbilityBlock
                    key={i}
                    ability={ability}
                    resourceLabel={resourceLabel}
                    forWeapon={upgradeForName(e.upgrade)}
                    ptsLabel={ptsLabelFor(e.upgrade)}
                    interactive={interactiveFor(e.index)}
                    relatedTo={showRelated ? relatedTargets(abilityEnhances(allAbilities, ability)) : undefined}
                    referencedBy={showRelated ? relatedTargets(abilityEnhancedBy(allAbilities, ability)) : undefined}
                  />
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
