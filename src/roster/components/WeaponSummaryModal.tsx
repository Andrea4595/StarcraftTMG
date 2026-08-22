import type { Roster } from '../../types'
import { resolveScaledCost } from '../rosterCalc'
import { useRosterStore } from '../RosterContext'
import { UNIT_TYPE_COLORS } from '../unitTypeColor'
import { Modal } from './Modal'
import { WeaponTable } from '../../components/card/WeaponTable'
import { KeywordDefinitionsList } from '../../components/card/keywordHighlight'
import { PhaseBadge } from '../../components/card/PhaseBadge'
import type { WeaponSummaryRef } from './AbilityChipsRow'

/**
 * '사격'/'근접 공격' 종합 칩을 눌렀을 때 뜨는 모달. 이 유닛의 해당 페이즈 무기 프로필을 한 표에 모두
 * 보여준다(기본/활성 업그레이드 무기는 그대로, 비활성·미선택 업그레이드 무기는 어둡게).
 *
 * interactive가 켜져 있으면(로스터 편집 화면 전용) 업그레이드 무기 행마다 PTS 켜기/끄기 버튼이
 * 붙는다. 게임 레퍼런스 화면은 읽기 전용이라 interactive를 켜지 않는다 — active/cost를 얼려두지
 * 않고 매 렌더 roster에서 직접 읽어서, 모달이 떠 있는 동안 상태가 바뀌어도 실시간으로 반영된다.
 */
export function WeaponSummaryModal({
  detail,
  onClose,
  roster,
  interactive = false,
}: {
  detail: WeaponSummaryRef
  onClose: () => void
  roster: Roster
  interactive?: boolean
}) {
  const store = useRosterStore()
  const phase = detail.entries[0]?.ability.phase ?? 'Assault'

  return (
    <Modal
      title={
        <span className="modal-title-row">
          <span
            className="modal-source-badge"
            style={{ color: detail.unitType ? UNIT_TYPE_COLORS[detail.unitType] : '#f0b429' }}
          >
            {detail.unitType ? 'UNIT' : 'TACTICAL'}
          </span>
          {detail.sourceLabel}
        </span>
      }
      onClose={onClose}
    >
      <div className="game-card">
        <div className="card-phase-header">
          <PhaseBadge phase={phase} />
          {(phase === 'Any' ? 'ANY' : phase.toUpperCase())} PHASE
        </div>
        <div className="card-phase-body card-ability-detail-body">
          <WeaponTable
            rows={detail.entries.map((entry) => {
              const toggle = interactive ? entry.upgradeToggle : undefined
              const toggleEntry = toggle ? roster.units.find((u) => u.id === toggle.entryId) : undefined
              return {
                weapon: entry.ability,
                for: entry.forLabel,
                sealed: entry.tone === 'inactive',
                ptsLabel: toggle && toggleEntry ? String(resolveScaledCost(toggle.pts, toggleEntry.squadTierIndex)) : undefined,
                interactive:
                  toggle && toggleEntry
                    ? {
                        active: toggleEntry.upgradeIndexes.includes(toggle.upgradeIndex),
                        onToggle: () =>
                          store.toggleUnitUpgrade(roster.id, toggleEntry.id, toggle.upgradeIndex, toggle.exclusiveWith),
                      }
                    : undefined,
              }
            })}
          />
          <KeywordDefinitionsList abilities={detail.entries.map((entry) => entry.ability)} />
        </div>
      </div>
    </Modal>
  )
}
