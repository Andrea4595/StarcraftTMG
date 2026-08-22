import type { Keyword } from '../../types'
import { useLocalize } from '../../LangContext'
import { keywordEntryForName, stripKeywordPlaceholder } from './keywordHighlight'

export function KeywordList({ keywords }: { keywords: Keyword[] }) {
  const localize = useLocalize()
  if (keywords.length === 0) return <span className="card-dash">-</span>
  return (
    <>
      {keywords.map((kw, i) => {
        const entry = keywordEntryForName(kw.name)
        const name = entry ? stripKeywordPlaceholder(localize(entry.name)) : kw.name
        return (
          <span key={i} className="card-keyword">
            {name}
            {kw.suffix ? ` ${kw.suffix}` : ''}
            {i < keywords.length - 1 ? ', ' : ''}
          </span>
        )
      })}
    </>
  )
}
