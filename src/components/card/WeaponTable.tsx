import type { WeaponProfile } from '../../types'
import { KeywordList } from './KeywordText'

export interface WeaponRow {
  weapon: WeaponProfile
  /** 이 무기가 대체/강화하는 기본 무기 이름. 없으면 '-' */
  for?: string
  /** 업그레이드로 제공되는 무기일 때만 지정 (미네랄 비용 표시) */
  ptsLabel?: string
  /** 지정하면 PTS 셀이 이 업그레이드를 켜고 끄는 버튼이 된다 */
  interactive?: { active: boolean; onToggle: () => void }
  /** 다른 활성화된 업그레이드가 이 무기를 대체해 봉인했음을 표시. 선택되지 못한 업그레이드와 같은 스타일로 어둡게 표시한다 */
  sealed?: boolean
  /** 지정하면 이름 옆에 'ANY PHASE' 배지를 붙인다 (페이즈 맥락만 보이는 화면에서 항상 쓸 수 있음을 표시) */
  anyPhase?: boolean
}

export function WeaponTable({ rows }: { rows: WeaponRow[] }) {
  const showPts = rows.some((r) => r.ptsLabel !== undefined)
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
          <tr
            key={i}
            className={(row.interactive && !row.interactive.active) || row.sealed ? 'card-weapon-row-dim' : ''}
          >
            <td className="card-weapon-name-col">
              <div className="card-weapon-name">
                {row.weapon.name}
                {row.anyPhase && <span className="card-badge card-badge-any card-weapon-any-badge">ANY PHASE</span>}
              </div>
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
            {showPts && (
              <td>
                {row.ptsLabel === undefined ? (
                  ''
                ) : row.interactive ? (
                  <button
                    type="button"
                    className={`card-pts-badge card-pts-toggle ${row.interactive.active ? 'card-pts-toggle-active' : ''}`}
                    onClick={row.interactive.onToggle}
                  >
                    {row.ptsLabel}
                  </button>
                ) : (
                  row.ptsLabel
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}
