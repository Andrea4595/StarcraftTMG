import { useLayoutEffect, useRef, useState } from 'react'
import type { RaceData, Roster } from '../../types'
import { findUnit, unitActiveAbilities } from '../rosterCalc'
import { useLang, localize } from '../../LangContext'
import { Modal } from './Modal'
import { GameReferenceCardsView } from './GameReferenceCardsView'
import { SourceAbilitiesModal, type AbilitySource } from './SourceAbilitiesModal'
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
  /**
   * 좁은 화면에서 탭마다 마지막 스크롤 위치. 탭을 떠날 때 저장했다가 돌아오면 복원해, 탭을 오가며
   * 보던 위치를 잃지 않게 한다. 한 번도 안 본 탭은 맨 위에서 시작한다. 이 화면을 닫으면 잊는다.
   */
  const tabScrollRef = useRef<Record<ReferenceTab, number>>({ tactical: 0, units: 0 })

  function switchTab(next: ReferenceTab) {
    if (next === tab) return
    tabScrollRef.current[tab] = window.scrollY
    setTab(next)
  }

  // 새 탭의 내용이 그려진 직후, 화면에 나타나기 전에 스크롤을 옮겨야 깜빡임 없이 복원된다
  const isFirstRender = useRef(true)
  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    window.scrollTo(0, tabScrollRef.current[tab])
  }, [tab])
  const [detail, setDetail] = useState<ReferenceDetailTarget | null>(null)
  const [abilitySource, setAbilitySource] = useState<AbilitySource | null>(null)

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
                onClick={() => switchTab('tactical')}
              >
                택티컬
              </button>
              <button
                type="button"
                className={`game-ref-tab ${tab === 'units' ? 'game-ref-tab-active' : ''}`}
                onClick={() => switchTab('units')}
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
        <GameReferenceCardsView race={race} roster={roster} tab={tab} onSelect={setDetail} onOpenAbilities={setAbilitySource} />
      </div>

      {detailContent && (
        <Modal title={detailContent.title} onClose={() => setDetail(null)}>
          {detailContent.node}
        </Modal>
      )}

      {abilitySource && (
        <SourceAbilitiesModal source={abilitySource} roster={roster} race={race} onClose={() => setAbilitySource(null)} />
      )}
    </div>
  )
}
