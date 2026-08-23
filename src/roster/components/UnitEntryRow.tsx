import type { Ability, Roster, RosterUnitEntry, UnitCard } from '../../types'
import { useRosterStore } from '../RosterContext'
import {
  FIRE_LABEL,
  MELEE_LABEL,
  unitAbilityChipEntries,
  unitActiveAbilities,
  unitEntryMineralCost,
  unitForLabelResolver,
  unitFactionMismatch,
  unitMeleeWeaponEntries,
  unitRangedWeaponEntries,
  unitRequiredFactionCardId,
  upgradeExclusiveWith,
} from '../rosterCalc'
import { StatBoxes } from '../../components/card/StatBoxes'
import { KeywordList } from '../../components/card/KeywordText'
import { localizeTag } from '../../components/card/tagLabels'
import { useLang, useLocalize } from '../../LangContext'
import { AbilityChipsRow, type AbilitySelectionRef, type UpgradeToggleRef, type WeaponSummaryInput } from './AbilityChipsRow'
import { SquadTierSelector } from './SquadTierSelector'

const isNonSummaryWeapon = (a: Ability) => !(a.kind === 'weapon' && (a.phase === 'Assault' || a.phase === 'Combat'))

export function UnitEntryRow({
  roster,
  unit,
  entry,
  onShowDetail,
  onSelectAbility,
  interactive = true,
}: {
  roster: Roster
  unit: UnitCard
  entry: RosterUnitEntry
  /** 이 유닛의 상세 정보를 모달로 띄운다. '유닛 상세' 버튼을 누르면 호출된다 */
  onShowDetail: () => void
  onSelectAbility: (ref: AbilitySelectionRef) => void
  /**
   * 기본은 로스터 편집 화면 전용 동작: 미구매 업그레이드까지 포함한 모든 능력을 가격과 함께 보여주고,
   * 스쿼드 등급을 클릭해 바꿀 수 있으며, 제거/이동 버튼이 붙는다. false를 주면 게임 레퍼런스 화면
   * 전용 읽기 전용 모드가 된다 — 지금 실제로 켜진 능력만, 가격 없이 보여주고, 스쿼드 등급은 지금
   * 값만 강조해 보여줄 뿐 바꿀 수 없으며, 제거/이동 버튼은 아예 나오지 않는다.
   */
  interactive?: boolean
}) {
  const store = useRosterStore()
  const localize = useLocalize()
  const { lang } = useLang()
  const cost = unitEntryMineralCost(unit, entry)
  const requiredFactionTag = unitRequiredFactionCardId(unit)
  const forFor = unitForLabelResolver(unit, localize)
  const rangedSummary = unitRangedWeaponEntries(unit, entry, localize)
  const meleeSummary = unitMeleeWeaponEntries(unit, entry, localize)
  const weaponSummaries: WeaponSummaryInput[] = [
    { entryId: entry.id, phase: 'Assault', label: FIRE_LABEL, entries: rangedSummary },
    { entryId: entry.id, phase: 'Combat', label: MELEE_LABEL, entries: meleeSummary },
  ]

  let nonWeaponSummaryAbilities: Ability[]
  let upgradeStateFor: ((ability: Ability) => 'active' | 'inactive' | undefined) | undefined
  let costFor: ((ability: Ability) => number | undefined) | undefined
  let upgradeToggleFor: ((ability: Ability) => UpgradeToggleRef | undefined) | undefined

  if (interactive) {
    const abilityEntries = unitAbilityChipEntries(unit, entry)
    nonWeaponSummaryAbilities = abilityEntries.map((e) => e.ability).filter(isNonSummaryWeapon)

    const upgradeStateByAbility = new Map<Ability, 'active' | 'inactive'>(
      abilityEntries
        .filter((e) => e.upgradeActive !== undefined)
        .map((e) => [e.ability, e.upgradeActive ? 'active' : 'inactive']),
    )
    const upgradeCostByAbility = new Map<Ability, number>(
      abilityEntries.filter((e) => e.upgradePts !== undefined).map((e) => [e.ability, e.upgradePts as number]),
    )
    const upgradeIndexByAbility = new Map<Ability, number>(unit.upgrades.map((u, i) => [u.ability, i]))

    upgradeStateFor = (ability) => upgradeStateByAbility.get(ability)
    costFor = (ability) => upgradeCostByAbility.get(ability)
    upgradeToggleFor = (ability) => {
      const i = upgradeIndexByAbility.get(ability)
      if (i === undefined) return undefined
      return { entryId: entry.id, upgradeIndex: i, pts: unit.upgrades[i].pts, exclusiveWith: upgradeExclusiveWith(unit, i) }
    }
  } else {
    nonWeaponSummaryAbilities = unitActiveAbilities(unit, entry).filter(isNonSummaryWeapon)
  }

  const index = roster.units.findIndex((e) => e.id === entry.id)
  /** 이 유닛을 추가한 뒤 팩션 카드를 바꿔서, 태그로 요구하던 팩션 카드가 더 이상 선택돼 있지 않은 상태 */
  const factionMismatch = unitFactionMismatch(unit, roster)

  return (
    <div className={`roster-entry ${factionMismatch ? 'roster-entry-faction-mismatch' : ''}`}>
      <div className="roster-entry-header">
        <div className="roster-entry-title">
          <span className="roster-entry-name">{localize(unit.name)}</span>
          {unit.isUnique && <span className="card-unique-badge">UNIQUE</span>}
          {requiredFactionTag && <span className="card-faction-badge">{localizeTag(requiredFactionTag, lang)}</span>}
          <span className="roster-entry-tags">
            <KeywordList keywords={unit.tags.filter((t) => t.name !== 'Unique' && t.name !== requiredFactionTag)} />
          </span>
        </div>
        <div className="roster-entry-meta">
          <StatBoxes unit={unit} />
        </div>
        {interactive && (
          <button
            type="button"
            className="btn btn-danger roster-entry-remove"
            onClick={() => store.removeUnitEntry(roster.id, entry.id)}
            aria-label="제거"
          >
            ✕
          </button>
        )}
      </div>

      <div className="roster-entry-squad-row">
        <SquadTierSelector roster={roster} unit={unit} entry={entry} interactive={interactive} />
      </div>

      <AbilityChipsRow
        abilities={nonWeaponSummaryAbilities}
        weaponSummaries={weaponSummaries}
        hideInactiveWeaponNames={!interactive}
        sourceId={unit.id}
        sourceLabel={localize(unit.name)}
        unitType={unit.type}
        entryId={entry.id}
        roster={roster}
        onSelectAbility={onSelectAbility}
        localize={localize}
        upgradeStateFor={upgradeStateFor}
        costFor={costFor}
        forFor={forFor}
        upgradeToggleFor={upgradeToggleFor}
        showFavorite={!interactive}
      />

      <div className="roster-entry-footer">
        <span className="roster-entry-cost">{cost}</span>
        <div className="roster-entry-footer-right">
          <button type="button" className="roster-entry-detail-btn" onClick={onShowDetail}>
            유닛 상세
          </button>
          {interactive && (
            <div className="roster-entry-move">
              <button
                type="button"
                className="roster-entry-move-btn"
                disabled={index <= 0}
                onClick={() => store.moveUnitEntry(roster.id, entry.id, 'up')}
                aria-label="위로 이동"
              >
                ▲
              </button>
              <button
                type="button"
                className="roster-entry-move-btn"
                disabled={index === -1 || index === roster.units.length - 1}
                onClick={() => store.moveUnitEntry(roster.id, entry.id, 'down')}
                aria-label="아래로 이동"
              >
                ▼
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
