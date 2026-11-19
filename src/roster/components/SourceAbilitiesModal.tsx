import type { ReactNode } from 'react'
import type { Ability, RaceData, Roster } from '../../types'
import { findUnit, unitActiveAbilities, upgradeExclusiveWith } from '../rosterCalc'
import { useRosterStore } from '../RosterContext'
import { useLocalize } from '../../LangContext'
import { UNIT_TYPE_COLORS } from '../unitTypeColor'
import { Modal } from './Modal'
import { AbilitiesSection } from '../../components/card/AbilitiesSection'
import { KeywordDefinitionsList } from '../../components/card/keywordHighlight'

/** 어빌리티 칩을 눌렀을 때 능력 전체를 보여줄 대상: 택티컬/팩션 카드, 또는 로스터의 유닛 항목 */
export type AbilitySource = { kind: 'card'; cardId: string } | { kind: 'unit'; entryId: string }

/**
 * 어빌리티 칩(AbilityChipsRow)을 눌렀을 때 뜨는 모달. 누른 능력 하나가 아니라 그 카드/유닛이 가진
 * 능력(무기 포함) 전체를 페이즈별로 묶어 보여준다 — 능력끼리 서로 이어지는 경우가 많아 한 번에 보는 게 낫다.
 *
 * 유닛이면 interactive(로스터 편집 화면)일 때는 선택 안 한 업그레이드까지 모두 보여주고 PTS 버튼으로
 * 켜고 끌 수 있게 한다. 게임 레퍼런스 화면(interactive 꺼짐)은 지금 실제로 적용된 능력만 보여준다.
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
    if (interactive) {
      keywordAbilities = [...unit.abilities, ...unit.upgrades.map((u) => u.ability)]
      body = (
        <AbilitiesSection
          abilities={unit.abilities}
          upgrades={unit.upgrades}
          resourceLabel={resourceLabel}
          upgradeToggle={{
            squadTierIndex: entry.squadTierIndex,
            activeIndexes: entry.upgradeIndexes,
            onToggle: (index) => store.toggleUnitUpgrade(roster.id, entry.id, index, upgradeExclusiveWith(unit, index)),
          }}
        />
      )
    } else {
      keywordAbilities = unitActiveAbilities(unit, entry)
      body = <AbilitiesSection abilities={keywordAbilities} resourceLabel={resourceLabel} />
    }
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
