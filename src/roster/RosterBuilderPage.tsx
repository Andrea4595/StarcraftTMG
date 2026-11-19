import { useEffect, useState } from 'react'
import type { RaceData } from '../types'
import { useRosterStore } from './RosterContext'
import { RosterSwitcher } from './components/RosterSwitcher'
import { RosterPanel } from './components/RosterPanel'
import { GameReferencePage } from './components/GameReferencePage'
import { SourceAbilitiesModal, type AbilitySource } from './components/SourceAbilitiesModal'
import './roster.css'

export function RosterBuilderPage({ races }: { races: RaceData[] }) {
  const store = useRosterStore()
  const roster = store.activeRoster
  const race = races.find((r) => r.id === roster?.raceId)
  const [referenceOpen, setReferenceOpen] = useState(false)
  /** 어빌리티 칩을 눌러 능력 전체를 펼쳐 보는 중인 카드/유닛 */
  const [abilitySource, setAbilitySource] = useState<AbilitySource | null>(null)

  /** 다른 로스터로 전환하면 이전 로스터의 카드를 가리키던 상세 선택은 의미가 없어진다 */
  useEffect(() => {
    setReferenceOpen(false)
    setAbilitySource(null)
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
      ) : (
        <div className="roster-builder-body">
          <RosterPanel races={races} race={race} roster={roster} onOpenAbilities={setAbilitySource} />
        </div>
      )}

      {roster && race && abilitySource && (
        <SourceAbilitiesModal
          source={abilitySource}
          roster={roster}
          race={race}
          interactive
          onClose={() => setAbilitySource(null)}
        />
      )}
    </div>
  )
}
