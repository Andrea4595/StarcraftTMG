import { useEffect, useRef, useState } from 'react'
import { toPng } from 'html-to-image'
import type { RaceData, Roster } from '../../types'
import { Modal } from './Modal'
import { RosterExportView, type ExportMode } from './RosterExportView'

interface PendingExport {
  mode: ExportMode
  win: Window
}

const LOADING_HTML =
  '<!doctype html><title>이미지 생성 중...</title><body style="margin:0;background:#0c0d12;color:#8b8fa3;' +
  'font-family:system-ui,sans-serif;display:flex;align-items:center;justify-content:center;height:100vh">' +
  '이미지를 생성하는 중입니다...</body>'

function escapeHtml(s: string): string {
  const map: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
  return s.replace(/[&<>"']/g, (c) => map[c])
}

function writeToWindow(win: Window, html: string) {
  win.document.open()
  win.document.write(html)
  win.document.close()
}

/**
 * 팝업 차단을 피하려면 window.open()을 클릭 핸들러 안에서 동기적으로 호출해야 한다.
 * 단, target="_blank"로만 열면 새 '탭'이 되어 포커스를 가져가면서 이 페이지가 백그라운드로 밀리는데,
 * html-to-image가 캡처 마지막 단계에서 requestAnimationFrame에 의존하기 때문에 백그라운드 탭에서는
 * 그 rAF가 아예 발생하지 않아 캡처가 영원히 끝나지 않는다. window 크기를 지정해 별도의 '창'으로
 * 열면 포커스가 없어도 화면에 보이는 동안은 rAF가 계속 발생하므로 이 문제를 피할 수 있다.
 */
function openLoadingWindow(): Window | null {
  const win = window.open('', '_blank', 'width=1000,height=800')
  if (!win) return null
  writeToWindow(win, LOADING_HTML)
  return win
}

export function RosterExportButton({ race, roster }: { race: RaceData; roster: Roster }) {
  const [choiceOpen, setChoiceOpen] = useState(false)
  const [pending, setPending] = useState<PendingExport | null>(null)
  const nodeRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!pending) return
    const node = nodeRef.current
    if (!node) return
    let cancelled = false

    ;(async () => {
      try {
        await document.fonts?.ready
        const dataUrl = await toPng(node, { backgroundColor: '#0c0d12', pixelRatio: 2 })
        if (cancelled) return
        const title = `${roster.name} - ${pending.mode === 'detailed' ? '상세' : '간소화'} 로스터`
        writeToWindow(
          pending.win,
          `<!doctype html>
<html>
<head><meta charset="utf-8" /><title>${escapeHtml(title)}</title></head>
<body style="margin:0;background:#0c0d12;display:flex;justify-content:center;padding:24px;box-sizing:border-box;">
<img src="${dataUrl}" alt="${escapeHtml(title)}" style="max-width:100%;height:auto;" />
</body>
</html>`,
        )
        setChoiceOpen(false)
      } catch (err) {
        console.error(err)
        if (!cancelled) {
          writeToWindow(
            pending.win,
            '<!doctype html><title>내보내기 실패</title><body style="margin:0;background:#0c0d12;color:#f87171;' +
              'font-family:system-ui,sans-serif;display:flex;align-items:center;justify-content:center;height:100vh">' +
              '이미지 생성에 실패했습니다. 이 창을 닫고 다시 시도해주세요.</body>',
          )
        }
      } finally {
        if (!cancelled) setPending(null)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [pending, roster.name])

  const startExport = (mode: ExportMode) => {
    const win = openLoadingWindow()
    if (!win) {
      window.alert('팝업이 차단되어 새 창을 열 수 없습니다. 팝업 차단을 해제한 뒤 다시 시도해주세요.')
      return
    }
    setChoiceOpen(false)
    setPending({ mode, win })
  }

  return (
    <>
      <button type="button" className="btn roster-export-btn" onClick={() => setChoiceOpen(true)}>
        내보내기
      </button>

      {choiceOpen && (
        <Modal title="로스터 내보내기" onClose={() => setChoiceOpen(false)}>
          <div className="roster-export-choice">
            <button
              type="button"
              className="roster-export-choice-option"
              disabled={pending !== null}
              onClick={() => startExport('detailed')}
            >
              <span className="roster-export-choice-option-title">상세 로스터</span>
              <span className="roster-export-choice-option-desc">
                포함된 모든 팩션/택티컬 카드와 유닛 카드의 상세 정보를 그대로 보여줍니다.
              </span>
            </button>
            <button
              type="button"
              className="roster-export-choice-option"
              disabled={pending !== null}
              onClick={() => startExport('simple')}
            >
              <span className="roster-export-choice-option-title">간소화 로스터</span>
              <span className="roster-export-choice-option-desc">
                택티컬 카드 이름과, 유닛별로 선택한 업그레이드만 목록으로 보여줍니다.
              </span>
            </button>
          </div>
        </Modal>
      )}

      {pending && (
        <div className="roster-export-offscreen">
          <div ref={nodeRef}>
            <RosterExportView race={race} roster={roster} mode={pending.mode} />
          </div>
        </div>
      )}
    </>
  )
}
