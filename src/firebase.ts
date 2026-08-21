import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

/**
 * 이 값들은 비밀키가 아니라 공개 식별자다. 실제 접근 제어는 Firestore 보안 규칙이 담당하므로
 * 클라이언트 코드에 그대로 커밋해도 안전하다.
 */
const firebaseConfig = {
  apiKey: 'AIzaSyDDlGEvfDiWjOqBJiH6sSt11EcQIpY_DAA',
  authDomain: 'starcrafttmg-3157c.firebaseapp.com',
  projectId: 'starcrafttmg-3157c',
  storageBucket: 'starcrafttmg-3157c.firebasestorage.app',
  messagingSenderId: '332418510235',
  appId: '1:332418510235:web:2ba71dc90500323b65853e',
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()
