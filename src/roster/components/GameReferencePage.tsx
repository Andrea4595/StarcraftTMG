import { useState } from 'react'
import type { RaceData, Roster, RuleAbility } from '../../types'
import { findUnit, isFavoriteAbility, rosterFavoriteAbilities, unitActiveAbilities } from '../rosterCalc'
import { useRosterStore } from '../RosterContext'
import { useLang, localize } from '../../LangContext'
import { Modal } from './Modal'
import { GameReferenceCardsView } from './GameReferenceCardsView'
import { GameReferenceFavoritesView } from './GameReferenceFavoritesView'
import { AbilityDetailModal } from './AbilityDetailModal'
import { WeaponSummaryModal } from './WeaponSummaryModal'
import type { AbilitySelectionRef } from './AbilityChipsRow'
import { UnitCardView } from '../../components/card/UnitCardView'
import type { CrossFavoriteRef, FavoriteToggle } from '../../components/card/AbilitiesSection'
import '../gameReference.css'

/** 게임 레퍼런스 카드 목록에서 상세 모달을 띄울 수 있는 건 유닛뿐이다 (택티컬/팩션 카드는 클릭해도
 *  아무 반응이 없다 — 어빌리티 칩만으로 필요한 정보가 다 보여서, 카드 자체를 눌러 여는 상세 모달은
 *  더 이상 필요 없다) */
export type ReferenceDetailTarget = { kind: 'unit'; entryId: string }

type Mode = 'cards' | 'favorites'

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
  const [abilityDetail, setAbilityDetail] = useState<AbilitySelectionRef | null>(null)

  /** 지정한 소스(유닛/카드 원본 id)의 RuleAbility 즐겨찾기 상태를 읽고 토글하는 창구를 만든다 */
  function favoriteToggleFor(sourceId: string): FavoriteToggle {
    return {
      isFavorite: (abilityId) => isFavoriteAbility(roster, sourceId, abilityId),
      onToggle: (abilityId) => store.toggleFavoriteAbility(roster.id, sourceId, abilityId),
    }
  }

  const detailContent = (() => {
    if (!detail) return null

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
          onSelect: () =>
            setAbilityDetail({ kind: 'ability', ability, sourceLabel: g.sourceLabel, sourceId: g.sourceId, unitType: g.unitType }),
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

      {abilityDetail?.kind === 'ability' && (
        <AbilityDetailModal
          detail={abilityDetail}
          onClose={() => setAbilityDetail(null)}
          roster={roster}
          race={race}
          resourceLabel={race.resourceLabel.abbr}
          showFavorite
        />
      )}
      {abilityDetail?.kind === 'weapon-summary' && (
        <WeaponSummaryModal detail={abilityDetail} onClose={() => setAbilityDetail(null)} roster={roster} race={race} />
      )}
    </div>
  )
}
