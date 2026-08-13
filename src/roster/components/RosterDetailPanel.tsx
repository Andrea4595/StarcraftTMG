import type { RaceData, Roster } from '../../types'
import { findFactionCard, findUnit } from '../rosterCalc'
import { TacticalCardView } from '../../components/card/TacticalCardView'
import { UnitConfigureView } from './UnitConfigureView'

export type DetailState = { kind: 'unit'; entryId: string } | { kind: 'cards' } | null

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
    const unit = entry ? findUnit(race, entry.unitName) : undefined
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

  if (detail?.kind === 'cards') {
    const factionCard = findFactionCard(race, roster)
    const tacticalCards = roster.tacticalCardNames
      .map((name) => race.tacticalCards.find((c) => c.name === name))
      .filter((c): c is NonNullable<typeof c> => c !== undefined)

    if (factionCard || tacticalCards.length > 0) {
      return (
        <div className="roster-detail-content">
          <div className="roster-detail-header">
            <span className="roster-section-title">선택한 카드</span>
            <button type="button" className="btn btn-danger" onClick={onClose}>
              닫기
            </button>
          </div>
          <div className="gallery-grid">
            {factionCard && (
              <div className="gallery-card-wrap gallery-card-selected">
                <TacticalCardView card={factionCard} resourceLabel={race.resourceLabel} isFactionCard />
              </div>
            )}
            {tacticalCards.map((card, i) => (
              <div className="gallery-card-wrap gallery-card-selected" key={`${card.name}-${i}`}>
                <TacticalCardView card={card} resourceLabel={race.resourceLabel} />
              </div>
            ))}
          </div>
        </div>
      )
    }
  }

  return <div className="roster-detail-empty">유닛이나 카드를 선택하면 상세 정보가 여기에 표시됩니다.</div>
}
