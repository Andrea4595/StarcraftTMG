import { useEffect, useRef, useState } from 'react'
import type { RaceData } from '../types'
import { useRosterStore } from './RosterContext'
import { RosterSwitcher } from './components/RosterSwitcher'
import { RosterPanel } from './components/RosterPanel'
import { GameReferencePage } from './components/GameReferencePage'
import { AbilityDetailModal } from './components/AbilityDetailModal'
import { WeaponSummaryModal } from './components/WeaponSummaryModal'
import type { AbilitySelectionRef } from './components/AbilityChipsRow'
import { Modal } from './components/Modal'
import { clearShareHash, decodeSharedRoster, readShareHash } from './rosterShare'
import './roster.css'

export function RosterBuilderPage({ races }: { races: RaceData[] }) {
  const store = useRosterStore()
  const roster = store.activeRoster
  const race = races.find((r) => r.id === roster?.raceId)
  const [referenceOpen, setReferenceOpen] = useState(false)
  /**
   * '연관 어빌리티' 클릭 이동이 로스터 편집 화면 어디서든(유닛 목록의 칩, 유닛 상세 모달) 같은
   * 모달을 띄우고 서로 전환할 수 있어야 해서, 이 상태를 여기서 관리한다.
   */
  const [abilityDetail, setAbilityDetail] = useState<AbilitySelectionRef | null>(null)

  /** 공유 링크로 들어왔을 때 로스터를 추가한 결과 안내. ok=false면 실패 사유 */
  const [importNotice, setImportNotice] = useState<{ ok: boolean; message: string } | null>(null)
  const importHandledRef = useRef(false)

  // 공유 링크(#share=...)로 열렸으면 그 로스터를 새로 추가한다. 해시는 바로 지워서 새로고침해도 다시 추가되지 않게 한다
  useEffect(() => {
    if (importHandledRef.current) return
    importHandledRef.current = true
    const encoded = readShareHash()
    if (!encoded) return
    clearShareHash()
    decodeSharedRoster(encoded, races)
      .then((shared) => {
        store.importRoster(shared)
        setImportNotice({ ok: true, message: `공유받은 '${shared.name}' 로스터를 추가했습니다.` })
      })
      .catch((err) => {
        console.error(err)
        setImportNotice({ ok: false, message: '공유 링크가 올바르지 않아 로스터를 추가하지 못했습니다.' })
      })
    // 앱을 처음 열 때 한 번만 확인한다
  }, [])

  /** 다른 로스터로 전환하면 이전 로스터의 카드를 가리키던 상세 선택은 의미가 없어진다 */
  useEffect(() => {
    setReferenceOpen(false)
    setAbilityDetail(null)
  }, [roster?.id])

  const importNoticeModal = importNotice && (
    <Modal title="로스터 공유" onClose={() => setImportNotice(null)}>
      <div className={`roster-export-status ${importNotice.ok ? '' : 'roster-export-status-error'}`}>
        {importNotice.message}
      </div>
    </Modal>
  )

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
      ) : (
        <div className="roster-builder-body">
          <RosterPanel races={races} race={race} roster={roster} onSelectAbility={setAbilityDetail} />
        </div>
      )}

      {importNoticeModal}

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
