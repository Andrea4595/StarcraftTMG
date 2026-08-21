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
        <Modal title="크레딧" onClose={() => setOpen(false)}>
          <div className="credit-modal">
            <p className="credit-modal-notice">이 앱은 비영리 목적으로만 운영됩니다.</p>
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
