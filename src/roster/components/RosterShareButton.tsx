import { useState } from 'react'
import type { Roster } from '../../types'
import { Modal } from './Modal'
import { buildShareUrl } from '../rosterShare'

type ShareState =
  | { phase: 'generating' }
  | { phase: 'ready'; url: string; copied: boolean }
  | { phase: 'error' }

/** 이 로스터를 그대로 담은 링크를 만든다. 받은 사람이 링크를 열면 앱이 자동으로 로스터를 추가한다 */
export function RosterShareButton({ roster }: { roster: Roster }) {
  const [state, setState] = useState<ShareState | null>(null)

  const open = async () => {
    setState({ phase: 'generating' })
    try {
      setState({ phase: 'ready', url: await buildShareUrl(roster), copied: false })
    } catch (err) {
      console.error(err)
      setState({ phase: 'error' })
    }
  }

  const copy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url)
      setState({ phase: 'ready', url, copied: true })
    } catch (err) {
      console.error(err)
    }
  }

  const share = async (url: string) => {
    try {
      await navigator.share({ title: roster.name, url })
    } catch (err) {
      // 사용자가 공유 시트를 취소한 경우 등은 조용히 무시한다
      if ((err as Error)?.name !== 'AbortError') console.error(err)
    }
  }

  const canShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function'

  return (
    <>
      <button
        type="button"
        className="btn roster-icon-btn"
        onClick={open}
        aria-label="로스터 공유"
        title="로스터 공유"
      >
        <span className="roster-icon roster-icon-share" aria-hidden="true" />
      </button>

      {state && (
        <Modal title="로스터 공유" onClose={() => setState(null)}>
          {state.phase === 'generating' && <div className="roster-export-status">링크를 만드는 중입니다...</div>}
          {state.phase === 'error' && (
            <div className="roster-export-status roster-export-status-error">
              링크 생성에 실패했습니다. 다시 시도해주세요.
            </div>
          )}
          {state.phase === 'ready' && (
            <div className="roster-share">
              <p className="roster-share-desc">
                이 링크를 받은 사람이 열면 '{roster.name}' 로스터가 그 사람의 앱에 자동으로 추가됩니다.
              </p>
              <input
                className="roster-share-url"
                readOnly
                value={state.url}
                onFocus={(e) => e.currentTarget.select()}
              />
              <div className="roster-export-result-actions">
                <button type="button" className="btn" onClick={() => copy(state.url)}>
                  {state.copied ? '복사됨 ✓' : '링크 복사'}
                </button>
                {canShare && (
                  <button type="button" className="btn" onClick={() => share(state.url)}>
                    공유
                  </button>
                )}
              </div>
            </div>
          )}
        </Modal>
      )}
    </>
  )
}
