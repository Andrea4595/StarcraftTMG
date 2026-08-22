import { useState } from 'react'
import type { Ability, RaceData, Roster, RuleAbility, UnitType } from '../../types'
import { findFactionCard, findUnit, isFavoriteAbility, rosterFavoriteAbilities, unitActiveAbilities } from '../rosterCalc'
import { useRosterStore } from '../RosterContext'
import { useLang, localize } from '../../LangContext'
import { UNIT_TYPE_COLORS } from '../unitTypeColor'
import { Modal } from './Modal'
import { GameReferenceCardsView } from './GameReferenceCardsView'
import { GameReferenceFavoritesView } from './GameReferenceFavoritesView'
import { TacticalCardView } from '../../components/card/TacticalCardView'
import { UnitCardView } from '../../components/card/UnitCardView'
import { RuleAbilityBlock } from '../../components/card/RuleAbilityBlock'
import { WeaponTable } from '../../components/card/WeaponTable'
import { KeywordDefinitionsList } from '../../components/card/keywordHighlight'
import type { CrossFavoriteRef, FavoriteToggle } from '../../components/card/AbilitiesSection'
import '../gameReference.css'

export type ReferenceDetailTarget =
  | { kind: 'faction' }
  | { kind: 'tactical'; id: string }
  | { kind: 'unit'; entryId: string }

type Mode = 'cards' | 'favorites'

/**
 * 어빌리티(룰/무기 프로필) 하나를 단독 모달로 띄울 때 필요한 정보. 유닛/택티컬 카드 목록의 어빌리티
 * 칩을 눌렀을 때, 그리고 다른 유닛/카드에서 즐겨찾기한 능력을 눌렀을 때 모두 이 모달을 함께 쓴다.
 */
export interface AbilityDetailRef {
  ability: Ability
  sourceLabel: string
  sourceId: string
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
  const { lang } = useLang()
  const [mode, setMode] = useState<Mode>('cards')
  const [detail, setDetail] = useState<ReferenceDetailTarget | null>(null)
  const [abilityDetail, setAbilityDetail] = useState<AbilityDetailRef | null>(null)

  /** 지정한 소스(유닛/카드 원본 id)의 RuleAbility 즐겨찾기 상태를 읽고 토글하는 창구를 만든다 */
  function favoriteToggleFor(sourceId: string): FavoriteToggle {
    return {
      isFavorite: (abilityId) => isFavoriteAbility(roster, sourceId, abilityId),
      onToggle: (abilityId) => store.toggleFavoriteAbility(roster.id, sourceId, abilityId),
    }
  }

  const detailContent = (() => {
    if (!detail) return null

    if (detail.kind === 'faction') {
      const factionCard = findFactionCard(race, roster)
      if (!factionCard) return null
      return {
        title: localize(factionCard.name, lang),
        node: (
          <TacticalCardView
            card={factionCard}
            resourceLabel={race.resourceLabel}
            isFactionCard
            favorite={favoriteToggleFor(factionCard.id)}
          />
        ),
      }
    }

    if (detail.kind === 'tactical') {
      const card = race.tacticalCards.find((c) => c.id === detail.id)
      if (!card) return null
      return {
        title: localize(card.name, lang),
        node: <TacticalCardView card={card} resourceLabel={race.resourceLabel} favorite={favoriteToggleFor(card.id)} />,
      }
    }

    const entry = roster.units.find((e) => e.id === detail.entryId)
    const unit = entry ? findUnit(race, entry.unitId) : undefined
    if (!entry || !unit) return null

    /**
     * 다른 유닛/카드에서 즐겨찾기한 능력들 (이 유닛 자신의 것은 제외 — 이미 위쪽에 그대로 보인다).
     * 같은 phase의 기존 PHASE 그룹 하단에 이름만 덧붙여서, 지금 이 유닛을 보는 도중에도 체크해야 할
     * 다른 카드의 정보를 놓치지 않도록 한다.
     */
    const crossFavorites: CrossFavoriteRef[] = rosterFavoriteAbilities(race, roster, lang)
      .filter((g) => g.sourceId !== unit.id)
      .flatMap((g) =>
        (g.abilities as RuleAbility[]).map((ability) => ({
          ability,
          sourceLabel: g.sourceLabel,
          onSelect: () => setAbilityDetail({ ability, sourceLabel: g.sourceLabel, sourceId: g.sourceId, unitType: g.unitType }),
        })),
      )

    return {
      title: localize(unit.name, lang),
      node: (
        <UnitCardView
          unit={unit}
          resourceLabel={race.resourceLabel.abbr}
          abilitiesOverride={unitActiveAbilities(unit, entry)}
          squadHighlightIndex={entry.squadTierIndex}
          favorite={favoriteToggleFor(unit.id)}
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
        {mode === 'cards' && (
          <GameReferenceCardsView race={race} roster={roster} onSelect={setDetail} onSelectAbility={setAbilityDetail} />
        )}
        {mode === 'favorites' && <GameReferenceFavoritesView race={race} roster={roster} />}
      </div>

      {detailContent && (
        <Modal title={detailContent.title} onClose={() => setDetail(null)}>
          {detailContent.node}
        </Modal>
      )}

      {abilityDetail && (
        <Modal
          title={
            <span className="modal-title-row">
              <span
                className="modal-source-badge"
                style={{ color: abilityDetail.unitType ? UNIT_TYPE_COLORS[abilityDetail.unitType] : '#f0b429' }}
              >
                {abilityDetail.unitType ? 'UNIT' : 'TACTICAL'}
              </span>
              {abilityDetail.sourceLabel}
            </span>
          }
          onClose={() => setAbilityDetail(null)}
        >
          <div className="game-card">
            <div className="card-phase-header">
              <span className="card-phase-dot" />
              {(abilityDetail.ability.phase === 'Any' ? 'ANY' : abilityDetail.ability.phase.toUpperCase())} PHASE
            </div>
            <div className="card-phase-body card-ability-detail-body">
              {abilityDetail.ability.kind === 'rule' ? (
                <RuleAbilityBlock
                  ability={abilityDetail.ability}
                  resourceLabel={race.resourceLabel.abbr}
                  favorite={{
                    active: isFavoriteAbility(roster, abilityDetail.sourceId, abilityDetail.ability.id),
                    onToggle: () => store.toggleFavoriteAbility(roster.id, abilityDetail.sourceId, abilityDetail.ability.id),
                  }}
                />
              ) : (
                <WeaponTable rows={[{ weapon: abilityDetail.ability }]} />
              )}
              <KeywordDefinitionsList ability={abilityDetail.ability} />
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
