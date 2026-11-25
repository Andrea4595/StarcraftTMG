import type { RaceData, Roster, UnitCard, UnitType } from "../../types";
import { useRosterStore } from "../RosterContext";
import {
  catalogSquadTierIndexes,
  isAutoSummonedUnitId,
  rosterMineralTotal,
  rosterSlotUsage,
  findUnit,
  sortedUnitEntries,
  unitExclusionConflict,
  unitFactionMismatch,
  unitRequiredFactionCardId,
} from "../rosterCalc";
import { makeId } from "../makeId";
import { UNIT_TYPE_COLORS } from "../unitTypeColor";
import { localizeTag } from "../../components/card/tagLabels";
import { useLang, useLocalize } from "../../LangContext";
import { Modal } from "./Modal";
import { SlotUsageRow } from "./SlotUsageRow";
import { WaveBadge } from "../../components/card/WaveBadge";

interface AddedGroup {
  key: string;
  unit: UnitCard;
  squadTierIndex: number;
  count: number;
}

/**
 * 지금 로스터에 들어 있는 유닛을 '유닛 + 스쿼드 크기' 단위로 묶어 센다. 순서는 로스터 화면과 같은
 * 정렬(sortedUnitEntries)을 따른다. 자동 소환 유닛은 여기서 고르는 대상이 아니라 뺀다.
 */
function addedGroups(race: RaceData, roster: Roster): AddedGroup[] {
  const groups = new Map<string, AddedGroup>();
  for (const entry of sortedUnitEntries(race, roster.units)) {
    if (entry.summonedBy) continue;
    const unit = findUnit(race, entry.unitId);
    if (!unit) continue;
    const key = `${entry.unitId}::${entry.squadTierIndex}`;
    const group = groups.get(key);
    if (group) group.count += 1;
    else
      groups.set(key, {
        key,
        unit,
        squadTierIndex: entry.squadTierIndex,
        count: 1,
      });
  }
  return [...groups.values()];
}

/**
 * 유닛 선택 모달에서 지금까지 추가된 유닛 현황. 넓은 화면에서는 우측 세로 목록(타입별 소제목),
 * 좁은 화면에서는 상단 고정 영역의 가로 칩으로 보여준다. − 버튼은 그 유닛+스쿼드 크기 중 가장
 * 나중에 추가한 항목을 뺀다.
 */
function AddedUnitsSummary({
  race,
  roster,
  variant,
}: {
  race: RaceData;
  roster: Roster;
  variant: "side" | "chips";
}) {
  const store = useRosterStore();
  const localize = useLocalize();
  const groups = addedGroups(race, roster);

  const removeOne = (group: AddedGroup) => {
    const last = [...roster.units]
      .reverse()
      .find(
        (e) =>
          !e.summonedBy &&
          e.unitId === group.unit.id &&
          e.squadTierIndex === group.squadTierIndex,
      );
    if (last) store.removeUnitEntry(roster.id, last.id);
  };

  const row = (group: AddedGroup) => (
    <div className="unit-added-row" key={group.key}>
      <span className="unit-added-name">
        {localize(group.unit.name)}
        <span className="unit-added-size">
          {" "}
          ({group.unit.squad[group.squadTierIndex]?.modelMax ?? "?"})
        </span>
      </span>
      <span className="unit-added-count">×{group.count}</span>
      <button
        type="button"
        className="unit-added-remove"
        onClick={() => removeOne(group)}
        aria-label={`${localize(group.unit.name)} 하나 빼기`}
      >
        −
      </button>
    </div>
  );

  if (variant === "chips") {
    if (groups.length === 0) return null;
    return <div className="unit-added-chips">{groups.map(row)}</div>;
  }

  const byType = new Map<UnitType, AddedGroup[]>();
  for (const g of groups)
    byType.set(g.unit.type, [...(byType.get(g.unit.type) ?? []), g]);
  return (
    <aside className="unit-added-side">
      <div className="unit-added-title">추가된 유닛</div>
      {groups.length === 0 && <div className="unit-added-empty">아직 없음</div>}
      {[...byType].map(([type, list]) => (
        <div className="unit-added-type-group" key={type}>
          <div
            className="unit-added-type"
            style={{ color: UNIT_TYPE_COLORS[type] }}
          >
            {type}
          </div>
          {list.map(row)}
        </div>
      ))}
    </aside>
  );
}

export function UnitModal({
  race,
  roster,
  onClose,
}: {
  race: RaceData;
  roster: Roster;
  onClose: () => void;
}) {
  const store = useRosterStore();
  const localize = useLocalize();
  const { lang } = useLang();

  const mineralTotal = rosterMineralTotal(race, roster);
  const overMineralCap = mineralTotal > roster.mineralCap;
  const slotUsage = rosterSlotUsage(race, roster);

  const subHeader = (
    <>
      <div className="roster-resource-row">
        <div
          className={`roster-resource-pill roster-resource-mineral ${overMineralCap ? "roster-budget-over" : ""}`}
        >
          <span className="roster-resource-label">미네랄</span>
          <span className="roster-resource-value">
            {mineralTotal} / {roster.mineralCap}
          </span>
        </div>
      </div>
      <SlotUsageRow slotUsage={slotUsage} />
      <AddedUnitsSummary race={race} roster={roster} variant="chips" />
    </>
  );

  return (
    <Modal title="유닛 선택" subHeader={subHeader} onClose={onClose}>
      <div className="unit-picker-layout">
        <div className="unit-picker-grid">
          {race.units
            .filter((unit) => !isAutoSummonedUnitId(race, unit.id))
            .map((unit) => {
              const alreadyIncluded =
                unit.isUnique && roster.units.some((e) => e.unitId === unit.id);
              /** 태그로 요구하는 팩션 카드(레이너 특공대/칼라이/케리건의 군단)가 지금 선택돼 있지 않으면
               *  이 유닛은 고를 수 없다 */
              const factionMismatch = unitFactionMismatch(unit, roster);
              /** 함께 넣을 수 없는 유닛(예: 노바 강습 모드 ↔ 은신 모드)이 이미 로스터에 있으면 고를 수 없다 */
              const exclusionConflict = unitExclusionConflict(
                race,
                unit,
                roster,
              );
              const disabled =
                alreadyIncluded ||
                factionMismatch ||
                exclusionConflict !== undefined;
              const requiredFactionTag = unitRequiredFactionCardId(unit);
              /** 'Other'는 어떤 카드로도 슬롯을 부여받지 않아 예산 개념이 없으므로 강조하지 않는다 */
              const typeColor =
                unit.type === "Other" ? undefined : UNIT_TYPE_COLORS[unit.type];
              return (
                <div
                  key={unit.id}
                  className={`game-card unit-picker-tile ${disabled ? "unit-picker-tile-disabled" : ""}`}
                  style={
                    typeColor
                      ? { borderLeftWidth: 3, borderLeftColor: typeColor }
                      : undefined
                  }
                >
                  <div className="unit-picker-name">
                    {localize(unit.name)}
                    {unit.isUnique && (
                      <span className="card-unique-badge">UNIQUE</span>
                    )}
                    <WaveBadge wave={unit.wave} />
                    {requiredFactionTag && (
                      <span className="card-faction-badge">
                        {localizeTag(requiredFactionTag, lang)}
                      </span>
                    )}
                  </div>
                  <div
                    className="unit-picker-type"
                    style={typeColor ? { color: typeColor } : undefined}
                  >
                    {unit.type}
                  </div>
                  <div className="unit-picker-tiers">
                    {catalogSquadTierIndexes(unit).map((tierIndex) => {
                      const tier = unit.squad[tierIndex];
                      return (
                        <button
                          key={tierIndex}
                          type="button"
                          className="catalog-tier-btn"
                          disabled={disabled}
                          onClick={() => {
                            store.addUnitEntry(
                              roster.id,
                              unit.id,
                              tierIndex,
                              makeId(),
                            );
                          }}
                        >
                          <span className="catalog-tier-btn-top">
                            <span className="roster-squad-tier-supply">
                              {tier.supply === 0 ? (
                                <span className="roster-squad-tier-supply-empty">
                                  ×
                                </span>
                              ) : (
                                Array.from({ length: tier.supply }).map(
                                  (_, j) => (
                                    <span
                                      className="roster-squad-tier-supply-square"
                                      key={j}
                                    />
                                  ),
                                )
                              )}
                            </span>
                            {tier.modelMax}
                          </span>
                          <span className="catalog-tier-btn-pts">
                            {tier.pts}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
        <AddedUnitsSummary race={race} roster={roster} variant="side" />
      </div>
    </Modal>
  );
}
