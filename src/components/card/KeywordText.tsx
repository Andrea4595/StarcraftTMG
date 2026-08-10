import type { Keyword } from '../../types'

export function KeywordList({ keywords }: { keywords: Keyword[] }) {
  if (keywords.length === 0) return <span className="card-dash">-</span>
  return (
    <>
      {keywords.map((kw, i) => (
        <span key={i} className="card-keyword">
          {kw.name}
          {kw.suffix ? ` ${kw.suffix}` : ''}
          {i < keywords.length - 1 ? ', ' : ''}
        </span>
      ))}
    </>
  )
}
