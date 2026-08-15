import { useState } from 'react'
import type { Phase, RaceData, Roster } from '../../types'
import { PHASES } from '../../types'
import { findFactionCard, findUnit, unitActiveAbilities } from '../rosterCalc'
import { Modal } from './Modal'
import { GameReferenceCardsView } from './GameReferenceCardsView'
import { GameReferencePhaseView } from './GameReferencePhaseView'
import { TacticalCardView } from '../../components/card/TacticalCardView'
import { UnitCardView } from '../../components/card/UnitCardView'
import '../gameReference.css'

export type ReferenceDetailTarget =
  | { kind: 'faction' }
  | { kind: 'tactical'; name: string }
  | { kind: 'unit'; entryId: string }

type Mode = 'cards' | 'phase'

const PHASE_TABS: Phase[] = PHASES.filter((p) => p !== 'Any')

export function GameReferencePage({
  race,
  roster,
  onClose,
}: {
  race: RaceData
  roster: Roster
  onClose: () => void
}) {
  const [mode, setMode] = useState<Mode>('cards')
  const [phaseTab, setPhaseTab] = useState<Phase>('Movement')
  const [detail, setDetail] = useState<ReferenceDetailTarget | null>(null)

  const detailContent = (() => {
    if (!detail) return null

    if (detail.kind === 'faction') {
      const factionCard = findFactionCard(race, roster)
      if (!factionCard) return null
      return {
        title: factionCard.name,
        node: <TacticalCardView card={factionCard} resourceLabel={race.resourceLabel} isFactionCard />,
      }
    }

    if (detail.kind === 'tactical') {
      const card = race.tacticalCards.find((c) => c.name === detail.name)
      if (!card) return null
      return { title: card.name, node: <TacticalCardView card={card} resourceLabel={race.resourceLabel} /> }
    }

    const entry = roster.units.find((e) => e.id === detail.entryId)
    const unit = entry ? findUnit(race, entry.unitName) : undefined
    if (!entry || !unit) return null
    return {
      title: unit.name,
      node: (
        <UnitCardView
          unit={unit}
          resourceLabel={race.resourceLabel.abbr}
          abilitiesOverride={unitActiveAbilities(unit, entry)}
          squadHighlightIndex={entry.squadTierIndex}
        />
      ),
    }
  })()

  return (
    <div className="game-ref-page">
      <div className="game-ref-top-bar">
        <div className="game-ref-header">
          <div className="game-ref-header-title">
            <span className="game-ref-header-name">{roster.name}</span>
            <span className="game-ref-header-race">{race.name}</span>
          </div>
          <div className="game-ref-header-actions">
            <button type="button" className="btn" onClick={() => setMode((m) => (m === 'cards' ? 'phase' : 'cards'))}>
              {mode === 'cards' ? '페이즈 정보 확인' : '카드 보기'}
            </button>
            <button type="button" className="btn btn-danger" onClick={onClose}>
              닫기
            </button>
          </div>
        </div>

        {mode === 'phase' && (
          <div className="game-ref-phase-tabs">
            {PHASE_TABS.map((p) => (
              <button
                type="button"
                key={p}
                className={`game-ref-phase-tab ${phaseTab === p ? 'game-ref-phase-tab-active' : ''}`}
                onClick={() => setPhaseTab(p)}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="game-ref-body">
        {mode === 'cards' ? (
          <GameReferenceCardsView race={race} roster={roster} onSelect={setDetail} />
        ) : (
          <GameReferencePhaseView race={race} roster={roster} phase={phaseTab} />
        )}
      </div>

      {detailContent && (
        <Modal title={detailContent.title} onClose={() => setDetail(null)}>
          {detailContent.node}
        </Modal>
      )}
    </div>
  )
}
