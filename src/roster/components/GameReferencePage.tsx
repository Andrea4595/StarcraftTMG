import { useState } from 'react'
import type { RaceData, Roster } from '../../types'
import { abilitySelectionRefFor, findUnit, unitActiveAbilities } from '../rosterCalc'
import { useLang, localize } from '../../LangContext'
import { Modal } from './Modal'
import { GameReferenceCardsView } from './GameReferenceCardsView'
import { AbilityDetailModal } from './AbilityDetailModal'
import { WeaponSummaryModal } from './WeaponSummaryModal'
import type { AbilitySelectionRef } from './AbilityChipsRow'
import { UnitCardView } from '../../components/card/UnitCardView'
import '../gameReference.css'

/** 게임 레퍼런스 카드 목록에서 상세 모달을 띄울 수 있는 건 유닛뿐이다 (택티컬/팩션 카드는 클릭해도
 *  아무 반응이 없다 — 어빌리티 칩만으로 필요한 정보가 다 보여서, 카드 자체를 눌러 여는 상세 모달은
 *  더 이상 필요 없다) */
export type ReferenceDetailTarget = { kind: 'unit'; entryId: string }

/** 좁은 화면에서 택티컬 카드/유닛 중 어느 쪽을 보여줄지. 넓은 화면에서는 두 열로 둘 다 보여서 쓰이지 않는다 */
export type ReferenceTab = 'tactical' | 'units'

export function GameReferencePage({
  race,
  roster,
  onClose,
}: {
  race: RaceData
  roster: Roster
  onClose: () => void
}) {
  const { lang } = useLang()
  const [tab, setTab] = useState<ReferenceTab>('units')
  const [detail, setDetail] = useState<ReferenceDetailTarget | null>(null)
  const [abilityDetail, setAbilityDetail] = useState<AbilitySelectionRef | null>(null)

  const detailContent = (() => {
    if (!detail) return null

    const entry = roster.units.find((e) => e.id === detail.entryId)
    const unit = entry ? findUnit(race, entry.unitId) : undefined
    if (!entry || !unit) return null

    return {
      title: localize(unit.name, lang),
      node: (
        <UnitCardView
          unit={unit}
          resourceLabel={race.resourceLabel.abbr}
          abilitiesOverride={unitActiveAbilities(unit, entry)}
          squadHighlightIndex={entry.squadTierIndex}
          onSelectAbility={(ability) =>
            setAbilityDetail(
              abilitySelectionRefFor(unit, ability, {
                sourceId: unit.id,
                sourceLabel: localize(unit.name, lang),
                unitType: unit.type,
                entryId: entry.id,
                localize: (rule) => localize(rule, lang),
                interactive: false,
              }),
            )
          }
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
            <div className="game-ref-tabs">
              <button
                type="button"
                className={`game-ref-tab ${tab === 'tactical' ? 'game-ref-tab-active' : ''}`}
                onClick={() => setTab('tactical')}
              >
                택티컬
              </button>
              <button
                type="button"
                className={`game-ref-tab ${tab === 'units' ? 'game-ref-tab-active' : ''}`}
                onClick={() => setTab('units')}
              >
                유닛
              </button>
            </div>
          </div>
          <div className="game-ref-header-actions">
            <button type="button" className="btn btn-danger" onClick={onClose}>
              닫기
            </button>
          </div>
        </div>
      </div>

      <div className="game-ref-body">
        <GameReferenceCardsView race={race} roster={roster} tab={tab} onSelect={setDetail} onSelectAbility={setAbilityDetail} />
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
          readOnly
          onSelectAbility={setAbilityDetail}
        />
      )}
      {abilityDetail?.kind === 'weapon-summary' && (
        <WeaponSummaryModal
          detail={abilityDetail}
          onClose={() => setAbilityDetail(null)}
          roster={roster}
          race={race}
          onSelectAbility={setAbilityDetail}
        />
      )}
    </div>
  )
}
