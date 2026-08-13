import { useLang } from '../LangContext'

export function LangToggleBar() {
  const { lang, setLang } = useLang()

  return (
    <div className="lang-toggle-bar">
      <div className="lang-toggle">
        <button
          type="button"
          className={`lang-toggle-option ${lang === 'ko' ? 'lang-toggle-option-active' : ''}`}
          onClick={() => setLang('ko')}
        >
          Ko
        </button>
        <button
          type="button"
          className={`lang-toggle-option ${lang === 'en' ? 'lang-toggle-option-active' : ''}`}
          onClick={() => setLang('en')}
        >
          En
        </button>
      </div>
    </div>
  )
}
