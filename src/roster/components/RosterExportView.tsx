import type { CSSProperties } from 'react'
import type { RaceData, Roster, TacticalCard } from '../../types'
import {
  catalogSquadTierIndexes,
  findFactionCard,
  findUnit,
  groupedTacticalCards,
  resolveScaledCost,
  rosterGasCap,
  rosterGasTotal,
  rosterMineralTotal,
  rosterResourceTotal,
  unitEntryMineralCost,
  unitEquippedUpgrades,
} from '../rosterCalc'
import { TacticalCardView } from '../../components/card/TacticalCardView'
import { UnitCardView } from '../../components/card/UnitCardView'
import { useLocalize } from '../../LangContext'

export type ExportMode = 'detailed' | 'simple'

function TotalPill({
  label,
  value,
  suffix,
  color,
}: {
  label: string
  value: string
  /** "/ 2000"처럼 값 뒤에 덧붙는 부분. 4자리 숫자끼리 붙어 줄바꿈되는 걸 막기 위해 본문보다 작고 흐리게 표시 */
  suffix?: string
  color: string
}) {
  return (
    <div className="roster-export-total-pill" style={{ '--pill-color': color } as CSSProperties}>
      <div className="roster-export-total-label">{label}</div>
      <div className="roster-export-total-value">
        {value}
        {suffix && <span className="roster-export-total-suffix">{suffix}</span>}
      </div>
    </div>
  )
}

export function RosterExportView({ race, roster, mode }: { race: RaceData; roster: Roster; mode: ExportMode }) {
  const mineralTotal = rosterMineralTotal(race, roster)
  const gasTotal = rosterGasTotal(race, roster)
  const gasCap = rosterGasCap(roster)
  const resourceTotal = rosterResourceTotal(race, roster)
  const factionCard = findFactionCard(race, roster)
  const tacticalCardGroups = groupedTacticalCards(race, roster)

  return (
    <div className={`roster-export-sheet ${mode === 'simple' ? 'roster-export-sheet-narrow' : ''}`}>
      <div className="roster-export-header">
        <div className="roster-export-title-group">
          <div className="roster-export-title">{roster.name}</div>
          <div className="roster-export-subtitle">
            {race.name} · {mode === 'detailed' ? '상세 로스터' : '간소화 로스터'}
          </div>
        </div>
        <div className="roster-export-totals">
          <TotalPill label="미네랄" value={String(mineralTotal)} suffix={` / ${roster.mineralCap}`} color="#5b9dff" />
          <TotalPill label="가스" value={String(gasTotal)} suffix={` / ${gasCap}`} color="#4ade80" />
          <TotalPill label={race.resourceLabel.abbr} value={String(resourceTotal)} color="#f0b429" />
        </div>
      </div>

      {mode === 'detailed' ? (
        <DetailedBody race={race} roster={roster} factionCard={factionCard} tacticalCardGroups={tacticalCardGroups} />
      ) : (
        <SimpleBody race={race} roster={roster} factionCard={factionCard} tacticalCardGroups={tacticalCardGroups} />
      )}
    </div>
  )
}

function DetailedBody({
  race,
  roster,
  factionCard,
  tacticalCardGroups,
}: {
  race: RaceData
  roster: Roster
  factionCard: TacticalCard | undefined
  tacticalCardGroups: { card: TacticalCard; count: number }[]
}) {
  return (
    <>
      {(factionCard || tacticalCardGroups.length > 0) && (
        <>
          <div className="roster-export-section-title">택티컬 카드</div>
          <div className="roster-export-cards-grid">
            {factionCard && <TacticalCardView card={factionCard} resourceLabel={race.resourceLabel} isFactionCard />}
            {tacticalCardGroups.map(({ card, count }) => (
              <TacticalCardView card={card} resourceLabel={race.resourceLabel} count={count} key={card.id} />
            ))}
          </div>
        </>
      )}

      {roster.units.length > 0 && (
        <>
          <div className="roster-export-section-title">유닛 ({roster.units.length})</div>
          {/* 유닛은 카드를 나란히 배열하지 않고 한 행을 다 채워, 가로로 넓게 정보를 한눈에 볼 수 있도록 한다 */}
          <div className="roster-export-units-list">
            {roster.units.map((entry) => {
              const unit = findUnit(race, entry.unitId)
              if (!unit) return null
              return (
                <UnitCardView
                  key={entry.id}
                  unit={unit}
                  resourceLabel={race.resourceLabel.abbr}
                  finalCost={unitEntryMineralCost(unit, entry)}
                  upgradeToggle={{
                    squadTierIndex: entry.squadTierIndex,
                    activeIndexes: entry.upgradeIndexes,
                    onToggle: () => {},
                  }}
                  squadSelection={{
                    activeIndex: entry.squadTierIndex,
                    selectableIndexes: catalogSquadTierIndexes(unit),
                    onSelect: () => {},
                  }}
                />
              )
            })}
          </div>
        </>
      )}
    </>
  )
}

function SimpleBody({
  race,
  roster,
  factionCard,
  tacticalCardGroups,
}: {
  race: RaceData
  roster: Roster
  factionCard: TacticalCard | undefined
  tacticalCardGroups: { card: TacticalCard; count: number }[]
}) {
  const localize = useLocalize()

  return (
    <>
      <div className="roster-export-section-title">택티컬 카드</div>
      <ul className="roster-export-simple-list">
        {factionCard && (
          <li className="roster-export-simple-item">
            <div className="roster-export-simple-item-row">
              <span className="roster-export-simple-item-name">{localize(factionCard.name)}</span>
              <span className="roster-export-simple-item-upgrades">Faction Card</span>
              {factionCard.resource > 0 && (
                <span className="roster-export-resource-badge">
                  +{factionCard.resource} {race.resourceLabel.abbr}
                </span>
              )}
            </div>
          </li>
        )}
        {tacticalCardGroups.map(({ card, count }) => (
          <li className="roster-export-simple-item" key={card.id}>
            <div className="roster-export-simple-item-row">
              <span className="roster-export-simple-item-name">{localize(card.name)}</span>
              {count > 1 && <span className="roster-export-simple-item-upgrades">x{count}</span>}
              {card.resource > 0 && (
                <span className="roster-export-resource-badge">
                  +{card.resource} {race.resourceLabel.abbr}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="roster-export-section-title">유닛 ({roster.units.length})</div>
      <ul className="roster-export-simple-list">
        {roster.units.map((entry) => {
          const unit = findUnit(race, entry.unitId)
          if (!unit) return null
          const tier = unit.squad[entry.squadTierIndex]
          const upgrades = unitEquippedUpgrades(unit, entry)
          return (
            <li className="roster-export-simple-item" key={entry.id}>
              <div className="roster-export-simple-item-row">
                <span className="roster-export-supply">
                  {Array.from({ length: tier?.supply ?? 0 }).map((_, i) => (
                    <span className="roster-export-supply-square" key={i} />
                  ))}
                </span>
                <span className="roster-export-simple-item-name">{localize(unit.name)}</span>
                {tier && <span className="roster-export-simple-item-squad">{tier.modelMax} Models</span>}
                <span className="roster-export-simple-item-cost">{unitEntryMineralCost(unit, entry)}</span>
              </div>
              {upgrades.length > 0 && (
                <div className="roster-export-simple-upgrades-row">
                  {upgrades.map((upgrade, i) => (
                    <span className="roster-export-upgrade-chip" key={i}>
                      {localize(upgrade.ability.name)} (+{resolveScaledCost(upgrade.pts, entry.squadTierIndex)})
                    </span>
                  ))}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </>
  )
}
