import { useEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

/** 모달이 열릴 때마다 하나씩 올라가는 전역 카운터. 나중에 열린 모달이 항상 그 위에 그려지도록,
 *  마운트 순서를 z-index로 그대로 옮긴다. */
let topZIndex = 99

function nextZIndex() {
  topZIndex += 1
  return topZIndex
}

export function Modal({
  title,
  subHeader,
  onClose,
  children,
  className,
}: {
  /** 보통은 문자열이지만, 제목 옆에 배지 등을 함께 붙여야 할 때는 커스텀 노드를 넘길 수 있다 */
  title: ReactNode
  /** 헤더 아래, 스크롤되는 본문 위에 고정으로 표시되는 요약 정보 (예산/슬롯 현황 등) */
  subHeader?: ReactNode
  onClose: () => void
  children: ReactNode
  /** 기본 max-width(1100px)를 좁히는 등, 이 모달 인스턴스만 폭을 다르게 주고 싶을 때 .modal-panel에 덧붙일 클래스 */
  className?: string
}) {
  /** 마운트 시점에 한 번만 발급받아 이 모달 인스턴스에 고정한다 */
  const [zIndex] = useState(nextZIndex)

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
    <div className="modal-backdrop" style={{ zIndex }} onClick={onClose}>
      <div className={`modal-panel ${className ?? ''}`} onClick={(e) => e.stopPropagation()}>
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
