import { createContext, useContext, useState, type ReactNode } from 'react'

export type Lang = 'ko' | 'en'

interface LangStore {
  lang: Lang
  setLang: (lang: Lang) => void
}

const LangContext = createContext<LangStore | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ko')
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

export function useLang(): LangStore {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LangProvider')
  return ctx
}
