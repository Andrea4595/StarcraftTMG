import type {
  Ability,
  Phase,
  RaceData,
  Roster,
  RosterUnitEntry,
  Rule,
  TacticalCard,
  UnitCard,
  UnitType,
  Upgrade,
} from '../types'
import { localize, type Lang } from '../LangContext'
import { UNIT_TYPES } from '../types'
import { resolveScaledCost } from '../components/card/costDisplay'

export { resolveScaledCost }

export function findUnit(race: RaceData, unitId: string): UnitCard | undefined {
  return race.units.find((u) => u.id === unitId)
}

export function findFactionCard(race: RaceData, roster: Roster): TacticalCard | undefined {
  return race.factionCards.find((c) => c.id === roster.factionCardId)
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

/** unitAbilityChipEntries가 돌려주는 능력 하나. 기본 능력이면 upgradeActive가 undefined다 */
export interface AbilityChipEntry {
  ability: Ability
  /** 업그레이드에서 나온 능력일 때만 지정: 로스터에서 지금 이 업그레이드가 켜져 있는지 */
  upgradeActive?: boolean
}

/**
 * 로스터 편집 화면 전용: unitActiveAbilities와 달리 꺼진 업그레이드의 능력도 함께 반환한다(대신
 * upgradeActive: false로 표시). 활성 업그레이드가 원본을 봉인하는 규칙은 그대로 적용되므로, 봉인된
 * 기본 능력은 여전히 빠진다 — 봉인은 '켜졌을 때 실제로 일어나는 일'이라 꺼진 업그레이드는 아무것도
 * 봉인하지 않는다.
 */
export function unitAbilityChipEntries(unit: UnitCard, entry: RosterUnitEntry): AbilityChipEntry[] {
  const activeIndexes = new Set(entry.upgradeIndexes)

  const sealedIds = new Set<string>()
  for (const i of activeIndexes) {
    const upgrade = unit.upgrades[i]
    if (!upgrade?.forId || upgrade.ability.kind !== 'weapon') continue
    const isSpecialist = upgrade.ability.stat.keyword.some((k) => k.name === 'SPECIALIST')
    if (isSpecialist) continue
    sealedIds.add(upgrade.forId)
  }

  const baseEntries: AbilityChipEntry[] = unit.abilities
    .filter((a) => !sealedIds.has(a.id))
    .map((ability) => ({ ability }))

  const upgradeEntries: AbilityChipEntry[] = unit.upgrades.map((u, i) => ({
    ability: u.ability,
    upgradeActive: activeIndexes.has(i),
  }))

  return [...baseEntries, ...upgradeEntries]
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
