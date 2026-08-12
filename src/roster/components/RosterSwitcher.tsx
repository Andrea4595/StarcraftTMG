import { useRosterStore } from '../RosterContext'

export function RosterSwitcher() {
  const store = useRosterStore()

  return (
    <div className="roster-switcher">
      {store.rosters.map((r) => (
        <div key={r.id} className={`roster-tab ${r.id === store.activeRosterId ? 'roster-tab-active' : ''}`}>
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
      ))}

      <button
        type="button"
        className="roster-tab-new"
        onClick={() => store.createRoster(`로스터 ${store.rosters.length + 1}`)}
      >
        + 새 로스터
      </button>
    </div>
  )
}
