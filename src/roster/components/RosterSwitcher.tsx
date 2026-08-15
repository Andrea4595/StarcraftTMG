import type { CSSProperties } from 'react'
import type { RaceData, Roster } from '../../types'
import { useRosterStore } from '../RosterContext'
import { RACE_THEME_COLORS } from '../raceThemeColor'
import { RosterExportButton } from './RosterExportButton'

export function RosterSwitcher({
  race,
  roster,
  onOpenReference,
}: {
  race: RaceData | undefined
  roster: Roster | undefined
  onOpenReference: () => void
}) {
  const store = useRosterStore()

  return (
    <div className="roster-switcher">
      {store.rosters.map((r) => {
        const themeColor = r.raceId ? RACE_THEME_COLORS[r.raceId] : undefined
        const style = themeColor ? ({ '--roster-tab-color': themeColor } as CSSProperties) : undefined
        return (
          <div
            key={r.id}
            className={`roster-tab ${r.id === store.activeRosterId ? 'roster-tab-active' : ''}`}
            style={style}
          >
            <button type="button" className="roster-tab-select" onClick={() => store.selectRoster(r.id)}>
              {r.name}
            </button>
            <button
              type="button"
              className="roster-tab-rename"
              onClick={() => {
                const name = window.prompt('로스터 이름', r.name)
                if (name) store.renameRoster(r.id, name)
              }}
            >
              ✎
            </button>
            <button
              type="button"
              className="roster-tab-delete"
              onClick={() => {
                if (window.confirm(`'${r.name}' 로스터를 삭제할까요?`)) store.deleteRoster(r.id)
              }}
            >
              ×
            </button>
          </div>
        )
      })}

      <button
        type="button"
        className="btn"
        onClick={() => store.createRoster(`로스터 ${store.rosters.length + 1}`)}
      >
        + 새 로스터
      </button>

      {race && roster && (
        <>
          <RosterExportButton race={race} roster={roster} />
          <button
            type="button"
            className="btn roster-icon-btn"
            onClick={onOpenReference}
            aria-label="게임 레퍼런스"
            title="게임 레퍼런스"
          >
            <span className="roster-icon roster-icon-reference" aria-hidden="true" />
          </button>
        </>
      )}
    </div>
  )
}
