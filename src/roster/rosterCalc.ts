import type {
  Ability,
  BaseSize,
  Phase,
  RaceData,
  RangeIndicator,
  Roster,
  RosterUnitEntry,
  Rule,
  TacticalCard,
  UnitCard,
  UnitType,
  Upgrade,
  WeaponProfile,
} from '../types'
import { localize, type Lang } from '../LangContext'
import { UNIT_TYPES } from '../types'
import { TOKENS } from '../data/tokens'
import { formatScaledCost, resolveScaledCost } from '../components/card/costDisplay'
import type { AbilitySelectionRef, UpgradeToggleRef, WeaponSummaryEntry, WeaponTone } from './components/AbilityChipsRow'

export { resolveScaledCost }

export function findUnit(race: RaceData, unitId: string): UnitCard | undefined {
  return race.units.find((u) => u.id === unitId)
}

export function findFactionCard(race: RaceData, roster: Roster): TacticalCard | undefined {
  return race.factionCards.find((c) => c.id === roster.factionCardId)
}

/**
 * '레이너 특공대'/'칼라이'/'케리건의 군단' 유닛 태그는 동명의 팩션 카드가 로스터에 선택돼 있어야만
 * 그 유닛을 포함할 수 있다는 뜻이다. 태그 이름이 곧 해당 팩션 카드의 id와 같다.
 */
const FACTION_LOCKED_TAGS = new Set(["Raynor's Raiders", 'Khalai', "Kerrigan's Swarm"])

/** 이 유닛이 특정 팩션 카드를 요구한다면(태그로 표시) 그 팩션 카드 id를 돌려준다. 카드 이름을
 *  UNIQUE 배지 옆에 별도 배지로 보여줄 때, 그리고 unitFactionMismatch가 함께 쓴다 */
export function unitRequiredFactionCardId(unit: UnitCard): string | undefined {
  return unit.tags.map((t) => t.name).find((name) => FACTION_LOCKED_TAGS.has(name))
}

/**
 * 이 유닛이 특정 팩션 카드를 요구하는데 로스터에 지금 선택된 팩션 카드가 다르거나 아예 없으면
 * true. 유닛 선택 모달에서 고를 수 없게 막을 때, 이미 추가된 유닛이 나중에 팩션을 바꿔서 더 이상
 * 조건을 만족하지 못하게 됐다고 경고할 때 함께 쓴다.
 */
export function unitFactionMismatch(unit: UnitCard, roster: Roster): boolean {
  const required = unitRequiredFactionCardId(unit)
  return required !== undefined && required !== roster.factionCardId
}

/**
 * 카탈로그에서 고를 수 있는 스쿼드 tier 인덱스들.
 * 뒤에 나오는(더 많은 인원의) tier와 PTS가 완전히 같은 tier는 "더 적은 인원에 같은 값"이라
 * 고를 이유가 없어(dominated) 목록에서 제외한다 (예: Zealot 1인/160pt는 2-3인/160pt와 같은 값이라
 * 제외되지만, Stalker 1인/170pt는 2인/270pt와 값이 달라 그대로 남는다). tier가 하나뿐이면 그게
 * 유일한 선택지이므로 그대로 노출한다.
 */
export function catalogSquadTierIndexes(unit: UnitCard): number[] {
  if (unit.squad.length <= 1) return unit.squad.map((_, i) => i)
  return unit.squad
    .map((_, i) => i)
    .filter((i) => !unit.squad.slice(i + 1).some((later) => later.pts === unit.squad[i].pts))
}

/**
 * 유닛에 장착된 업그레이드 목록. entry.upgradeIndexes는 사용자가 켠 순서라 그대로 쓰면 화면마다
 * 활성화 순서로 뒤죽박죽 보이므로, 유닛 카드에 나열된 순서(index 오름차순)로 정렬해 돌려준다.
 */
export function unitEquippedUpgrades(unit: UnitCard, entry: RosterUnitEntry): Upgrade[] {
  return [...entry.upgradeIndexes]
    .sort((a, b) => a - b)
    .map((i) => unit.upgrades[i])
    .filter((u): u is NonNullable<typeof u> => u !== undefined)
}

/**
 * 이 업그레이드와 같은 무기(forId)를 대체하는 다른 무기 업그레이드들의 인덱스. 하나를 켜면 이들은
 * 자동으로 꺼져야 한다 — 같은 기본 무기를 두 번 대체할 수는 없다.
 */
export function upgradeExclusiveWith(unit: UnitCard, index: number): number[] {
  const target = unit.upgrades[index]
  if (!target || target.ability.kind !== 'weapon' || !target.forId) return []
  return unit.upgrades
    .map((_, i) => i)
    .filter((i) => i !== index && unit.upgrades[i].ability.kind === 'weapon' && unit.upgrades[i].forId === target.forId)
}

export function unitEntryMineralCost(unit: UnitCard, entry: RosterUnitEntry): number {
  const tier = unit.squad[entry.squadTierIndex]
  if (!tier) return 0
  const upgradesCost = entry.upgradeIndexes.reduce((sum, idx) => {
    const upgrade = unit.upgrades[idx]
    if (!upgrade) return sum
    return sum + resolveScaledCost(upgrade.pts, entry.squadTierIndex)
  }, 0)
  return tier.pts + upgradesCost
}

export function rosterMineralTotal(race: RaceData, roster: Roster): number {
  return roster.units.reduce((sum, entry) => {
    const unit = findUnit(race, entry.unitId)
    if (!unit) return sum
    return sum + unitEntryMineralCost(unit, entry)
  }, 0)
}

/** 모든 유닛 항목의(현재 선택된 스쿼드 등급 기준) 서플라이 합. 슬롯 예산과 달리 유닛 타입 구분 없이 전체 총합 하나만 필요할 때 쓴다 */
export function rosterSupplyTotal(race: RaceData, roster: Roster): number {
  return roster.units.reduce((sum, entry) => {
    const unit = findUnit(race, entry.unitId)
    const tier = unit?.squad[entry.squadTierIndex]
    return sum + (tier?.supply ?? 0)
  }, 0)
}

/** tacticalCardIds는 멀티셋(중복 id = 여러 장)이므로 id마다 race.tacticalCards에서 다시 찾아 개수만큼 나열한다 */
function includedTacticalCards(race: RaceData, roster: Roster): TacticalCard[] {
  const factionCard = findFactionCard(race, roster)
  const picked = roster.tacticalCardIds
    .map((id) => race.tacticalCards.find((c) => c.id === id))
    .filter((c): c is TacticalCard => c !== undefined)
  return [...(factionCard ? [factionCard] : []), ...picked]
}

/** 로스터에 포함된 택티컬 카드(팩션 카드 제외)를 id별로 묶어 카드 원본과 개수를 함께 반환한다 */
export function groupedTacticalCards(race: RaceData, roster: Roster): { card: TacticalCard; count: number }[] {
  const counts = new Map<string, number>()
  for (const id of roster.tacticalCardIds) {
    counts.set(id, (counts.get(id) ?? 0) + 1)
  }
  return [...counts.entries()]
    .map(([id, count]) => {
      const card = race.tacticalCards.find((c) => c.id === id)
      return card ? { card, count } : null
    })
    .filter((v): v is { card: TacticalCard; count: number } => v !== null)
}

export function rosterGasTotal(race: RaceData, roster: Roster): number {
  return roster.tacticalCardIds.reduce((sum, id) => {
    const card = race.tacticalCards.find((c) => c.id === id)
    return sum + (card?.gasPts ?? 0)
  }, 0)
}

/** 가스 예산은 미네랄 예산의 1/10로 고정 */
export function rosterGasCap(roster: Roster): number {
  return Math.floor(roster.mineralCap / 10)
}

export function rosterResourceTotal(race: RaceData, roster: Roster): number {
  return includedTacticalCards(race, roster).reduce((sum, c) => sum + c.resource, 0)
}

export interface SlotUsage {
  unitType: UnitType
  budget: number
  used: number
}

/** 카드에서 슬롯을 부여받는 타입들. 'Other'는 어떤 카드도 슬롯을 부여하지 않아 예산 개념이 없다 */
export const TRACKED_UNIT_TYPES: UnitType[] = UNIT_TYPES.filter((t) => t !== 'Other')

/** 슬롯 수치는 '해당 타입 유닛의 Supply 합이 이 값을 넘을 수 없다'는 예산으로 해석함 */
export function rosterSlotUsage(race: RaceData, roster: Roster): SlotUsage[] {
  const budget = new Map<UnitType, number>()
  for (const card of includedTacticalCards(race, roster)) {
    for (const slot of card.slot) {
      budget.set(slot.unitType, (budget.get(slot.unitType) ?? 0) + slot.count)
    }
  }

  const used = new Map<UnitType, number>()
  for (const entry of roster.units) {
    const unit = findUnit(race, entry.unitId)
    const tier = unit?.squad[entry.squadTierIndex]
    if (!unit || !tier) continue
    used.set(unit.type, (used.get(unit.type) ?? 0) + tier.supply)
  }

  return TRACKED_UNIT_TYPES.filter((t) => budget.has(t) || used.has(t)).map((unitType) => ({
    unitType,
    budget: budget.get(unitType) ?? 0,
    used: used.get(unitType) ?? 0,
  }))
}

/** isUnique 유닛/택티컬 카드가 중복 포함됐는지 검사 (id 기준). 화면에 표시할 이름은 호출부에서 localize한다 */
export function rosterUniqueViolations(race: RaceData, roster: Roster): Rule[] {
  const violations: Rule[] = []

  const unitIdCounts = new Map<string, number>()
  for (const entry of roster.units) {
    unitIdCounts.set(entry.unitId, (unitIdCounts.get(entry.unitId) ?? 0) + 1)
  }
  for (const [id, count] of unitIdCounts) {
    const unit = findUnit(race, id)
    if (unit?.isUnique && count > 1) violations.push(unit.name)
  }

  const tacticalCardIdCounts = new Map<string, number>()
  for (const id of roster.tacticalCardIds) {
    tacticalCardIdCounts.set(id, (tacticalCardIdCounts.get(id) ?? 0) + 1)
  }
  for (const [id, count] of tacticalCardIdCounts) {
    const card = race.tacticalCards.find((c) => c.id === id)
    if (card?.isUnique && count > 1) violations.push(card.name)
  }

  return violations
}

/**
 * 이 유닛 엔트리에 실제로 적용된 능력만 반환한다: 기본 능력 중 활성 업그레이드로 대체(봉인)된 것은 빼고,
 * 활성 업그레이드가 제공하는 능력을 더한다. AbilitiesSection의 sealedWeaponNames 계산과 동일한 규칙
 * (SPECIALIST 키워드가 붙은 무기 업그레이드는 원본을 대체하지 않고 같이 쓰인다)을 따른다.
 */
export function unitActiveAbilities(unit: UnitCard, entry: RosterUnitEntry): Ability[] {
  const activeUpgrades = entry.upgradeIndexes
    .map((i) => unit.upgrades[i])
    .filter((u): u is UnitCard['upgrades'][number] => u !== undefined)

  const sealedIds = new Set<string>()
  for (const upgrade of activeUpgrades) {
    if (!upgrade.forId || upgrade.ability.kind !== 'weapon') continue
    const isSpecialist = upgrade.ability.stat.keyword.some((k) => k.name === 'SPECIALIST')
    if (isSpecialist) continue
    sealedIds.add(upgrade.forId)
  }

  const baseAbilities = unit.abilities.filter((a) => !sealedIds.has(a.id))
  return [...baseAbilities, ...activeUpgrades.map((u) => u.ability)]
}

/**
 * 이 유닛의 업그레이드 능력이 대체(FOR)하는 원본 능력의 로컬라이즈된 이름을 조회하는 함수를 만든다.
 * 업그레이드가 아니거나 forId가 없으면 undefined를 돌려준다. AbilityChipsRow처럼 능력 하나만 아는
 * 문맥(칩, 단독 상세 모달)에서 AbilitiesSection.resolveForName과 동등한 정보를 얻기 위해 쓴다.
 */
export function unitForLabelResolver(
  unit: UnitCard,
  localize: (rule: Rule) => string,
): (ability: Ability) => string | undefined {
  const forIdByAbility = new Map<Ability, string>()
  for (const upgrade of unit.upgrades) {
    if (upgrade.forId) forIdByAbility.set(upgrade.ability, upgrade.forId)
  }
  return (ability) => {
    const forId = forIdByAbility.get(ability)
    if (!forId) return undefined
    const found = unit.abilities.find((a) => a.id === forId)
    return found ? localize(found.name) : forId
  }
}

/**
 * 이름 직접 언급으로 찾은 연관 어빌리티/무기(ability)를 눌렀을 때 열 상세 모달의 참조를 만든다.
 * 무기면 그 무기가 속한 페이즈의 종합 모달(사격/근접 공격)로, 룰 어빌리티면 단독 상세 모달로
 * 이동한다. entryId가 없으면(예: 다른 유닛에서 즐겨찾기한 능력을 보는 중이라 롤 항목을 확정할 수
 * 없을 때) 무기 참조의 entryId는 빈 문자열로 채워지므로, 호출부가 entryId 유무로 클릭 가능 여부를
 * 미리 걸러야 한다.
 */
export function abilitySelectionRefFor(
  unit: UnitCard,
  ability: Ability,
  ctx: {
    sourceId: string
    sourceLabel: string
    unitType?: UnitType
    entryId?: string
    localize: (rule: Rule) => string
    /** true면(로스터 편집 화면) 대상이 업그레이드 능력일 때 PTS 토글 버튼 정보를 함께 채운다 */
    interactive?: boolean
  },
): AbilitySelectionRef {
  if (ability.kind === 'weapon') {
    return {
      kind: 'weapon-summary',
      sourceLabel: ctx.sourceLabel,
      sourceId: ctx.sourceId,
      unitType: ctx.unitType,
      label: ability.phase === 'Assault' ? FIRE_LABEL : MELEE_LABEL,
      entryId: ctx.entryId ?? '',
      phase: ability.phase,
    }
  }
  const upgradeIndex = unit.upgrades.findIndex((u) => u.ability.id === ability.id)
  const upgrade = upgradeIndex >= 0 ? unit.upgrades[upgradeIndex] : undefined
  return {
    kind: 'ability',
    ability,
    sourceLabel: ctx.sourceLabel,
    sourceId: ctx.sourceId,
    unitType: ctx.unitType,
    entryId: ctx.entryId,
    forLabel: unitForLabelResolver(unit, ctx.localize)(ability),
    upgradeToggle:
      ctx.interactive && upgrade && ctx.entryId
        ? { entryId: ctx.entryId, upgradeIndex, pts: upgrade.pts, exclusiveWith: upgradeExclusiveWith(unit, upgradeIndex) }
        : undefined,
  }
}

/**
 * 이름 직접 언급으로 찾은 연관 어빌리티/무기(ability)가 지금 활성인지, 업그레이드라면 비용이 얼마인지
 * 알려준다. 기본 능력(업그레이드가 아님)은 항상 활성으로, 비용 없이 취급한다.
 *
 * activeIndexes를 지정하지 않으면(예: 다른 유닛에서 즐겨찾기한 능력이라 로스터 항목을 확정할 수
 * 없을 때) 항상 활성으로 본다 — 게임 레퍼런스 화면의 유닛 상세 카드처럼 애초에 활성인 것만 골라
 * 넘긴 목록에서도 이 함수를 그대로 쓸 수 있도록 하기 위해서다.
 */
/**
 * 지금 활성화된 업그레이드가 대체(봉인)하는 기본 무기 id들. SPECIALIST 키워드가 붙은 업그레이드
 * 무기는 유닛의 모델 중 하나만 사용하는 것이라, 나머지 모델은 여전히 원래 무기를 쓰므로 원본을
 * 봉인하지 않는다.
 */
function sealedWeaponIds(unit: UnitCard, activeIndexes: number[]): Set<string> {
  const sealed = new Set<string>()
  for (const i of activeIndexes) {
    const upgrade = unit.upgrades[i]
    if (!upgrade?.forId || upgrade.ability.kind !== 'weapon') continue
    const isSpecialist = upgrade.ability.stat.keyword.some((k) => k.name === 'SPECIALIST')
    if (isSpecialist) continue
    sealed.add(upgrade.forId)
  }
  return sealed
}

export function abilityActiveState(
  unit: UnitCard,
  ability: Ability,
  ctx: { activeIndexes?: number[]; squadTierIndex?: number },
): { active: boolean; cost?: string } {
  const upgradeIndex = unit.upgrades.findIndex((u) => u.ability.id === ability.id)
  if (upgradeIndex === -1) {
    /** 기본 능력: 활성 업그레이드가 대체(봉인)하고 있으면 비활성으로 취급한다 */
    const sealed = ctx.activeIndexes ? sealedWeaponIds(unit, ctx.activeIndexes).has(ability.id) : false
    return { active: !sealed }
  }
  const upgrade = unit.upgrades[upgradeIndex]
  return {
    active: ctx.activeIndexes ? ctx.activeIndexes.includes(upgradeIndex) : true,
    cost:
      ctx.squadTierIndex !== undefined
        ? String(resolveScaledCost(upgrade.pts, ctx.squadTierIndex))
        : formatScaledCost(upgrade.pts),
  }
}

/** unitAbilityChipEntries가 돌려주는 능력 하나. 기본 능력이면 upgradeActive가 undefined다 */
export interface AbilityChipEntry {
  ability: Ability
  /** 업그레이드에서 나온 능력일 때만 지정: 로스터에서 지금 이 업그레이드가 켜져 있는지 */
  upgradeActive?: boolean
  /** 업그레이드에서 나온 능력일 때만 지정: 현재 스쿼드 등급 기준 비용 */
  upgradePts?: number
}

/**
 * 로스터 편집 화면 전용: unitActiveAbilities와 달리 꺼진 업그레이드의 능력도 함께 반환한다(대신
 * upgradeActive: false로 표시). 활성 업그레이드에 봉인된 기본 능력도 빼지 않고 그대로 남기되,
 * 마찬가지로 upgradeActive: false를 줘서 꺼진 업그레이드와 같은 톤(어둡게)으로 보이게 한다 — 칩이
 * 통째로 사라지면 이 유닛에 그 무기/능력이 원래 있었다는 사실 자체를 잊기 쉽다.
 */
export function unitAbilityChipEntries(unit: UnitCard, entry: RosterUnitEntry): AbilityChipEntry[] {
  const activeIndexes = new Set(entry.upgradeIndexes)
  const sealedIds = sealedWeaponIds(unit, entry.upgradeIndexes)

  const baseEntries: AbilityChipEntry[] = unit.abilities.map((ability) => ({
    ability,
    upgradeActive: sealedIds.has(ability.id) ? false : undefined,
  }))

  const upgradeEntries: AbilityChipEntry[] = unit.upgrades.map((u, i) => ({
    ability: u.ability,
    upgradeActive: activeIndexes.has(i),
    upgradePts: resolveScaledCost(u.pts, entry.squadTierIndex),
  }))

  return [...baseEntries, ...upgradeEntries]
}

/** 무기 종합 칩의 이름 앞에 붙는 라벨 */
export const FIRE_LABEL: Rule = { en: 'Fire', ko: '사격' }
export const MELEE_LABEL: Rule = { en: 'Melee', ko: '근접 공격' }

/**
 * 이 유닛이 가진 특정 phase의 무기 프로필을 모두 모아 '사격'/'근접 공격' 종합 칩에 쓸 형태로
 * 정리한다. 대체되지 않은 기본 무기는 'base', 활성 업그레이드로 얻은 무기는 'active', 업그레이드가
 * 있지만 켜지지 않았거나(미선택) 다른 활성 업그레이드에 봉인된 기본 무기는 'inactive'로 분류한다 —
 * unitAbilityChipEntries가 이미 이 세 가지를 upgradeActive(undefined/true/false)로 구분해주므로
 * 그대로 물려받는다. 업그레이드로 나온 무기는 상세 모달의 켜기/끄기 버튼에 쓸 upgradeToggle도 함께
 * 채운다 — 실제로 그 버튼을 누를 수 있게 할지는 호출부(모달)가 따로 결정한다(게임 레퍼런스는 읽기 전용).
 */
export function unitWeaponSummaryEntries(
  unit: UnitCard,
  entry: RosterUnitEntry,
  phase: Phase,
  localize: (rule: Rule) => string,
): WeaponSummaryEntry[] {
  const forFor = unitForLabelResolver(unit, localize)
  const upgradeIndexByAbility = new Map<Ability, number>(unit.upgrades.map((u, i) => [u.ability, i]))
  return unitAbilityChipEntries(unit, entry)
    .filter((e) => e.ability.kind === 'weapon' && e.ability.phase === phase)
    .map((e) => {
      const tone: WeaponTone = e.upgradeActive === undefined ? 'base' : e.upgradeActive ? 'active' : 'inactive'
      const i = upgradeIndexByAbility.get(e.ability)
      const upgradeToggle: UpgradeToggleRef | undefined =
        i === undefined
          ? undefined
          : { entryId: entry.id, upgradeIndex: i, pts: unit.upgrades[i].pts, exclusiveWith: upgradeExclusiveWith(unit, i) }
      return { ability: e.ability as WeaponProfile, tone, forLabel: forFor(e.ability), upgradeToggle }
    })
}

/** 이 유닛의 어썰트 페이즈(원거리) 무기 프로필을 '사격' 종합 칩에 쓸 형태로 정리한다 */
export function unitRangedWeaponEntries(
  unit: UnitCard,
  entry: RosterUnitEntry,
  localize: (rule: Rule) => string,
): WeaponSummaryEntry[] {
  return unitWeaponSummaryEntries(unit, entry, 'Assault', localize)
}

/** 이 유닛의 컴뱃 페이즈(근접) 무기 프로필을 '근접 공격' 종합 칩에 쓸 형태로 정리한다 */
export function unitMeleeWeaponEntries(
  unit: UnitCard,
  entry: RosterUnitEntry,
  localize: (rule: Rule) => string,
): WeaponSummaryEntry[] {
  return unitWeaponSummaryEntries(unit, entry, 'Combat', localize)
}

export interface PhaseAbilityGroup {
  /** 화면에 보여줄 이름. 같은 유닛이 로스터에 여러 장이면 "해병 #2"처럼 번호가 붙는다 */
  sourceLabel: string
  /**
   * 즐겨찾기 식별에 쓰는 안정적인 id(유닛/카드 원본 id). sourceLabel과 달리 로스터에 같은 유닛이
   * 몇 장 있든 항상 같은 값이라, 즐겨찾기는 유닛/카드 종류 단위로 공유된다.
   */
  sourceId: string
  /** 유닛에서 나온 그룹일 때만 지정 (색상 강조용) */
  unitType?: UnitType
  abilities: Ability[]
}

/** 로스터에 포함된 모든 카드/유닛의 능력을 출처별로 묶는다 (페이즈/즐겨찾기 필터는 호출부에서 따로 적용) */
function rosterAbilitySources(race: RaceData, roster: Roster, lang: Lang): PhaseAbilityGroup[] {
  const groups: PhaseAbilityGroup[] = []

  const factionCard = findFactionCard(race, roster)
  if (factionCard) {
    groups.push({
      sourceLabel: localize(factionCard.name, lang),
      sourceId: factionCard.id,
      abilities: factionCard.cardAbilities,
    })
  }

  for (const { card } of groupedTacticalCards(race, roster)) {
    groups.push({ sourceLabel: localize(card.name, lang), sourceId: card.id, abilities: card.cardAbilities })
  }

  const idTotal = new Map<string, number>()
  for (const entry of roster.units) idTotal.set(entry.unitId, (idTotal.get(entry.unitId) ?? 0) + 1)
  const idSeen = new Map<string, number>()

  for (const entry of roster.units) {
    const unit = findUnit(race, entry.unitId)
    if (!unit) continue
    const seen = (idSeen.get(entry.unitId) ?? 0) + 1
    idSeen.set(entry.unitId, seen)
    const unitLabel = localize(unit.name, lang)
    const sourceLabel = (idTotal.get(entry.unitId) ?? 0) > 1 ? `${unitLabel} #${seen}` : unitLabel

    groups.push({ sourceLabel, sourceId: unit.id, unitType: unit.type, abilities: unitActiveAbilities(unit, entry) })
  }

  return groups
}

function byPhase(ability: Ability, phase: Phase): boolean {
  return ability.phase === phase || ability.phase === 'Any'
}

/** 로스터에 포함된 모든 카드/유닛 중, 지정한 페이즈(+Any)에 실제로 쓸 수 있는 능력만 출처별로 묶어 반환한다 */
export function rosterAbilitiesByPhase(race: RaceData, roster: Roster, phase: Phase, lang: Lang): PhaseAbilityGroup[] {
  return rosterAbilitySources(race, roster, lang)
    .map((g) => ({ ...g, abilities: g.abilities.filter((a) => byPhase(a, phase)) }))
    .filter((g) => g.abilities.length > 0)
}

export function isFavoriteAbility(roster: Roster, sourceId: string, abilityId: string): boolean {
  return roster.favoriteAbilities.some((f) => f.sourceId === sourceId && f.abilityId === abilityId)
}

/** 로스터 전체에서 즐겨찾기된 능력만 출처별로 묶어 반환한다. 무기 프로필은 즐겨찾기 대상이 아니다 */
export function rosterFavoriteAbilities(race: RaceData, roster: Roster, lang: Lang): PhaseAbilityGroup[] {
  return rosterAbilitySources(race, roster, lang)
    .map((g) => ({
      ...g,
      abilities: g.abilities.filter((a) => a.kind === 'rule' && isFavoriteAbility(roster, g.sourceId, a.id)),
    }))
    .filter((g) => g.abilities.length > 0)
}

function baseSizeToMm(baseSize: BaseSize): { width: number; height: number } {
  return baseSize.shape === 'circle'
    ? { width: baseSize.diameterMm, height: baseSize.diameterMm }
    : { width: baseSize.widthMm, height: baseSize.lengthMm }
}

export interface SimulatorExportRange {
  inch: number
  always_show: boolean
}

function toExportRanges(ranges: RangeIndicator[] | undefined): SimulatorExportRange[] {
  return (ranges ?? []).map((r) => ({ inch: r.inch, always_show: r.alwaysShow }))
}

export interface SimulatorExportUnit {
  name: string
  model_count: number
  base_mm: { width: number; height: number }
  move_inch: number
  coherency_inch: number
  is_displacement: boolean
  ranges: SimulatorExportRange[]
}

export interface SimulatorExportToken {
  name: string
  base_mm: { width: number; height: number }
  is_displacement: boolean
  ranges: SimulatorExportRange[]
}

export interface SimulatorExportData {
  roster_name: string
  units: SimulatorExportUnit[]
  tokens: SimulatorExportToken[]
}

/** 로스터에 포함된 유닛/팩션 카드/택티컬 카드의 능력을 훑어, 배치되는 토큰 종류의 id를 중복 없이 모은다 */
function rosterPlacedTokenIds(race: RaceData, roster: Roster): Set<string> {
  const ids = new Set<string>()
  const collect = (abilities: Ability[]) => {
    for (const ability of abilities) {
      if (ability.kind === 'rule' && ability.placesTokenId) ids.add(ability.placesTokenId)
    }
  }

  const factionCard = findFactionCard(race, roster)
  if (factionCard) collect(factionCard.cardAbilities)
  for (const { card } of groupedTacticalCards(race, roster)) collect(card.cardAbilities)
  for (const entry of roster.units) {
    const unit = findUnit(race, entry.unitId)
    if (unit) collect(unitActiveAbilities(unit, entry))
  }

  return ids
}

/** 외부 시뮬레이터 연동용 데이터. 이동 불가 유닛(spd가 null)은 move/coherency를 0으로 채운다 */
export function buildSimulatorExport(race: RaceData, roster: Roster, localize: (rule: Rule) => string): SimulatorExportData {
  const units: SimulatorExportUnit[] = []
  for (const entry of roster.units) {
    const unit = findUnit(race, entry.unitId)
    const tier = unit?.squad[entry.squadTierIndex]
    if (!unit || !tier) continue
    units.push({
      name: localize(unit.name),
      model_count: tier.modelMax,
      base_mm: baseSizeToMm(unit.baseSize),
      move_inch: unit.stat.spd?.move ?? 0,
      coherency_inch: unit.stat.spd?.cohesion ?? 0,
      is_displacement: unit.hasDisplacement ?? false,
      ranges: toExportRanges(unit.ranges),
    })
  }

  const tokens: SimulatorExportToken[] = [...rosterPlacedTokenIds(race, roster)]
    .map((id) => TOKENS.find((t) => t.id === id))
    .filter((t): t is (typeof TOKENS)[number] => t !== undefined)
    .map((t) => ({
      name: localize(t.name),
      base_mm: t.base_mm,
      is_displacement: t.is_displacement,
      ranges: toExportRanges(t.ranges),
    }))

  return { roster_name: roster.name, units, tokens }
}
