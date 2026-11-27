import { useEffect, useMemo, useRef, useState } from 'react'
import { FAQ_SECTIONS, FAQ_VERSION, searchFaq } from '../data/faq'
import { useLang } from '../LangContext'
import { Modal } from '../roster/components/Modal'

/**
 * 공식 FAQ 한글 번역을 섹션별로 접고 펼쳐 보여주는 모달. initialItemId를 주면(키워드 검색에서 FAQ 결과를
 * 눌렀을 때) 그 문항을 펼친 채 그 위치로 스크롤해 연다.
 */
export function FaqModal({ initialItemId, onClose }: { initialItemId?: string; onClose: () => void }) {
  const { lang } = useLang()
  const [query, setQuery] = useState('')
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set(initialItemId ? [initialItemId] : []))
  const itemRefs = useRef(new Map<string, HTMLElement>())

  useEffect(() => {
    if (!initialItemId) return
    itemRefs.current.get(initialItemId)?.scrollIntoView({ block: 'start' })
  }, [initialItemId])

  /** 검색 중이면 맞는 문항만 남기고 모두 펼친다. 검색어가 없으면 전체 섹션을 그대로 보여준다 */
  const visible = useMemo(() => {
    if (!query.trim()) return FAQ_SECTIONS
    const matchedIds = new Set(searchFaq(query).map((m) => m.item.id))
    return FAQ_SECTIONS.map((s) => ({ ...s, items: s.items.filter((i) => matchedIds.has(i.id)) })).filter(
      (s) => s.items.length > 0,
    )
  }, [query])
  const searching = query.trim().length > 0

  const toggle = (id: string) =>
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <Modal
      title="자주 묻는 질문 (FAQ)"
      className="modal-panel-narrow"
      onClose={onClose}
      subHeader={
        <div className="faq-subheader">
          <div className="faq-meta">
            FAQ v{FAQ_VERSION.version} · {FAQ_VERSION.date} · 한글 번역: 자원이 부족합니다
            {lang === 'en' && <div>English FAQ is not available yet — showing the Korean translation.</div>}
          </div>
          <input
            type="text"
            className="keyword-search-input faq-search-input"
            placeholder="FAQ 검색..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      }
    >
      {visible.length === 0 && <div className="faq-empty">검색 결과가 없습니다.</div>}
      {visible.map((section) => (
        <section key={section.id} className="faq-section">
          <h3 className="faq-section-title">{section.title}</h3>
          {section.items.map((item) => {
            const open = searching || openIds.has(item.id)
            return (
              <div
                key={item.id}
                className={`faq-item ${open ? 'faq-item-open' : ''}`}
                ref={(el) => {
                  if (el) itemRefs.current.set(item.id, el)
                  else itemRefs.current.delete(item.id)
                }}
              >
                <button type="button" className="faq-question" onClick={() => toggle(item.id)} aria-expanded={open}>
                  <span className="faq-q-mark">Q</span>
                  <span>{item.q}</span>
                </button>
                {open && (
                  <div className="faq-answer">
                    <span className="faq-a-mark">A</span>
                    <span>{item.a}</span>
                  </div>
                )}
              </div>
            )
          })}
        </section>
      ))}
    </Modal>
  )
}

/** 로스터 상단 아이콘 줄에 붙는 FAQ 버튼 */
export function FaqButton() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        type="button"
        className="btn roster-icon-btn"
        onClick={() => setOpen(true)}
        aria-label="자주 묻는 질문"
        title="자주 묻는 질문 (FAQ)"
      >
        <span className="roster-icon roster-icon-faq" aria-hidden="true" />
      </button>
      {open && <FaqModal onClose={() => setOpen(false)} />}
    </>
  )
}
