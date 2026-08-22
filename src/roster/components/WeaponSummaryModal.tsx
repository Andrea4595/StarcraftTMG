import type { Ability, RaceData, Roster } from '../../types'
import { abilitySelectionRefFor, findUnit, resolveScaledCost, unitWeaponSummaryEntries } from '../rosterCalc'
import { useRosterStore } from '../RosterContext'
import { useLocalize } from '../../LangContext'
import { UNIT_TYPE_COLORS } from '../unitTypeColor'
import { Modal } from './Modal'
import { WeaponTable } from '../../components/card/WeaponTable'
import { KeywordDefinitionsList } from '../../components/card/keywordHighlight'
import { PhaseBadge } from '../../components/card/PhaseBadge'
import { abilitiesReferencing } from '../../components/card/abilityReferences'
import type { RelatedAbilityTarget } from '../../components/card/RelatedAbilities'
import type { AbilitySelectionRef, WeaponSummaryRef } from './AbilityChipsRow'

/**
 * '사격'/'근접 공격' 종합 칩을 눌렀을 때 뜨는 모달. 이 유닛의 해당 페이즈 무기 프로필을 한 표에
 * 보여준다.
 *
 * entries를 detail에서 그대로 쓰지 않고 race+roster에서 매 렌더 다시 계산하는 이유는, 모달이 떠
 * 있는 동안 이 안(또는 다른 곳)에서 업그레이드를 껐다 켜면 — 특히 FOR 대상 기본 무기가 봉인/해제될
 * 때 — 그 변화가 실시간으로 반영돼야 하기 때문이다.
 *
 * interactive가 켜져 있으면(로스터 편집 화면 전용) 기본/활성 업그레이드 무기는 그대로, 비활성·
 * 미선택 업그레이드 무기는 어둡게 보여주고 행마다 PTS 켜기/끄기 버튼이 붙는다. 게임 레퍼런스
 * 화면은 읽기 전용이라 interactive를 켜지 않는데, 이때는 비활성 무기를 아예 목록에서 뺀다 —
 * "지금 실제로 쓰이는 것"만 보여주는 그 화면의 다른 부분과 일관되게.
 */
export function WeaponSummaryModal({
  detail,
  onClose,
  roster,
  race,
  interactive = false,
  onSelectAbility,
}: {
  detail: WeaponSummaryRef
  onClose: () => void
  roster: Roster
  race: RaceData
  interactive?: boolean
  /** 지정하면 연관 어빌리티('강화 출처') 항목을 눌러 그 대상의 상세 모달로 이동할 수 있다 */
  onSelectAbility?: (ref: AbilitySelectionRef) => void
}) {
  const store = useRosterStore()
  const localize = useLocalize()
  const rosterEntry = roster.units.find((u) => u.id === detail.entryId)
  const unit = rosterEntry ? findUnit(race, rosterEntry.unitId) : undefined
  const allEntries = unit && rosterEntry ? unitWeaponSummaryEntries(unit, rosterEntry, detail.phase, localize) : []
  const entries = interactive ? allEntries : allEntries.filter((entry) => entry.tone !== 'inactive')
  const allAbilities: Ability[] = unit ? [...unit.abilities, ...unit.upgrades.map((u) => u.ability)] : []
  const relatedTargets = (list: Ability[]): RelatedAbilityTarget[] =>
    list.map((a) => ({
      ability: a,
      onClick:
        onSelectAbility && unit
          ? () =>
              onSelectAbility(
                abilitySelectionRefFor(unit, a, {
                  sourceId: detail.sourceId,
                  sourceLabel: detail.sourceLabel,
                  unitType: detail.unitType,
                  entryId: detail.entryId,
                  localize,
                  interactive,
                }),
              )
          : undefined,
    }))

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
          <PhaseBadge phase={detail.phase} />
          {(detail.phase === 'Any' ? 'ANY' : detail.phase.toUpperCase())} PHASE
        </div>
        <div className="card-phase-body card-ability-detail-body">
          <WeaponTable
            rows={entries.map((entry) => {
              const toggle = interactive ? entry.upgradeToggle : undefined
              return {
                weapon: entry.ability,
                for: entry.forLabel,
                sealed: entry.tone === 'inactive',
                referencedBy: relatedTargets(abilitiesReferencing(allAbilities, entry.ability)),
                ptsLabel:
                  toggle && rosterEntry ? String(resolveScaledCost(toggle.pts, rosterEntry.squadTierIndex)) : undefined,
                interactive:
                  toggle && rosterEntry
                    ? {
                        active: rosterEntry.upgradeIndexes.includes(toggle.upgradeIndex),
                        onToggle: () =>
                          store.toggleUnitUpgrade(roster.id, rosterEntry.id, toggle.upgradeIndex, toggle.exclusiveWith),
                      }
                    : undefined,
              }
            })}
          />
          <KeywordDefinitionsList abilities={entries.map((entry) => entry.ability)} />
        </div>
      </div>
    </Modal>
  )
}
