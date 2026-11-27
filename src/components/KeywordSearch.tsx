import { useMemo, useState } from 'react'
import { KEYWORDS, type KeywordEntry } from '../data/keywords'
import { searchFaq } from '../data/faq'
import { localize, useLang } from '../LangContext'
import { Modal } from '../roster/components/Modal'
import { FaqModal } from './FaqModal'

/** 키워드 결과 아래에 붙는 FAQ 결과 최대 개수. 키워드 결과를 밀어내지 않도록 적게 둔다 */
const MAX_FAQ_RESULTS = 6

export function KeywordSearch() {
  const { lang } = useLang()
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<KeywordEntry | null>(null)
  const [faqItemId, setFaqItemId] = useState<string | null>(null)

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return KEYWORDS.filter(
      (k) => k.name.en.toLowerCase().includes(q) || k.name.ko.toLowerCase().includes(q),
    ).slice(0, 8)
  }, [query])

  const faqMatches = useMemo(() => searchFaq(query).slice(0, MAX_FAQ_RESULTS), [query])

  return (
    <div className="keyword-search">
      <input
        type="text"
        className="keyword-search-input"
        placeholder="키워드·FAQ 검색..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {(matches.length > 0 || faqMatches.length > 0) && (
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
          {faqMatches.map(({ item }) => (
            <button
              type="button"
              key={item.id}
              className="keyword-search-result keyword-search-result-faq"
              onClick={() => {
                setFaqItemId(item.id)
                setQuery('')
              }}
            >
              <span className="keyword-search-faq-tag">FAQ</span>
              <span className="keyword-search-faq-q">{item.q}</span>
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
      {faqItemId && <FaqModal initialItemId={faqItemId} onClose={() => setFaqItemId(null)} />}
    </div>
  )
}
