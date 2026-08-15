import { useState } from 'react'
import type { RaceData, Roster } from '../../types'
import { useRosterStore } from '../RosterContext'
import {
  findFactionCard,
  findUnit,
  rosterGasCap,
  rosterGasTotal,
  rosterMineralTotal,
  rosterResourceTotal,
  rosterSlotUsage,
  rosterUniqueViolations,
} from '../rosterCalc'
import { UnitEntryRow } from './UnitEntryRow'
import { TacticalCardModal } from './TacticalCardModal'
import { UnitModal } from './UnitModal'
import { SlotUsageRow } from './SlotUsageRow'
import type { DetailState } from './RosterDetailPanel'

type ModalState = { kind: 'tactical' } | { kind: 'unit-add' } | null

export function RosterPanel({
  races,
  race,
  roster,
  detail,
  onSelectDetail,
}: {
  races: RaceData[]
  /** roster.raceId에 해당하는 종족. 아직 선택 전이면 undefined */
  race: RaceData | undefined
  roster: Roster
  detail: DetailState
  onSelectDetail: (detail: DetailState) => void
}) {
  const store = useRosterStore()

  return (
    <div className="roster-panel">
      <div className="roster-top-row">
        <label className="roster-mineral-cap">
          미네랄 예산
          <input
            type="number"
            min={0}
            value={roster.mineralCap}
            onChange={(e) => store.setMineralCap(roster.id, Number(e.target.value))}
          />
        </label>
        <select
          className="roster-race-select"
          value={roster.raceId ?? ''}
          onChange={(e) => store.setRosterRace(roster.id, e.target.value)}
        >
          <option value="" disabled>
            종족 선택
          </option>
          {races.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
      </div>

      {!race ? (
        <div className="roster-empty">종족을 선택하면 예산/슬롯 정보와 카드 선택이 표시됩니다.</div>
      ) : (
        <RosterPanelBody race={race} roster={roster} detail={detail} onSelectDetail={onSelectDetail} />
      )}
    </div>
  )
}

function RosterPanelBody({
  race,
  roster,
  detail,
  onSelectDetail,
}: {
  race: RaceData
  roster: Roster
  detail: DetailState
  onSelectDetail: (detail: DetailState) => void
}) {
  const [modal, setModal] = useState<ModalState>(null)
  const mineralTotal = rosterMineralTotal(race, roster)
  const gasTotal = rosterGasTotal(race, roster)
  const gasCap = rosterGasCap(roster)
  const resourceTotal = rosterResourceTotal(race, roster)
  const slotUsage = rosterSlotUsage(race, roster)
  const uniqueViolations = rosterUniqueViolations(race, roster)
  const overCap = mineralTotal > roster.mineralCap
  const overGasCap = gasTotal > gasCap
  const factionCard = findFactionCard(race, roster)

  const tacticalCardCounts = new Map<string, number>()
  for (const name of roster.tacticalCardNames) {
    tacticalCardCounts.set(name, (tacticalCardCounts.get(name) ?? 0) + 1)
  }

  return (
    <>
      {uniqueViolations.length > 0 && (
        <div className="roster-warning">Unique 중복: {uniqueViolations.join(', ')}</div>
      )}

      <div className="roster-section-title-row">
        <span className="roster-section-title">택티컬 카드</span>
      </div>
      <div className="roster-resource-cp-row">
        <div className={`roster-resource-pill roster-resource-gas ${overGasCap ? 'roster-budget-over' : ''}`}>
          <span className="roster-resource-label">가스</span>
          <span className="roster-resource-value">
            {gasTotal} / {gasCap}
          </span>
        </div>
        <span className="roster-cp-badge">
          <span className="roster-cp-badge-label">{race.resourceLabel.abbr}</span> {resourceTotal}
        </span>
      </div>
      <div className="roster-tactical-list">
        {factionCard ? (
          <div
            className="roster-tactical-chip roster-tactical-chip-faction roster-tactical-chip-clickable"
            role="button"
            tabIndex={0}
            onClick={() => onSelectDetail({ kind: 'cards' })}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') onSelectDetail({ kind: 'cards' })
            }}
          >
            {factionCard.name}
          </div>
        ) : (
          <div className="roster-tactical-chip roster-tactical-chip-faction roster-tactical-chip-faction-empty">
            팩션 카드 선택
          </div>
        )}
        {[...tacticalCardCounts.entries()].map(([name, count]) => (
          <div
            className="roster-tactical-chip roster-tactical-chip-clickable"
            key={name}
            role="button"
            tabIndex={0}
            onClick={() => onSelectDetail({ kind: 'cards' })}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') onSelectDetail({ kind: 'cards' })
            }}
          >
            {name}
            {count > 1 ? ` x${count}` : ''}
          </div>
        ))}
        <button type="button" className="btn" onClick={() => setModal({ kind: 'tactical' })}>
          + 선택
        </button>
      </div>

      {factionCard && (
        <>
          <div className="roster-section-title-row">
            <span className="roster-section-title">유닛 ({roster.units.length})</span>
          </div>
          <div className="roster-sticky-summary">
            <div className="roster-resource-row">
              <div className={`roster-resource-pill roster-resource-mineral ${overCap ? 'roster-budget-over' : ''}`}>
                <span className="roster-resource-label">미네랄</span>
                <span className="roster-resource-value">
                  {mineralTotal} / {roster.mineralCap}
                </span>
              </div>
            </div>
            <SlotUsageRow slotUsage={slotUsage} />
          </div>
          <div className="roster-unit-list">
            {roster.units.length === 0 && <div className="roster-empty">유닛을 추가하세요.</div>}
            {roster.units.map((entry) => {
              const unit = findUnit(race, entry.unitName)
              if (!unit) return null
              return (
                <UnitEntryRow
                  key={entry.id}
                  roster={roster}
                  unit={unit}
                  entry={entry}
                  active={detail?.kind === 'unit' && detail.entryId === entry.id}
                  onEdit={() => onSelectDetail({ kind: 'unit', entryId: entry.id })}
                />
              )
            })}
            <button type="button" className="btn btn-block" onClick={() => setModal({ kind: 'unit-add' })}>
              + 새 유닛 추가
            </button>
          </div>
        </>
      )}

      {modal?.kind === 'tactical' && <TacticalCardModal race={race} roster={roster} onClose={() => setModal(null)} />}
      {modal?.kind === 'unit-add' && (
        <UnitModal
          race={race}
          roster={roster}
          onAdded={(entryId) => {
            setModal(null)
            onSelectDetail({ kind: 'unit', entryId })
          }}
          onClose={() => setModal(null)}
        />
      )}
    </>
  )
}
