import { useState } from 'react'
import { useAuth } from '../../AuthContext'
import { Modal } from './Modal'

/**
 * 구글 공식 다색 "G" 마크. 다른 아이콘 버튼(내보내기/레퍼런스/크레딧)은 단색 PNG를 currentColor로
 * 마스킹해서 테마에 맞게 칠하는데, 구글 로고는 브랜드 가이드상 이 다색 그대로 써야 해서 인라인 SVG로 둔다.
 */
function GoogleGIcon() {
  return (
    <svg width="16.8" height="16.8" viewBox="0 0 18 18" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" />
      <path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z" />
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" />
    </svg>
  )
}

export function AuthButton() {
  const { user, loading, signIn, signOut } = useAuth()
  const [open, setOpen] = useState(false)

  // 최초 onAuthStateChanged 콜백이 오기 전까지는 아무것도 안 보여준다 (로그아웃 상태가 잠깐 깜빡이는 것 방지)
  if (loading) return null

  if (!user) {
    return (
      <button type="button" className="btn roster-icon-btn" onClick={signIn} aria-label="Google 로그인" title="Google 로그인">
        <GoogleGIcon />
      </button>
    )
  }

  return (
    <>
      <button
        type="button"
        className="btn roster-icon-btn"
        onClick={() => setOpen(true)}
        aria-label="계정"
        title={user.displayName ?? '계정'}
      >
        {user.photoURL ? (
          <img className="roster-auth-avatar" src={user.photoURL} alt="" referrerPolicy="no-referrer" />
        ) : (
          <span className="roster-icon roster-icon-credit" aria-hidden="true" />
        )}
      </button>

      {open && (
        <Modal title="계정" onClose={() => setOpen(false)} className="modal-panel-narrow">
          <div className="credit-modal">
            <p className="credit-modal-notice">
              {user.displayName}
              {user.email ? ` (${user.email})` : ''}
              <br />
              로그인 중에는 이 계정으로 로스터가 자동으로 동기화됩니다.
            </p>
            <button
              type="button"
              className="btn"
              onClick={() => {
                signOut()
                setOpen(false)
              }}
            >
              로그아웃
            </button>
          </div>
        </Modal>
      )}
    </>
  )
}
