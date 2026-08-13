import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

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

  /**
   * body에 직접 포탈로 렌더링한다. 그렇지 않으면 모달이 sticky 조상(.roster-builder-body 등)의
   * 스태킹 컨텍스트에 갇혀서, z-index와 무관하게 옆 패널(.roster-detail-panel)보다 아래에 그려진다.
   */
  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">{title}</span>
          <button type="button" className="btn btn-danger" onClick={onClose} aria-label="닫기">
            ✕
          </button>
        </div>
        {subHeader && <div className="modal-subheader">{subHeader}</div>}
        <div className="modal-body">{children}</div>
      </div>
    </div>,
    document.body,
  )
}
