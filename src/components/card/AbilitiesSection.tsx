import { PHASES, type Ability, type RuleAbility, type Upgrade, type WeaponProfile } from '../../types'
import { WeaponTable, type WeaponRow } from './WeaponTable'
import { RuleAbilityBlock } from './RuleAbilityBlock'
import { PhaseBadge } from './PhaseBadge'
import { formatScaledCost, resolveScaledCost } from './costDisplay'
import { useLocalize } from '../../LangContext'
import { abilitiesReferencing, abilityReferencesInText } from './abilityReferences'
import type { RelatedAbilityTarget } from './RelatedAbilities'

export interface UpgradeToggleState {
  /** 비용 계산 기준이 되는 현재 선택된 스쿼드 등급 */
  squadTierIndex: number
  /** 켜져 있는 업그레이드들의 unit.upgrades 배열 내 인덱스 */
  activeIndexes: number[]
  onToggle: (index: number) => void
}

/** 이 카드/유닛에 속한 RuleAbility들의 즐겨찾기 상태를 조회/토글하는 창구 (게임 레퍼런스 화면 전용) */
export interface FavoriteToggle {
  isFavorite: (abilityId: string) => boolean
  onToggle: (abilityId: string) => void
}

/**
 * 이 카드/유닛 소유가 아닌, 다른 유닛/카드에서 즐겨찾기한 능력. ability.phase가 같은 페이즈 그룹의
 * 맨 아래에 이름만 덧붙여 보여준다 (게임 레퍼런스 유닛 상세 모달 전용).
 */
export interface CrossFavoriteRef {
  ability: RuleAbility
  sourceLabel: string
  onSelect: () => void
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
  favorite,
  crossFavorites = [],
  onSelectAbility,
}: {
  abilities: Ability[]
  /** 업그레이드로 얻는 능력. 지정하면 기본 능력과 같은 페이즈 그룹 안에 함께 표시된다 */
  upgrades?: Upgrade[]
  /** 이 종족의 자원 약어 (예: 'CP', 'BM', 'EN') */
  resourceLabel: string
  title?: string
  /** 지정하면 업그레이드 PTS 배지가 켜고 끄는 버튼이 된다 (유닛 편집 화면) */
  upgradeToggle?: UpgradeToggleState
  /** 지정하면 RuleAbility 이름 옆에 즐겨찾기 별 버튼이 붙는다 (게임 레퍼런스 화면 전용) */
  favorite?: FavoriteToggle
  /** 다른 유닛/카드에서 즐겨찾기한 능력들. 같은 phase의 그룹 하단에 이름만 덧붙인다 (게임 레퍼런스 유닛 상세 모달 전용) */
  crossFavorites?: CrossFavoriteRef[]
  /** 지정하면 연관 어빌리티/무기 항목을 눌러 그 대상의 상세 모달로 이동할 수 있다 */
  onSelectAbility?: (ability: Ability) => void
}) {
  const localize = useLocalize()
  const entries: Entry[] = [
    ...abilities.map((ability): Entry => ({ kind: 'ability', ability })),
    ...upgrades.map((upgrade, index): Entry => ({ kind: 'upgrade', upgrade, index })),
  ]
  if (entries.length === 0 && crossFavorites.length === 0) return null

  /**
   * 이름 직접 언급으로 서로를 찾을 수 있는, 지금 이 섹션에 실제로 표시되는 어빌리티/무기 전체 목록.
   * abilities/upgrades를 그대로 쓰는 이유는, 게임 레퍼런스 화면처럼 abilitiesOverride로 '지금 실제로
   * 활성화된 것'만 걸러서 넘긴 경우 연관 표시도 그 범위 안에서만 이뤄져야 하기 때문이다 — 선택하지
   * 않은 업그레이드를 참조하는 링크가 읽기 전용 화면에 나타나면 안 된다.
   */
  const allAbilities: Ability[] = [...abilities, ...upgrades.map((u) => u.ability)]
  const relatedTargets = (list: Ability[]): RelatedAbilityTarget[] =>
    list.map((a) => ({ ability: a, onClick: onSelectAbility ? () => onSelectAbility(a) : undefined }))

  const groups = PHASES.map((phase) => ({
    phase,
    items: entries.filter((e) => entryPhase(e) === phase),
    extra: crossFavorites.filter((f) => f.ability.phase === phase),
  })).filter((g) => g.items.length > 0 || g.extra.length > 0)

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
  const favoriteFor = (ability: RuleAbility) =>
    favorite ? { active: favorite.isFavorite(ability.id), onToggle: () => favorite.onToggle(ability.id) } : undefined

  /**
   * 현재 활성화된 업그레이드가 대체(봉인)하는 기본 무기 id들.
   * SPECIALIST 키워드가 붙은 업그레이드 무기는 유닛의 모델 중 하나만 사용하는 것이라, 나머지 모델은
   * 여전히 원래 무기를 쓰므로 원본을 봉인하지 않는다.
   */
  const sealedWeaponIds = new Set<string>()
  if (upgradeToggle) {
    for (const index of upgradeToggle.activeIndexes) {
      const upgrade = upgrades[index]
      if (!upgrade?.forId || upgrade.ability.kind !== 'weapon') continue
      const isSpecialist = upgrade.ability.stat.keyword.some((k) => k.name === 'SPECIALIST')
      if (isSpecialist) continue
      sealedWeaponIds.add(upgrade.forId)
    }
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
                        sealed: sealedWeaponIds.has(e.ability.id),
                        referencedBy: relatedTargets(abilitiesReferencing(allAbilities, e.ability)),
                      }
                    }
                    return {
                      weapon: e.upgrade.ability as WeaponProfile,
                      for: resolveForName(e.upgrade.forId),
                      ptsLabel: ptsLabelFor(e.upgrade),
                      interactive: interactiveFor(e.index),
                      referencedBy: relatedTargets(abilitiesReferencing(allAbilities, e.upgrade.ability)),
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
                    favorite={favoriteFor(ability)}
                    relatedTo={relatedTargets(abilityReferencesInText(allAbilities, ability))}
                    referencedBy={relatedTargets(abilitiesReferencing(allAbilities, ability))}
                  />
                ) : (
                  <RuleAbilityBlock
                    key={i}
                    ability={ability}
                    resourceLabel={resourceLabel}
                    forWeapon={resolveForName(e.upgrade.forId)}
                    ptsLabel={ptsLabelFor(e.upgrade)}
                    interactive={interactiveFor(e.index)}
                    favorite={favoriteFor(ability)}
                    relatedTo={relatedTargets(abilityReferencesInText(allAbilities, ability))}
                    referencedBy={relatedTargets(abilitiesReferencing(allAbilities, ability))}
                  />
                )
              })}
              {g.extra.length > 0 && (
                <div className="card-cross-favorites">
                  {g.extra.map((f, i) => (
                    <button type="button" className="card-cross-favorite" key={i} onClick={f.onSelect}>
                      <span className="card-favorite-star card-favorite-star-active">★</span>
                      {localize(f.ability.name)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
