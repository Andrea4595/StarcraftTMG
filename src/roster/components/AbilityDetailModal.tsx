import type { Roster } from '../../types'
import { isFavoriteAbility } from '../rosterCalc'
import { useRosterStore } from '../RosterContext'
import { UNIT_TYPE_COLORS } from '../unitTypeColor'
import { Modal } from './Modal'
import { RuleAbilityBlock } from '../../components/card/RuleAbilityBlock'
import { WeaponTable } from '../../components/card/WeaponTable'
import { KeywordDefinitionsList } from '../../components/card/keywordHighlight'
import { PhaseBadge } from '../../components/card/PhaseBadge'
import type { AbilityDetailRef } from './AbilityChipsRow'

/**
 * 어빌리티 칩(AbilityChipsRow)을 눌렀을 때 뜨는 단독 상세 모달. 게임 레퍼런스 화면과 로스터 편집
 * 화면(유닛 목록의 어빌리티 칩)이 함께 쓴다.
 */
export function AbilityDetailModal({
  detail,
  onClose,
  roster,
  resourceLabel,
  showFavorite = false,
}: {
  detail: AbilityDetailRef
  onClose: () => void
  roster: Roster
  resourceLabel: string
  /** 즐겨찾기 별 토글을 보여줄지. 즐겨찾기는 게임 레퍼런스 화면 전용 기능이라 기본은 꺼져 있다 */
  showFavorite?: boolean
}) {
  const store = useRosterStore()

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
          <PhaseBadge phase={detail.ability.phase} />
          {(detail.ability.phase === 'Any' ? 'ANY' : detail.ability.phase.toUpperCase())} PHASE
        </div>
        <div className="card-phase-body card-ability-detail-body">
          {detail.ability.kind === 'rule' ? (
            <RuleAbilityBlock
              ability={detail.ability}
              resourceLabel={resourceLabel}
              favorite={
                showFavorite
                  ? {
                      active: isFavoriteAbility(roster, detail.sourceId, detail.ability.id),
                      onToggle: () => store.toggleFavoriteAbility(roster.id, detail.sourceId, detail.ability.id),
                    }
                  : undefined
              }
            />
          ) : (
            <WeaponTable rows={[{ weapon: detail.ability }]} />
          )}
          <KeywordDefinitionsList ability={detail.ability} />
        </div>
      </div>
    </Modal>
  )
}
