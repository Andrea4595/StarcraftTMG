import { useEffect, useState } from 'react'
import type { RaceData } from '../types'
import { useRosterStore } from './RosterContext'
import { RosterSwitcher } from './components/RosterSwitcher'
import { RosterPanel } from './components/RosterPanel'
import { RosterDetailPanel, type DetailState } from './components/RosterDetailPanel'
import './roster.css'

export function RosterBuilderPage({ races }: { races: RaceData[] }) {
  const store = useRosterStore()
  const roster = store.activeRoster
  const race = races.find((r) => r.id === roster?.raceId)
  const [detail, setDetail] = useState<DetailState>(null)

  /** 다른 로스터로 전환하면 이전 로스터의 유닛/카드를 가리키던 상세 선택은 의미가 없어진다 */
  useEffect(() => {
    setDetail(null)
  }, [roster?.id])

  return (
    <div className="roster-builder">
      <RosterSwitcher />

      {!roster ? (
        <div className="roster-empty-state">'+ 새 로스터'를 눌러 로스터를 시작하세요.</div>
      ) : !race ? (
        <div className="roster-builder-body">
          <RosterPanel races={races} race={race} roster={roster} detail={detail} onSelectDetail={setDetail} />
        </div>
      ) : (
        <div className={`roster-builder-split ${detail ? 'roster-builder-split-detail-active' : ''}`}>
          <div className="roster-builder-body">
            <RosterPanel races={races} race={race} roster={roster} detail={detail} onSelectDetail={setDetail} />
          </div>
          <div className="roster-detail-panel">
            <RosterDetailPanel race={race} roster={roster} detail={detail} onClose={() => setDetail(null)} />
          </div>
        </div>
      )}
    </div>
  )
}
