import type { Keyword } from '../../types'
import { useLang, useLocalize } from '../../LangContext'
import { keywordEntryForName, stripKeywordPlaceholder } from './keywordHighlight'
import { localizeTag, localizeTagWordsInText } from './tagLabels'

/**
 * 한글 무기 키워드 표기. 원문 카드처럼 값을 이름에 붙여 쓰고('장거리 사격(18")'), 용어집 한글 이름이
 * 값 자리로 시작하는 키워드('[분류](X) 관통')는 값을 이름 앞에 둔다('중장갑(3) 관통').
 */
function koKeywordLabel(name: string, suffix: string, koTemplate: string | undefined): string {
  if (!suffix) return name
  const compact = suffix.replace(/\s+\(/g, '(')
  if (koTemplate?.startsWith('[')) return `${compact} ${name}`
  return compact.startsWith('(') ? `${name}${compact}` : `${name} ${compact}`
}

export function KeywordList({ keywords }: { keywords: Keyword[] }) {
  const localize = useLocalize()
  const { lang } = useLang()
  if (keywords.length === 0) return <span className="card-dash">-</span>
  return (
    <>
      {keywords.map((kw, i) => {
        const entry = keywordEntryForName(kw.name)
        /*
          KeywordList는 무기의 KEYWORD 칸(용어집에 실린 룰 키워드)과 유닛의 TAGS 칸(Armoured/Light/
          Ground 같은 분류 태그) 둘 다에 쓰인다. 전자는 keywords.ts 용어집에서, 후자는 tagLabels의
          작은 사전에서 찾는다 — 둘 다 없으면(Mechanical/Biological 등 아직 번역이 없는 태그) 원문 그대로 둔다.
        */
        const name = entry ? stripKeywordPlaceholder(localize(entry.name)) : localizeTag(kw.name, lang)
        // PIERCE의 suffix('Armoured (3)')처럼, 값 자리에 태그 이름이 자유 텍스트로 섞여 들어오는
        // 경우가 있어 태그 단어만 골라 번역한다
        const suffix = kw.suffix ? localizeTagWordsInText(kw.suffix, lang) : ''
        const label =
          lang === 'ko' ? koKeywordLabel(name, suffix, entry?.name.ko) : suffix ? `${name} ${suffix}` : name
        return (
          <span key={i} className="card-keyword">
            {label}
            {i < keywords.length - 1 ? ', ' : ''}
          </span>
        )
      })}
    </>
  )
}
