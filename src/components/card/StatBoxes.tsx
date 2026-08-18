import type { UnitCard } from '../../types'

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="card-statbox">
      <div className="card-statbox-value">{value}</div>
      <div className="card-statbox-label">{label}</div>
    </div>
  )
}

/** 리더 모델 이동 거리 / (이동 + 코헤런시) 총 도달 거리. 스쿼드가 항상 1모델이면 총 도달 거리는 의미가 없어 단일 숫자만 표시 */
function formatSpeed(spd: UnitCard['stat']['spd'], singleModel: boolean): string {
  if (spd === null) return '-'
  if (singleModel) return String(spd.move)
  return `${spd.move}/${spd.move + spd.cohesion}`
}

/** SHLD/SPD/EVA/ARM/HP/SIZ 여섯 스탯을 라벨-값 쌍으로 정리한다. 전체 카드(StatBoxes)와 게임 레퍼런스의
 * 간소화된 유닛 카드가 같은 값 서식(formatSpeed, null 처리 등)을 공유하기 위한 공용 헬퍼. */
export function unitStatEntries(unit: UnitCard): { label: string; value: string }[] {
  const singleModel = unit.squad.every((s) => s.modelMax === 1)
  const { stat } = unit
  return [
    { label: 'SHLD', value: stat.shld === null ? '-' : String(stat.shld) },
    { label: 'SPD', value: formatSpeed(stat.spd, singleModel) },
    { label: 'EVA', value: stat.eva },
    { label: 'ARM', value: stat.arm },
    { label: 'HP', value: String(stat.hp) },
    { label: 'SIZ', value: stat.siz === null ? '-' : String(stat.siz) },
  ]
}

export function StatBoxes({ unit }: { unit: UnitCard }) {
  return (
    <div className="card-statboxes">
      {unitStatEntries(unit).map(({ label, value }) => (
        <StatBox key={label} label={label} value={value} />
      ))}
    </div>
  )
}
