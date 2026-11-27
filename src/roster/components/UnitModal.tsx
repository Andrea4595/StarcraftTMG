import { UNIT_TYPES, type RaceData, type Roster } from '../../types'
import { useRosterStore } from '../RosterContext'
import {
  catalogSquadTierIndexes,
  isAutoSummonedUnitId,
  rosterMineralTotal,
  rosterSlotUsage,
  unitExclusionConflict,
  unitFactionMismatch,
  unitRequiredFactionCardId,
} from '../rosterCalc'
import { makeId } from '../makeId'
import { UNIT_TYPE_COLORS } from '../unitTypeColor'
import { localizeTag } from '../../components/card/tagLabels'
import { useLang, useLocalize } from '../../LangContext'
import { Modal } from './Modal'
import { SlotUsageRow } from './SlotUsageRow'
import { BudgetGauge, mineralGaugeSegments } from './BudgetGauge'
import { WaveBadge } from '../../components/card/WaveBadge'

/**
 * 유닛 선택 모달. 스쿼드 크기마다 (−) 개수 (+)로 바로 넣고 뺄 수 있고, 추가해도 창이 닫히지 않는다.
 * 상단 고정 영역의 미네랄 게이지가 지금 들어간 유닛 현황(유닛마다 비용만큼의 칸)을 보여준다.
 */
export function UnitModal({ race, roster, onClose }: { race: RaceData; roster: Roster; onClose: () => void }) {
  const store = useRosterStore()
  const localize = useLocalize()
  const { lang } = useLang()

  const mineralTotal = rosterMineralTotal(race, roster)
  const slotUsage = rosterSlotUsage(race, roster)

  /** 이 유닛+스쿼드 크기로 직접 추가한 항목들 (자동 소환 항목 제외), 추가한 순서대로 */
  const entriesOf = (unitId: string, tierIndex: number) =>
    roster.units.filter((e) => !e.summonedBy && e.unitId === unitId && e.squadTierIndex === tierIndex)

  const subHeader = (
    <>
      <BudgetGauge
        label="광물"
        kind="mineral"
        total={mineralTotal}
        cap={roster.mineralCap}
        segments={mineralGaugeSegments(race, roster, localize)}
      />
      <SlotUsageRow slotUsage={slotUsage} />
    </>
  )

  /** Hero → Core → Elite → Support → Other 순. 같은 타입 안에서는 카탈로그 순서 유지 */
  const units = race.units
    .filter((unit) => !isAutoSummonedUnitId(race, unit.id))
    .map((unit, i) => ({ unit, i }))
    .sort((a, b) => UNIT_TYPES.indexOf(a.unit.type) - UNIT_TYPES.indexOf(b.unit.type) || a.i - b.i)
    .map(({ unit }) => unit)

  return (
    <Modal title="유닛 선택" subHeader={subHeader} onClose={onClose}>
      <div className="unit-picker-grid">
        {units.map((unit) => {
          const includedCount = roster.units.filter((e) => !e.summonedBy && e.unitId === unit.id).length
          const alreadyIncluded = unit.isUnique && includedCount > 0
          /** 태그로 요구하는 팩션 카드(레이너 특공대/칼라이/케리건의 군단)가 지금 선택돼 있지 않으면
           *  이 유닛은 고를 수 없다 */
          const factionMismatch = unitFactionMismatch(unit, roster)
          /** 함께 넣을 수 없는 유닛(예: 노바 강습 모드 ↔ 은신 모드)이 이미 로스터에 있으면 고를 수 없다 */
          const exclusionConflict = unitExclusionConflict(race, unit, roster)
          const addDisabled = alreadyIncluded || factionMismatch || exclusionConflict !== undefined
          /** 이미 넣은 유닛은 (−)로 뺄 수 있어야 하므로, 하나도 안 넣었는데 못 넣는 경우만 흐리게 한다 */
          const dimmed = addDisabled && includedCount === 0
          const requiredFactionTag = unitRequiredFactionCardId(unit)
          /** 'Other'는 어떤 카드로도 슬롯을 부여받지 않아 예산 개념이 없으므로 강조하지 않는다 */
          const typeColor = unit.type === 'Other' ? undefined : UNIT_TYPE_COLORS[unit.type]
          const unitName = localize(unit.name)
          return (
            <div
              key={unit.id}
              className={`game-card unit-picker-tile ${dimmed ? 'unit-picker-tile-disabled' : ''}`}
              style={typeColor ? { borderLeftWidth: 3, borderLeftColor: typeColor } : undefined}
            >
              <div className="unit-picker-name">
                {unitName}
                {unit.isUnique && <span className="card-unique-badge">UNIQUE</span>}
                <WaveBadge wave={unit.wave} />
                {requiredFactionTag && (
                  <span className="card-faction-badge">{localizeTag(requiredFactionTag, lang)}</span>
                )}
              </div>
              <div className="unit-picker-type" style={typeColor ? { color: typeColor } : undefined}>
                {unit.type}
              </div>
              <div className="unit-picker-tiers">
                {catalogSquadTierIndexes(unit).map((tierIndex) => {
                  const tier = unit.squad[tierIndex]
                  const added = entriesOf(unit.id, tierIndex)
                  const count = added.length
                  return (
                    <div key={tierIndex} className={`unit-picker-tier ${count > 0 ? 'unit-picker-tier-active' : ''}`}>
                      <div className="unit-picker-tier-info">
                        <span className="catalog-tier-btn-top">
                          <span className="roster-squad-tier-supply">
                            {tier.supply === 0 ? (
                              <span className="roster-squad-tier-supply-empty">×</span>
                            ) : (
                              Array.from({ length: tier.supply }).map((_, j) => (
                                <span className="roster-squad-tier-supply-square" key={j} />
                              ))
                            )}
                          </span>
                        </span>
                        <span className="catalog-tier-btn-pts">{tier.pts}</span>
                      </div>
                      <div className="unit-picker-tier-qty">
                        <button
                          type="button"
                          className="gallery-qty-btn"
                          disabled={count === 0}
                          onClick={() => store.removeUnitEntry(roster.id, added[added.length - 1].id)}
                          aria-label={`${unitName} (${tier.modelMax}) 하나 빼기`}
                        >
                          −
                        </button>
                        <span className={`gallery-qty-count ${count === 0 ? 'unit-picker-tier-count-zero' : ''}`}>
                          {count}
                        </span>
                        <button
                          type="button"
                          className="gallery-qty-btn gallery-qty-btn-add"
                          disabled={addDisabled}
                          onClick={() => store.addUnitEntry(roster.id, unit.id, tierIndex, makeId())}
                          aria-label={`${unitName} (${tier.modelMax}) 추가`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </Modal>
  )
}
