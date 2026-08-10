import type { Faction, Roster } from '../../types'
import { useRosterStore } from '../RosterContext'
import { findUnit, rosterGasTotal, rosterMineralTotal, rosterResourceTotal, rosterSlotUsage, rosterUniqueViolations } from '../rosterCalc'
import { UnitEntryRow } from './UnitEntryRow'

export function RosterPanel({ faction, roster }: { faction: Faction; roster: Roster }) {
  const store = useRosterStore()
  const mineralTotal = rosterMineralTotal(faction, roster)
  const gasTotal = rosterGasTotal(faction, roster)
  const resourceTotal = rosterResourceTotal(faction, roster)
  const slotUsage = rosterSlotUsage(faction, roster)
  const uniqueViolations = rosterUniqueViolations(faction, roster)
  const overCap = mineralTotal > roster.mineralCap

  const includedTacticalCards = faction.tacticalCards.filter((c) => roster.tacticalCardNames.includes(c.name))

  return (
    <div className="roster-panel">
      <div className="roster-budget">
        <label className="roster-mineral-cap">
          미네랄 예산
          <input
            type="number"
            min={0}
            value={roster.mineralCap}
            onChange={(e) => store.setMineralCap(roster.id, Number(e.target.value))}
          />
        </label>
        <div className={`roster-budget-line ${overCap ? 'roster-budget-over' : ''}`}>
          미네랄 {mineralTotal} / {roster.mineralCap}
        </div>
        <div className="roster-budget-line">가스 {gasTotal}</div>
        <div className="roster-budget-line">CP {resourceTotal}</div>
      </div>

      {slotUsage.length > 0 && (
        <div className="roster-slots">
          {slotUsage.map((s) => (
            <div key={s.unitType} className={`roster-slot-line ${s.used > s.budget ? 'roster-budget-over' : ''}`}>
              {s.unitType} 슬롯(Supply) {s.used} / {s.budget}
            </div>
          ))}
        </div>
      )}

      {uniqueViolations.length > 0 && (
        <div className="roster-warning">Unique 중복: {uniqueViolations.join(', ')}</div>
      )}

      <div className="roster-section-title">택티컬 카드</div>
      <div className="roster-tactical-list">
        <div className="roster-tactical-chip roster-tactical-chip-fixed">{faction.factionCard.name}</div>
        {includedTacticalCards.map((c) => (
          <div className="roster-tactical-chip" key={c.name}>
            {c.name}
            <button type="button" onClick={() => store.toggleTacticalCard(roster.id, c.name)}>
              제외
            </button>
          </div>
        ))}
      </div>

      <div className="roster-section-title">유닛 ({roster.units.length})</div>
      <div className="roster-unit-list">
        {roster.units.length === 0 && <div className="roster-empty">오른쪽 목록에서 유닛을 추가하세요.</div>}
        {roster.units.map((entry) => {
          const unit = findUnit(faction, entry.unitName)
          if (!unit) return null
          return <UnitEntryRow key={entry.id} roster={roster} unit={unit} entry={entry} />
        })}
      </div>
    </div>
  )
}
