import type { Faction, Roster, RosterUnitEntry, SquadScaledCost, UnitCard, UnitType } from '../types'
import { UNIT_TYPES } from '../types'

export function resolveScaledCost(cost: SquadScaledCost, squadTierIndex: number): number {
  if (typeof cost === 'number') return cost
  return cost[squadTierIndex] ?? cost[cost.length - 1] ?? 0
}

export function findUnit(faction: Faction, unitName: string): UnitCard | undefined {
  return faction.units.find((u) => u.name === unitName)
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

export function rosterMineralTotal(faction: Faction, roster: Roster): number {
  return roster.units.reduce((sum, entry) => {
    const unit = findUnit(faction, entry.unitName)
    if (!unit) return sum
    return sum + unitEntryMineralCost(unit, entry)
  }, 0)
}

function includedTacticalCards(faction: Faction, roster: Roster) {
  return [
    faction.factionCard,
    ...faction.tacticalCards.filter((c) => roster.tacticalCardNames.includes(c.name)),
  ]
}

export function rosterGasTotal(faction: Faction, roster: Roster): number {
  return faction.tacticalCards
    .filter((c) => roster.tacticalCardNames.includes(c.name))
    .reduce((sum, c) => sum + (c.gasPts ?? 0), 0)
}

export function rosterResourceTotal(faction: Faction, roster: Roster): number {
  return includedTacticalCards(faction, roster).reduce((sum, c) => sum + c.resource, 0)
}

export interface SlotUsage {
  unitType: UnitType
  budget: number
  used: number
}

/** 슬롯 수치는 '해당 타입 유닛의 Supply 합이 이 값을 넘을 수 없다'는 예산으로 해석함 */
export function rosterSlotUsage(faction: Faction, roster: Roster): SlotUsage[] {
  const budget = new Map<UnitType, number>()
  for (const card of includedTacticalCards(faction, roster)) {
    for (const slot of card.slot) {
      budget.set(slot.unitType, (budget.get(slot.unitType) ?? 0) + slot.count)
    }
  }

  const used = new Map<UnitType, number>()
  for (const entry of roster.units) {
    const unit = findUnit(faction, entry.unitName)
    const tier = unit?.squad[entry.squadTierIndex]
    if (!unit || !tier) continue
    used.set(unit.type, (used.get(unit.type) ?? 0) + tier.supply)
  }

  return UNIT_TYPES.filter((t) => budget.has(t) || used.has(t)).map((unitType) => ({
    unitType,
    budget: budget.get(unitType) ?? 0,
    used: used.get(unitType) ?? 0,
  }))
}

/** isUnique 유닛/택티컬 카드가 중복 포함됐는지 검사 (이름 기준) */
export function rosterUniqueViolations(faction: Faction, roster: Roster): string[] {
  const violations: string[] = []

  const unitNameCounts = new Map<string, number>()
  for (const entry of roster.units) {
    unitNameCounts.set(entry.unitName, (unitNameCounts.get(entry.unitName) ?? 0) + 1)
  }
  for (const [name, count] of unitNameCounts) {
    const unit = findUnit(faction, name)
    if (unit?.isUnique && count > 1) violations.push(name)
  }

  return violations
}
