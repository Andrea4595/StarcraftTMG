import { useState } from 'react'
import type { RaceData, Roster, RuleAbility, UnitType } from '../../types'
import { findFactionCard, findUnit, isFavoriteAbility, rosterFavoriteAbilities, unitActiveAbilities } from '../rosterCalc'
import { useRosterStore } from '../RosterContext'
import { UNIT_TYPE_COLORS } from '../unitTypeColor'
import { Modal } from './Modal'
import { GameReferenceCardsView } from './GameReferenceCardsView'
import { GameReferenceFavoritesView } from './GameReferenceFavoritesView'
import { TacticalCardView } from '../../components/card/TacticalCardView'
import { UnitCardView } from '../../components/card/UnitCardView'
import { RuleAbilityBlock } from '../../components/card/RuleAbilityBlock'
import type { CrossFavoriteRef, FavoriteToggle } from '../../components/card/AbilitiesSection'
import '../gameReference.css'

export type ReferenceDetailTarget =
  | { kind: 'faction' }
  | { kind: 'tactical'; name: string }
  | { kind: 'unit'; entryId: string }

type Mode = 'cards' | 'favorites'

/** 다른 유닛/카드에서 즐겨찾기한 능력을 눌렀을 때, 그 내용을 보여줄 별도 모달에 필요한 정보 */
interface FavoriteAbilityRef {
  ability: RuleAbility
  sourceLabel: string
  sourceName: string
  /** 유닛에서 나온 능력일 때만 지정된다 (UNIT/TACTICAL 배지, 배지 색 결정용) */
  unitType?: UnitType
}

export function GameReferencePage({
  race,
  roster,
  onClose,
}: {
  race: RaceData
  roster: Roster
  onClose: () => void
}) {
  const store = useRosterStore()
  const [mode, setMode] = useState<Mode>('cards')
  const [detail, setDetail] = useState<ReferenceDetailTarget | null>(null)
  const [favoriteAbilityDetail, setFavoriteAbilityDetail] = useState<FavoriteAbilityRef | null>(null)

  /** 지정한 소스(유닛/카드 원본 이름)의 RuleAbility 즐겨찾기 상태를 읽고 토글하는 창구를 만든다 */
  function favoriteToggleFor(sourceName: string): FavoriteToggle {
    return {
      isFavorite: (abilityName) => isFavoriteAbility(roster, sourceName, abilityName),
      onToggle: (abilityName) => store.toggleFavoriteAbility(roster.id, sourceName, abilityName),
    }
  }

  const detailContent = (() => {
    if (!detail) return null

    if (detail.kind === 'faction') {
      const factionCard = findFactionCard(race, roster)
      if (!factionCard) return null
      return {
        title: factionCard.name,
        node: (
          <TacticalCardView
            card={factionCard}
            resourceLabel={race.resourceLabel}
            isFactionCard
            favorite={favoriteToggleFor(factionCard.name)}
          />
        ),
      }
    }

    if (detail.kind === 'tactical') {
      const card = race.tacticalCards.find((c) => c.name === detail.name)
      if (!card) return null
      return {
        title: card.name,
        node: <TacticalCardView card={card} resourceLabel={race.resourceLabel} favorite={favoriteToggleFor(card.name)} />,
      }
    }

    const entry = roster.units.find((e) => e.id === detail.entryId)
    const unit = entry ? findUnit(race, entry.unitName) : undefined
    if (!entry || !unit) return null

    /**
     * 다른 유닛/카드에서 즐겨찾기한 능력들 (이 유닛 자신의 것은 제외 — 이미 위쪽에 그대로 보인다).
     * 같은 phase의 기존 PHASE 그룹 하단에 이름만 덧붙여서, 지금 이 유닛을 보는 도중에도 체크해야 할
     * 다른 카드의 정보를 놓치지 않도록 한다.
     */
    const crossFavorites: CrossFavoriteRef[] = rosterFavoriteAbilities(race, roster)
      .filter((g) => g.sourceName !== unit.name)
      .flatMap((g) =>
        (g.abilities as RuleAbility[]).map((ability) => ({
          ability,
          sourceLabel: g.sourceLabel,
          onSelect: () =>
            setFavoriteAbilityDetail({ ability, sourceLabel: g.sourceLabel, sourceName: g.sourceName, unitType: g.unitType }),
        })),
      )

    return {
      title: unit.name,
      node: (
        <UnitCardView
          unit={unit}
          resourceLabel={race.resourceLabel.abbr}
          abilitiesOverride={unitActiveAbilities(unit, entry)}
          squadHighlightIndex={entry.squadTierIndex}
          favorite={favoriteToggleFor(unit.name)}
          crossFavorites={crossFavorites}
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
            <div className="game-ref-tabs">
              <button
                type="button"
                className={`game-ref-tab ${mode === 'cards' ? 'game-ref-tab-active' : ''}`}
                onClick={() => setMode('cards')}
              >
                로스터
              </button>
              <button
                type="button"
                className={`game-ref-tab ${mode === 'favorites' ? 'game-ref-tab-active' : ''}`}
                onClick={() => setMode('favorites')}
              >
                즐겨찾기
              </button>
            </div>
            <button type="button" className="btn btn-danger" onClick={onClose}>
              닫기
            </button>
          </div>
        </div>
      </div>

      <div className="game-ref-body">
        {mode === 'cards' && <GameReferenceCardsView race={race} roster={roster} onSelect={setDetail} />}
        {mode === 'favorites' && <GameReferenceFavoritesView race={race} roster={roster} />}
      </div>

      {detailContent && (
        <Modal title={detailContent.title} onClose={() => setDetail(null)}>
          {detailContent.node}
        </Modal>
      )}

      {favoriteAbilityDetail && (
        <Modal
          title={
            <span className="modal-title-row">
              <span
                className="modal-source-badge"
                style={{ color: favoriteAbilityDetail.unitType ? UNIT_TYPE_COLORS[favoriteAbilityDetail.unitType] : '#f0b429' }}
              >
                {favoriteAbilityDetail.unitType ? 'UNIT' : 'TACTICAL'}
              </span>
              {favoriteAbilityDetail.sourceLabel}
            </span>
          }
          onClose={() => setFavoriteAbilityDetail(null)}
        >
          <div className="game-card">
            <div className="card-phase-body">
              <RuleAbilityBlock
                ability={favoriteAbilityDetail.ability}
                resourceLabel={race.resourceLabel.abbr}
                favorite={{
                  active: isFavoriteAbility(roster, favoriteAbilityDetail.sourceName, favoriteAbilityDetail.ability.name),
                  onToggle: () =>
                    store.toggleFavoriteAbility(roster.id, favoriteAbilityDetail.sourceName, favoriteAbilityDetail.ability.name),
                }}
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
