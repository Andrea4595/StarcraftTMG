import { useMemo, useState } from 'react'
import { KEYWORDS, type KeywordEntry } from '../data/keywords'
import { localize, useLang } from '../LangContext'
import { Modal } from '../roster/components/Modal'

export function KeywordSearch() {
  const { lang } = useLang()
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<KeywordEntry | null>(null)

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return KEYWORDS.filter(
      (k) => k.name.en.toLowerCase().includes(q) || k.name.ko.toLowerCase().includes(q),
    ).slice(0, 8)
  }, [query])

  return (
    <div className="keyword-search">
      <input
        type="text"
        className="keyword-search-input"
        placeholder="키워드 검색..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {matches.length > 0 && (
        <div className="keyword-search-results">
          {matches.map((k) => (
            <button
              type="button"
              key={k.id}
              className="keyword-search-result"
              onClick={() => {
                setSelected(k)
                setQuery('')
              }}
            >
              {localize(k.name, lang)}
            </button>
          ))}
        </div>
      )}
      {selected && (
        <Modal title={localize(selected.name, lang)} onClose={() => setSelected(null)}>
          <p className="keyword-search-definition">
            {lang === 'en' ? selected.definition.en : selected.definition.ko}
          </p>
        </Modal>
      )}
    </div>
  )
}
