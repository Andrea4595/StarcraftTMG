import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Rule } from './types'

export type Lang = 'ko' | 'en'

/** {en, ko} 쌍에서 현재 언어에 맞는 텍스트를 뽑는다. ko가 비어 있으면 en으로 대체한다 */
export function localize(text: Rule, lang: Lang): string {
  return lang === 'en' ? text.en : text.ko || text.en
}

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

/** 현재 언어에 맞춰 {en, ko} 쌍을 문자열로 변환하는 훅 버전의 localize */
export function useLocalize(): (text: Rule) => string {
  const { lang } = useLang()
  return (text: Rule) => localize(text, lang)
}
