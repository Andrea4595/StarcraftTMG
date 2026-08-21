import type { RaceData, Roster } from '../../types'
import { findUnit } from '../rosterCalc'
import { UnitConfigureView } from './UnitConfigureView'

export type DetailState = { kind: 'unit'; entryId: string } | null

export function RosterDetailPanel({
  race,
  roster,
  detail,
  onClose,
}: {
  race: RaceData
  roster: Roster
  detail: DetailState
  onClose: () => void
}) {
  if (detail?.kind === 'unit') {
    const entry = roster.units.find((e) => e.id === detail.entryId)
    const unit = entry ? findUnit(race, entry.unitId) : undefined
    if (entry && unit) {
      return (
        <div className="roster-detail-content">
          <div className="roster-detail-header">
            <span className="roster-section-title">유닛 상세</span>
            <button type="button" className="btn btn-danger" onClick={onClose}>
              닫기
            </button>
          </div>
          <UnitConfigureView roster={roster} unit={unit} entry={entry} resourceLabel={race.resourceLabel.abbr} />
        </div>
      )
    }
  }

  return <div className="roster-detail-empty">유닛을 선택하면 상세 정보가 여기에 표시됩니다.</div>
}
