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

export function StatBoxes({ unit }: { unit: UnitCard }) {
  const singleModel = unit.squad.every((s) => s.modelMax === 1)
  const { stat } = unit
  return (
    <div className="card-statboxes">
      <StatBox label="SHLD" value={stat.shld === null ? '-' : String(stat.shld)} />
      <StatBox label="SPD" value={formatSpeed(stat.spd, singleModel)} />
      <StatBox label="EVA" value={stat.eva} />
      <StatBox label="ARM" value={stat.arm} />
      <StatBox label="HP" value={String(stat.hp)} />
      <StatBox label="SIZ" value={stat.siz === null ? '-' : String(stat.siz)} />
    </div>
  )
}
