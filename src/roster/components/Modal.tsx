import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

export function Modal({
  title,
  subHeader,
  onClose,
  children,
  nested,
}: {
  /** 보통은 문자열이지만, 제목 옆에 배지 등을 함께 붙여야 할 때는 커스텀 노드를 넘길 수 있다 */
  title: ReactNode
  /** 헤더 아래, 스크롤되는 본문 위에 고정으로 표시되는 요약 정보 (예산/슬롯 현황 등) */
  subHeader?: ReactNode
  onClose: () => void
  children: ReactNode
  /**
   * 다른 Modal의 자식으로 렌더링되는 모달(예: 모바일 상세 모달)이면 true로 넘긴다. 두 모달 모두
   * document.body에 별도로 포탈되는데, 같은 커밋에서 함께 마운트되면 React가 자식(=이 모달)의
   * DOM 노드를 부모보다 먼저 body에 삽입한다. z-index가 같으면 나중에 삽입된 부모 모달이 위에
   * 그려져 이 모달을 완전히 가려버리므로(클릭도 막힘), 더 높은 z-index로 항상 위에 오게 한다.
   */
  nested?: boolean
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
    <div className={`modal-backdrop ${nested ? 'modal-backdrop-nested' : ''}`} onClick={onClose}>
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
