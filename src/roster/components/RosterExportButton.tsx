import { useEffect, useRef, useState } from 'react'
import { toPng } from 'html-to-image'
import type { RaceData, Roster } from '../../types'
import { Modal } from './Modal'
import { RosterExportView, type ExportMode } from './RosterExportView'

type ExportState =
  | { phase: 'choice' }
  | { phase: 'generating'; mode: ExportMode }
  | { phase: 'ready'; mode: ExportMode; dataUrl: string }
  | { phase: 'error'; mode: ExportMode }

function sanitizeFileName(name: string): string {
  return name.replace(/[\\/:*?"<>|]/g, '_').trim() || 'roster'
}

async function dataUrlToFile(dataUrl: string, fileName: string): Promise<File> {
  const res = await fetch(dataUrl)
  const blob = await res.blob()
  return new File([blob], fileName, { type: blob.type })
}

export function RosterExportButton({ race, roster }: { race: RaceData; roster: Roster }) {
  const [state, setState] = useState<ExportState | null>(null)
  const nodeRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!state || state.phase !== 'generating') return
    const node = nodeRef.current
    if (!node) return
    let cancelled = false

    ;(async () => {
      try {
        await document.fonts?.ready
        const dataUrl = await toPng(node, { backgroundColor: '#0c0d12', pixelRatio: 2 })
        if (cancelled) return
        setState({ phase: 'ready', mode: state.mode, dataUrl })
      } catch (err) {
        console.error(err)
        if (!cancelled) setState({ phase: 'error', mode: state.mode })
      }
    })()

    return () => {
      cancelled = true
    }
  }, [state])

  const startExport = (mode: ExportMode) => setState({ phase: 'generating', mode })

  const downloadImage = async (dataUrl: string, mode: ExportMode) => {
    const fileName = `${sanitizeFileName(roster.name)}-${mode === 'detailed' ? '상세' : '간소화'}.png`
    const file = await dataUrlToFile(dataUrl, fileName)
    const url = URL.createObjectURL(file)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    a.click()
    URL.revokeObjectURL(url)
  }

  const shareImage = async (dataUrl: string, mode: ExportMode) => {
    const fileName = `${sanitizeFileName(roster.name)}-${mode === 'detailed' ? '상세' : '간소화'}.png`
    const file = await dataUrlToFile(dataUrl, fileName)
    try {
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: roster.name })
      }
    } catch (err) {
      // 사용자가 공유 시트를 취소한 경우 등은 조용히 무시한다
      if ((err as Error)?.name !== 'AbortError') console.error(err)
    }
  }

  const canShareFiles =
    typeof navigator !== 'undefined' && typeof navigator.canShare === 'function' && typeof navigator.share === 'function'

  return (
    <>
      <button type="button" className="btn roster-export-btn" onClick={() => setState({ phase: 'choice' })}>
        내보내기
      </button>

      {state?.phase === 'choice' && (
        <Modal title="로스터 내보내기" onClose={() => setState(null)}>
          <div className="roster-export-choice">
            <button type="button" className="roster-export-choice-option" onClick={() => startExport('detailed')}>
              <span className="roster-export-choice-option-title">상세 로스터</span>
              <span className="roster-export-choice-option-desc">
                포함된 모든 팩션/택티컬 카드와 유닛 카드의 상세 정보를 그대로 보여줍니다.
              </span>
            </button>
            <button type="button" className="roster-export-choice-option" onClick={() => startExport('simple')}>
              <span className="roster-export-choice-option-title">간소화 로스터</span>
              <span className="roster-export-choice-option-desc">
                택티컬 카드 이름과, 유닛별로 선택한 업그레이드만 목록으로 보여줍니다.
              </span>
            </button>
          </div>
        </Modal>
      )}

      {state?.phase === 'generating' && (
        <Modal title="로스터 내보내기" onClose={() => setState(null)}>
          <div className="roster-export-status">이미지를 생성하는 중입니다...</div>
        </Modal>
      )}

      {state?.phase === 'error' && (
        <Modal title="로스터 내보내기" onClose={() => setState(null)}>
          <div className="roster-export-status roster-export-status-error">
            이미지 생성에 실패했습니다. 다시 시도해주세요.
          </div>
        </Modal>
      )}

      {state?.phase === 'ready' && (
        <Modal title="로스터 내보내기" onClose={() => setState(null)}>
          <div className="roster-export-result">
            <img className="roster-export-result-img" src={state.dataUrl} alt={`${roster.name} 로스터`} />
            <div className="roster-export-result-actions">
              <button type="button" className="btn" onClick={() => downloadImage(state.dataUrl, state.mode)}>
                다운로드
              </button>
              {canShareFiles && (
                <button type="button" className="btn" onClick={() => shareImage(state.dataUrl, state.mode)}>
                  공유
                </button>
              )}
            </div>
          </div>
        </Modal>
      )}

      {state?.phase === 'generating' && (
        <div className="roster-export-offscreen">
          <div ref={nodeRef}>
            <RosterExportView race={race} roster={roster} mode={state.mode} />
          </div>
        </div>
      )}
    </>
  )
}
