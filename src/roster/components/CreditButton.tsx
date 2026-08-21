import { useState } from 'react'
import { Modal } from './Modal'

/** Document/credit.txt의 내용을 그대로 옮김 */
const CREDIT_ITEMS: { label: string; value: string }[] = [
  { label: '제작', value: '세탁기' },
  { label: '룰 한글 번역', value: '정의진' },
  { label: '폰트', value: 'Pretendard' },
  { label: '문의', value: '4595jmg@gmail.com' },
]

export function CreditButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        className="btn roster-icon-btn"
        onClick={() => setOpen(true)}
        aria-label="크레딧"
        title="크레딧"
      >
        <span className="roster-icon roster-icon-credit" aria-hidden="true" />
      </button>

      {open && (
        <Modal title="크레딧" onClose={() => setOpen(false)} className="modal-panel-narrow">
          <div className="credit-modal">
            <p className="credit-modal-notice">
              이 앱은 Archon Studio가 Blizzard Entertainment의 IP로 제작한 스타크래프트 미니어처 게임에 대한 팬심으로
              만든 비공식 팬 프로젝트이며,
              <br />
              두 회사와는 무관하게 비영리 목적으로만 운영됩니다.
            </p>
            <dl className="credit-modal-list">
              {CREDIT_ITEMS.map((item) => (
                <div className="credit-modal-item" key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Modal>
      )}
    </>
  )
}
