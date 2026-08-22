import type { Ability, RaceData, Roster } from '../../types'
import { abilitySelectionRefFor, findUnit, isFavoriteAbility, resolveScaledCost } from '../rosterCalc'
import { useRosterStore } from '../RosterContext'
import { useLocalize } from '../../LangContext'
import { UNIT_TYPE_COLORS } from '../unitTypeColor'
import { Modal } from './Modal'
import { RuleAbilityBlock } from '../../components/card/RuleAbilityBlock'
import { WeaponTable } from '../../components/card/WeaponTable'
import { KeywordDefinitionsList } from '../../components/card/keywordHighlight'
import { PhaseBadge } from '../../components/card/PhaseBadge'
import { abilitiesReferencing, abilityReferencesInText } from '../../components/card/abilityReferences'
import type { RelatedAbilityTarget } from '../../components/card/RelatedAbilities'
import type { AbilityDetailRef, AbilitySelectionRef } from './AbilityChipsRow'

/**
 * 어빌리티 칩(AbilityChipsRow)을 눌렀을 때 뜨는 단독 상세 모달. 게임 레퍼런스 화면과 로스터 편집
 * 화면(유닛 목록의 어빌리티 칩)이 함께 쓴다.
 */
export function AbilityDetailModal({
  detail,
  onClose,
  roster,
  race,
  resourceLabel,
  showFavorite = false,
  onSelectAbility,
}: {
  detail: AbilityDetailRef
  onClose: () => void
  roster: Roster
  /** 이 능력이 속한 유닛을 찾아, 이름으로 서로를 언급하는 연관 어빌리티/무기를 계산하는 데 쓴다.
   *  타격틱 카드에서 온 능력이면(unitType 없음) 못 찾아도 정상 — 연관 목록이 그냥 비게 된다 */
  race: RaceData
  resourceLabel: string
  /** 즐겨찾기 별 토글을 보여줄지. 즐겨찾기는 게임 레퍼런스 화면 전용 기능이라 기본은 꺼져 있다 */
  showFavorite?: boolean
  /** 지정하면 연관 어빌리티/무기 항목을 눌러 그 대상의 상세 모달로 이동할 수 있다 */
  onSelectAbility?: (ref: AbilitySelectionRef) => void
}) {
  const store = useRosterStore()
  const localize = useLocalize()
  /**
   * 모달이 떠 있는 동안 다른 곳에서 이 업그레이드가 켜지거나 꺼져도 실시간으로 반영되도록,
   * active/cost를 detail에 얼려두지 않고 매 렌더 roster에서 직접 읽는다.
   */
  const upgradeToggle = detail.upgradeToggle
  const toggleEntry = upgradeToggle ? roster.units.find((e) => e.id === upgradeToggle.entryId) : undefined
  const sourceUnit = detail.unitType ? findUnit(race, detail.sourceId) : undefined
  const allAbilities: Ability[] = sourceUnit
    ? [...sourceUnit.abilities, ...sourceUnit.upgrades.map((u) => u.ability)]
    : []
  const relatedTargets = (list: Ability[]): RelatedAbilityTarget[] =>
    list.map((a) => ({
      ability: a,
      onClick:
        onSelectAbility && sourceUnit
          ? () =>
              onSelectAbility(
                abilitySelectionRefFor(sourceUnit, a, {
                  sourceId: detail.sourceId,
                  sourceLabel: detail.sourceLabel,
                  unitType: detail.unitType,
                  entryId: detail.entryId,
                  localize,
                  interactive: !showFavorite,
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
      headerActions={
        upgradeToggle &&
        toggleEntry && (
          <button
            type="button"
            className={`modal-title-toggle ${toggleEntry.upgradeIndexes.includes(upgradeToggle.upgradeIndex) ? 'modal-title-toggle-active' : ''}`}
            onClick={() =>
              store.toggleUnitUpgrade(roster.id, toggleEntry.id, upgradeToggle.upgradeIndex, upgradeToggle.exclusiveWith)
            }
          >
            PTS: {resolveScaledCost(upgradeToggle.pts, toggleEntry.squadTierIndex)}
          </button>
        )
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
              forWeapon={detail.forLabel}
              favorite={
                showFavorite
                  ? {
                      active: isFavoriteAbility(roster, detail.sourceId, detail.ability.id),
                      onToggle: () => store.toggleFavoriteAbility(roster.id, detail.sourceId, detail.ability.id),
                    }
                  : undefined
              }
              relatedTo={relatedTargets(abilityReferencesInText(allAbilities, detail.ability))}
              referencedBy={relatedTargets(abilitiesReferencing(allAbilities, detail.ability))}
            />
          ) : (
            <WeaponTable
              rows={[
                {
                  weapon: detail.ability,
                  for: detail.forLabel,
                  referencedBy: relatedTargets(abilitiesReferencing(allAbilities, detail.ability)),
                },
              ]}
            />
          )}
          <KeywordDefinitionsList ability={detail.ability} />
        </div>
      </div>
    </Modal>
  )
}
