import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth'
import { auth, googleProvider } from './firebase'

/** Firebase의 User 타입을 그대로 노출하지 않고, 실제로 쓰는 필드만 좁혀서 export한다 */
export interface AuthUser {
  uid: string
  displayName: string | null
  photoURL: string | null
  email: string | null
}

interface AuthStore {
  user: AuthUser | null
  /** 최초 onAuthStateChanged 콜백이 오기 전까지 true. 로그아웃 상태가 잠깐 깜빡이는 걸 막는 데 쓴다 */
  loading: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthStore | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(
        firebaseUser
          ? {
              uid: firebaseUser.uid,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
              email: firebaseUser.email,
            }
          : null,
      )
      setLoading(false)
    })
    return unsub
  }, [])

  const store: AuthStore = {
    user,
    loading,
    signIn: async () => {
      try {
        await signInWithPopup(auth, googleProvider)
      } catch (err) {
        const code = (err as { code?: string })?.code
        // 사용자가 팝업을 직접 닫은 경우 등은 에러로 취급하지 않는다
        if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') return
        console.error(err)
      }
    },
    signOut: async () => {
      try {
        await firebaseSignOut(auth)
      } catch (err) {
        console.error(err)
      }
    },
  }

  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthStore {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
