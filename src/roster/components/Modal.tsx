import { useEffect, type ReactNode } from 'react'

export function Modal({
  title,
  subHeader,
  onClose,
  children,
}: {
  title: string
  /** 헤더 아래, 스크롤되는 본문 위에 고정으로 표시되는 요약 정보 (예산/슬롯 현황 등) */
  subHeader?: ReactNode
  onClose: () => void
  children: ReactNode
}) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">{title}</span>
          <button type="button" className="btn" onClick={onClose} aria-label="닫기">
            ✕
          </button>
        </div>
        {subHeader && <div className="modal-subheader">{subHeader}</div>}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  )
}
