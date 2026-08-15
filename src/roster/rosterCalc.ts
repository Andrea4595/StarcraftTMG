import type { Ability, Phase, RaceData, Roster, RosterUnitEntry, TacticalCard, UnitCard, UnitType, Upgrade } from '../types'
import { UNIT_TYPES } from '../types'
import { resolveScaledCost } from '../components/card/costDisplay'

export { resolveScaledCost }

export function findUnit(race: RaceData, unitName: string): UnitCard | undefined {
  return race.units.find((u) => u.name === unitName)
}

export function findFactionCard(race: RaceData, roster: Roster): TacticalCard | undefined {
  return race.factionCards.find((c) => c.name === roster.factionCardName)
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
    const unit = findUnit(race, entry.unitName)
    if (!unit) return sum
    return sum + unitEntryMineralCost(unit, entry)
  }, 0)
}

/** tacticalCardNames는 멀티셋(중복 이름 = 여러 장)이므로 이름마다 race.tacticalCards에서 다시 찾아 개수만큼 나열한다 */
function includedTacticalCards(race: RaceData, roster: Roster): TacticalCard[] {
  const factionCard = findFactionCard(race, roster)
  const picked = roster.tacticalCardNames
    .map((name) => race.tacticalCards.find((c) => c.name === name))
    .filter((c): c is TacticalCard => c !== undefined)
  return [...(factionCard ? [factionCard] : []), ...picked]
}

/** 로스터에 포함된 택티컬 카드(팩션 카드 제외)를 이름별로 묶어 카드 원본과 개수를 함께 반환한다 */
export function groupedTacticalCards(race: RaceData, roster: Roster): { card: TacticalCard; count: number }[] {
  const counts = new Map<string, number>()
  for (const name of roster.tacticalCardNames) {
    counts.set(name, (counts.get(name) ?? 0) + 1)
  }
  return [...counts.entries()]
    .map(([name, count]) => {
      const card = race.tacticalCards.find((c) => c.name === name)
      return card ? { card, count } : null
    })
    .filter((v): v is { card: TacticalCard; count: number } => v !== null)
}

export function rosterGasTotal(race: RaceData, roster: Roster): number {
  return roster.tacticalCardNames.reduce((sum, name) => {
    const card = race.tacticalCards.find((c) => c.name === name)
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
    const unit = findUnit(race, entry.unitName)
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

/** isUnique 유닛/택티컬 카드가 중복 포함됐는지 검사 (이름 기준) */
export function rosterUniqueViolations(race: RaceData, roster: Roster): string[] {
  const violations: string[] = []

  const unitNameCounts = new Map<string, number>()
  for (const entry of roster.units) {
    unitNameCounts.set(entry.unitName, (unitNameCounts.get(entry.unitName) ?? 0) + 1)
  }
  for (const [name, count] of unitNameCounts) {
    const unit = findUnit(race, name)
    if (unit?.isUnique && count > 1) violations.push(name)
  }

  const tacticalCardNameCounts = new Map<string, number>()
  for (const name of roster.tacticalCardNames) {
    tacticalCardNameCounts.set(name, (tacticalCardNameCounts.get(name) ?? 0) + 1)
  }
  for (const [name, count] of tacticalCardNameCounts) {
    const card = race.tacticalCards.find((c) => c.name === name)
    if (card?.isUnique && count > 1) violations.push(name)
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

  const sealedNames = new Set<string>()
  for (const upgrade of activeUpgrades) {
    if (!upgrade.for || upgrade.ability.kind !== 'weapon') continue
    const isSpecialist = upgrade.ability.stat.keyword.some((k) => k.name === 'SPECIALIST')
    if (isSpecialist) continue
    sealedNames.add(upgrade.for)
  }

  const baseAbilities = unit.abilities.filter((a) => !sealedNames.has(a.name))
  return [...baseAbilities, ...activeUpgrades.map((u) => u.ability)]
}

export interface PhaseAbilityGroup {
  sourceLabel: string
  /** 유닛에서 나온 그룹일 때만 지정 (색상 강조용) */
  unitType?: UnitType
  abilities: Ability[]
}

function byPhase(ability: Ability, phase: Phase): boolean {
  return ability.phase === phase || ability.phase === 'Any'
}

/** 로스터에 포함된 모든 카드/유닛 중, 지정한 페이즈(+Any)에 실제로 쓸 수 있는 능력만 출처별로 묶어 반환한다 */
export function rosterAbilitiesByPhase(race: RaceData, roster: Roster, phase: Phase): PhaseAbilityGroup[] {
  const groups: PhaseAbilityGroup[] = []

  const factionCard = findFactionCard(race, roster)
  if (factionCard) {
    const abilities = factionCard.cardAbilities.filter((a) => byPhase(a, phase))
    if (abilities.length > 0) groups.push({ sourceLabel: factionCard.name, abilities })
  }

  for (const { card } of groupedTacticalCards(race, roster)) {
    const abilities = card.cardAbilities.filter((a) => byPhase(a, phase))
    if (abilities.length > 0) groups.push({ sourceLabel: card.name, abilities })
  }

  const nameTotal = new Map<string, number>()
  for (const entry of roster.units) nameTotal.set(entry.unitName, (nameTotal.get(entry.unitName) ?? 0) + 1)
  const nameSeen = new Map<string, number>()

  for (const entry of roster.units) {
    const unit = findUnit(race, entry.unitName)
    if (!unit) continue
    const seen = (nameSeen.get(entry.unitName) ?? 0) + 1
    nameSeen.set(entry.unitName, seen)
    const sourceLabel = (nameTotal.get(entry.unitName) ?? 0) > 1 ? `${unit.name} #${seen}` : unit.name

    const abilities = unitActiveAbilities(unit, entry).filter((a) => byPhase(a, phase))
    if (abilities.length > 0) groups.push({ sourceLabel, unitType: unit.type, abilities })
  }

  return groups
}
