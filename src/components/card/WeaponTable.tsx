import type { SquadScaledCost, WeaponProfile } from '../../types'
import { KeywordList } from './KeywordText'
import { formatScaledCost } from './costDisplay'

export interface WeaponRow {
  weapon: WeaponProfile
  /** 이 무기가 대체/강화하는 기본 무기 이름. 없으면 '-' */
  for?: string
  /** 업그레이드로 제공되는 무기일 때만 지정 (미네랄 비용 표시) */
  pts?: SquadScaledCost
}

export function WeaponTable({ rows }: { rows: WeaponRow[] }) {
  const showPts = rows.some((r) => r.pts !== undefined)
  return (
    <div className="card-weapon-table-wrap">
    <table className="card-weapon-table">
      <thead>
        <tr>
          <th className="card-weapon-name-col">NAME</th>
          <th>RNG</th>
          <th>TGT</th>
          <th>RoA</th>
          <th>HIT</th>
          <th>SURGE</th>
          <th>S.DIE</th>
          <th>DMG</th>
          <th>KEYWORD</th>
          {showPts && <th>PTS</th>}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            <td className="card-weapon-name-col">
              <div className="card-weapon-name">{row.weapon.name}</div>
              <div className="card-weapon-for">FOR {row.for ?? '-'}</div>
            </td>
            <td>{row.weapon.stat.rng}</td>
            <td>{row.weapon.stat.tgt}</td>
            <td>{row.weapon.stat.roa}</td>
            <td>{row.weapon.stat.hit}</td>
            <td>{row.weapon.stat.surge.length > 0 ? row.weapon.stat.surge.join(', ') : '-'}</td>
            <td>{row.weapon.stat.sDie}</td>
            <td>{row.weapon.stat.dmg}</td>
            <td>
              <KeywordList keywords={row.weapon.stat.keyword} />
            </td>
            {showPts && <td>{row.pts !== undefined ? formatScaledCost(row.pts) : ''}</td>}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}
