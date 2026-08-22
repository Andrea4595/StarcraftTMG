import { UNIT_TYPE_COLORS } from '../unitTypeColor'
import { Modal } from './Modal'
import { WeaponTable } from '../../components/card/WeaponTable'
import { KeywordDefinitionsList } from '../../components/card/keywordHighlight'
import { PhaseBadge } from '../../components/card/PhaseBadge'
import type { RangedWeaponSummaryRef } from './AbilityChipsRow'

/**
 * '사격' 종합 칩을 눌렀을 때 뜨는 모달. 이 유닛의 어썰트 페이즈 무기 프로필을 한 표에 모두 보여준다
 * (기본/활성 업그레이드 무기는 그대로, 비활성·미선택 업그레이드 무기는 어둡게).
 */
export function RangedWeaponSummaryModal({ detail, onClose }: { detail: RangedWeaponSummaryRef; onClose: () => void }) {
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
          <PhaseBadge phase="Assault" />
          ASSAULT PHASE
        </div>
        <div className="card-phase-body card-ability-detail-body">
          <WeaponTable
            rows={detail.entries.map((entry) => ({
              weapon: entry.ability,
              for: entry.forLabel,
              sealed: entry.tone === 'inactive',
            }))}
          />
          <KeywordDefinitionsList abilities={detail.entries.map((entry) => entry.ability)} />
        </div>
      </div>
    </Modal>
  )
}
