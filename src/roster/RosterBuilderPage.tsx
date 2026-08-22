import { useEffect, useState } from 'react'
import type { RaceData } from '../types'
import { useRosterStore } from './RosterContext'
import { RosterSwitcher } from './components/RosterSwitcher'
import { RosterPanel } from './components/RosterPanel'
import { RosterDetailPanel, type DetailState } from './components/RosterDetailPanel'
import { GameReferencePage } from './components/GameReferencePage'
import { AbilityDetailModal } from './components/AbilityDetailModal'
import { WeaponSummaryModal } from './components/WeaponSummaryModal'
import type { AbilitySelectionRef } from './components/AbilityChipsRow'
import './roster.css'

export function RosterBuilderPage({ races }: { races: RaceData[] }) {
  const store = useRosterStore()
  const roster = store.activeRoster
  const race = races.find((r) => r.id === roster?.raceId)
  const [detail, setDetail] = useState<DetailState>(null)
  const [referenceOpen, setReferenceOpen] = useState(false)
  /**
   * '연관 어빌리티' 클릭 이동이 로스터 편집 화면의 컴팩트 목록(RosterPanel)과 우측 유닛 상세
   * 패널(RosterDetailPanel) 양쪽 어디서든 같은 모달을 띄우고 서로 전환할 수 있어야 해서, 이 상태를
   * 두 패널의 공통 조상인 여기서 관리한다.
   */
  const [abilityDetail, setAbilityDetail] = useState<AbilitySelectionRef | null>(null)

  /** 다른 로스터로 전환하면 이전 로스터의 유닛/카드를 가리키던 상세 선택은 의미가 없어진다 */
  useEffect(() => {
    setDetail(null)
    setReferenceOpen(false)
    setAbilityDetail(null)
  }, [roster?.id])

  if (roster && race && referenceOpen) {
    return (
      <div className="roster-builder">
        <GameReferencePage race={race} roster={roster} onClose={() => setReferenceOpen(false)} />
      </div>
    )
  }

  return (
    <div className="roster-builder">
      <RosterSwitcher race={race} roster={roster} onOpenReference={() => setReferenceOpen(true)} />

      {!roster ? (
        <div className="roster-empty-state">'+ 새 로스터'를 눌러 로스터를 시작하세요.</div>
      ) : !race ? (
        <div className="roster-builder-body">
          <RosterPanel
            races={races}
            race={race}
            roster={roster}
            detail={detail}
            onSelectDetail={setDetail}
            onSelectAbility={setAbilityDetail}
          />
        </div>
      ) : (
        <div className={`roster-builder-split ${detail ? 'roster-builder-split-detail-active' : ''}`}>
          <div className="roster-builder-body">
            <RosterPanel
              races={races}
              race={race}
              roster={roster}
              detail={detail}
              onSelectDetail={setDetail}
              onSelectAbility={setAbilityDetail}
            />
          </div>
          <div className="roster-detail-panel">
            <RosterDetailPanel
              race={race}
              roster={roster}
              detail={detail}
              onClose={() => setDetail(null)}
              onSelectAbility={setAbilityDetail}
            />
          </div>
        </div>
      )}

      {roster && race && abilityDetail?.kind === 'ability' && (
        <AbilityDetailModal
          detail={abilityDetail}
          onClose={() => setAbilityDetail(null)}
          roster={roster}
          race={race}
          resourceLabel={race.resourceLabel.abbr}
          onSelectAbility={setAbilityDetail}
        />
      )}
      {roster && race && abilityDetail?.kind === 'weapon-summary' && (
        <WeaponSummaryModal
          detail={abilityDetail}
          onClose={() => setAbilityDetail(null)}
          roster={roster}
          race={race}
          interactive
          onSelectAbility={setAbilityDetail}
        />
      )}
    </div>
  )
}
