import type { RaceData, Roster, RosterUnitEntry, TacticalCard, UnitCard, UnitType } from '../types'
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
 * 최소 인원 tier(0번)는 실전에서 선택할 이유가 없어 목록에서 제외한다 (tier가 하나뿐이면 그대로 노출).
 */
export function catalogSquadTierIndexes(unit: UnitCard): number[] {
  if (unit.squad.length <= 1) return unit.squad.map((_, i) => i)
  return unit.squad.map((_, i) => i).slice(1)
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
