import type { WeaponProfile } from '../../types'
import { KeywordList } from './KeywordText'
import { useLang, useLocalize } from '../../LangContext'
import { localizeTag } from './tagLabels'
import { RelatedAbilities, type RelatedAbilityTarget } from './RelatedAbilities'

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
  /** 이 무기를 이름으로 언급(강화)하는, 같은 유닛의 다른 어빌리티 */
  referencedBy?: RelatedAbilityTarget[]
  /** 지정하면 행 전체를 눌러 이 콜백을 호출한다 (연관 어빌리티 목록에 무기 스탯을 요약해서 보여줄 때만 쓴다) */
  onClick?: () => void
  /**
   * 연관 어빌리티 목록에 무기 스탯을 요약해서 보여줄 때만 true. FOR 줄과 (재귀 방지를 위해) 강화
   * 목록을 생략해 군더더기를 줄인다.
   */
  compact?: boolean
}

export function WeaponTable({ rows }: { rows: WeaponRow[] }) {
  const localize = useLocalize()
  const { lang } = useLang()
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
            className={[
              (row.interactive && !row.interactive.active) || row.sealed ? 'card-weapon-row-dim' : '',
              row.onClick ? 'card-weapon-row-clickable' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={row.onClick}
          >
            <td className="card-weapon-name-col">
              <div className="card-weapon-name">{localize(row.weapon.name)}</div>
              {!row.compact && <div className="card-weapon-for">FOR {row.for ?? '-'}</div>}
              {!row.compact && <RelatedAbilities items={row.referencedBy ?? []} />}
            </td>
            <td>{row.weapon.stat.rng}</td>
            <td>{localizeTag(row.weapon.stat.tgt, lang)}</td>
            <td>{row.weapon.stat.roa}</td>
            <td>{row.weapon.stat.hit}</td>
            <td>
              {row.weapon.stat.surge.length > 0
                ? row.weapon.stat.surge.map((s) => localizeTag(s, lang)).join(', ')
                : '-'}
            </td>
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
