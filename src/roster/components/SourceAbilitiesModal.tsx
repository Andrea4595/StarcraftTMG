import type { ReactNode } from 'react'
import type { Ability, RaceData, Roster } from '../../types'
import { findUnit, unitActiveAbilities, unitForLabelResolver, upgradeExclusiveWith } from '../rosterCalc'
import { useRosterStore } from '../RosterContext'
import { useLocalize } from '../../LangContext'
import { UNIT_TYPE_COLORS } from '../unitTypeColor'
import { Modal } from './Modal'
import { AbilitiesSection } from '../../components/card/AbilitiesSection'
import { KeywordDefinitionsList } from '../../components/card/keywordHighlight'
import { abilitiesRelatedTo } from '../../components/card/abilityReferences'
import type { ChipTarget } from './AbilityChipsRow'

/**
 * 어빌리티 칩을 눌렀을 때 보여줄 대상. 택티컬/팩션 카드면 카드 능력 전체를, 로스터의 유닛 항목이면
 * 눌린 칩(focus)과 그와 연관된 능력만 보여준다.
 */
export type AbilitySource = { kind: 'card'; cardId: string } | { kind: 'unit'; entryId: string; focus: ChipTarget }

/**
 * 어빌리티 칩(AbilityChipsRow)을 눌렀을 때 뜨는 모달. 능력을 페이즈별로 묶어 실제 카드와 같은 모양으로 보여준다.
 *
 * - 택티컬/팩션 카드: 카드 능력 전체 (카드 능력은 서로 이어지는 경우가 많아 한 번에 보는 게 낫다)
 * - 유닛: 누른 능력(또는 '사격'/'근접 공격' 칩이면 그 페이즈 무기 전부)과, 그것을 강화하거나 그것이
 *   강화하는 능력(데이터의 enhances 관계)만. 유닛 능력 전체를 다 펼치면 정작 필요한 정보가 묻힌다.
 *
 * 유닛이면 interactive(로스터 편집 화면)일 때는 선택 안 한 업그레이드까지 포함해 연관 능력을 찾고, PTS
 * 버튼으로 켜고 끌 수 있게 한다. 게임 레퍼런스 화면(interactive 꺼짐)은 지금 실제로 적용된 능력만 본다.
 */
export function SourceAbilitiesModal({
  source,
  roster,
  race,
  interactive = false,
  onClose,
}: {
  source: AbilitySource
  roster: Roster
  race: RaceData
  interactive?: boolean
  onClose: () => void
}) {
  const store = useRosterStore()
  const localize = useLocalize()
  const resourceLabel = race.resourceLabel.abbr

  let badge: { label: string; color: string }
  let title: string
  let body: ReactNode
  let keywordAbilities: Ability[]

  if (source.kind === 'card') {
    const card = [...race.factionCards, ...race.tacticalCards].find((c) => c.id === source.cardId)
    if (!card) return null
    badge = { label: 'TACTICAL', color: '#f0b429' }
    title = localize(card.name)
    keywordAbilities = card.cardAbilities
    body = <AbilitiesSection abilities={card.cardAbilities} resourceLabel={resourceLabel} title="CARD ABILITIES" />
  } else {
    const entry = roster.units.find((e) => e.id === source.entryId)
    const unit = entry ? findUnit(race, entry.unitId) : undefined
    if (!entry || !unit) return null
    badge = { label: 'UNIT', color: UNIT_TYPE_COLORS[unit.type] }
    title = localize(unit.name)
    /** 연관 능력을 찾는 범위: 편집 화면은 미선택 업그레이드까지, 레퍼런스 화면은 지금 적용된 것만 */
    const pool = interactive ? [...unit.abilities, ...unit.upgrades.map((u) => u.ability)] : unitActiveAbilities(unit, entry)
    const { focus } = source
    const seeds =
      focus.kind === 'ability' ? [focus.ability] : pool.filter((a) => a.kind === 'weapon' && a.phase === focus.phase)
    const related = abilitiesRelatedTo(pool, seeds)
    const visible = (a: Ability) => related.has(a)
    keywordAbilities = pool.filter(visible)
    body = interactive ? (
      <AbilitiesSection
        abilities={unit.abilities}
        upgrades={unit.upgrades}
        resourceLabel={resourceLabel}
        visible={visible}
        upgradeToggle={{
          squadTierIndex: entry.squadTierIndex,
          activeIndexes: entry.upgradeIndexes,
          onToggle: (index) => store.toggleUnitUpgrade(roster.id, entry.id, index, upgradeExclusiveWith(unit, index)),
        }}
      />
    ) : (
      <AbilitiesSection
        abilities={pool}
        resourceLabel={resourceLabel}
        visible={visible}
        forNameOf={unitForLabelResolver(unit, localize)}
      />
    )
  }

  return (
    <Modal
      title={
        <span className="modal-title-row">
          <span className="modal-source-badge" style={{ color: badge.color }}>
            {badge.label}
          </span>
          {title}
        </span>
      }
      onClose={onClose}
    >
      <div className="game-card">
        {body}
        <div className="card-phase-body">
          <KeywordDefinitionsList abilities={keywordAbilities} />
        </div>
      </div>
    </Modal>
  )
}
