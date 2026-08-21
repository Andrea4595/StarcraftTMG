import type { ReactNode } from 'react'
import { KEYWORDS } from '../../data/keywords'

/**
 * 문법적으로 너무 흔한 단어라 강조하면 오히려 지저분해지는 키워드는 뺀다. '적', '아군', '안에'
 * 같은 건 거의 모든 문장에 등장해서 강조로서의 의미가 없다.
 */
const EXCLUDED_IDS = new Set(['ENEMY', 'FRIENDLY', 'STATUS', 'WHOLLY WITHIN', 'WITHIN'])

function escapeLiteral(ch: string): string {
  return /[.*+?^${}()|[\]\\]/.test(ch) ? `\\${ch}` : ch
}

/**
 * 키워드 이름 템플릿(예: '버프 [능력치](X)', '안티-회피(X)')을, 실제 능력 설명 본문에 등장하는
 * 형태와 매칭되는 정규식 소스로 바꾼다.
 * - [단어] 자리는 본문에서는 대괄호 없이 실제 값이 그대로 들어간다 (예: '버프 스피드(1)')
 * - (X)/(Y)/(Unit Name)처럼 괄호로 감싼 자리는 실제 값이 그 괄호 안에 들어간다
 * - 괄호/대괄호 밖에 홀로 있는 X/Y는 괄호 없이 숫자만 들어간다. 문자열 맨 끝에 있으면
 *   (예: '임팩트(X) Y') 실제 텍스트에서 그 값 자체가 생략되는 경우가 흔해서, 매칭 대상에서 뺀다.
 */
function buildPatternSource(template: string): string {
  let out = ''
  let i = 0
  while (i < template.length) {
    const ch = template[i]
    if (ch === '[') {
      const end = template.indexOf(']', i)
      if (end === -1) {
        out += escapeLiteral(ch)
        i += 1
        continue
      }
      out += '[^\\s()]+'
      i = end + 1
      continue
    }
    if (ch === '(') {
      const end = template.indexOf(')', i)
      if (end === -1) {
        out += escapeLiteral(ch)
        i += 1
        continue
      }
      out += '\\([^)]*\\)'
      i = end + 1
      continue
    }
    if ((ch === 'X' || ch === 'Y') && (i === 0 || /\s/.test(template[i - 1]))) {
      const rest = template.slice(i + 1)
      if (/^"?\s*$/.test(rest)) {
        out = out.replace(/\s+$/, '')
        break
      }
      out += '\\d+'
      i += 1
      continue
    }
    out += escapeLiteral(ch)
    i += 1
  }
  return out
}

const PATTERN_SOURCES = KEYWORDS.filter((k) => !EXCLUDED_IDS.has(k.id))
  .flatMap((k) => [k.name.ko, k.name.en])
  .filter((s, index, all) => s.length > 0 && all.indexOf(s) === index)
  .map(buildPatternSource)
  .filter((s) => s.length > 0)
  // 더 길고 구체적인 패턴을 먼저 시도해야, 짧은 패턴이 긴 키워드의 일부를 가로채지 않는다
  // (예: '상태'보다 '인게이지 상태'가 먼저 매칭되어야 함)
  .sort((a, b) => b.length - a.length)

// 'i' 플래그: 키워드 사전의 영문 이름은 전부 대문자(예: 'ENGAGED')인데, 실제 능력 설명 영문
// 본문은 일반 문장 표기('Engaged')를 쓰기 때문에 대소문자를 구분하면 영문 쪽은 거의 매칭되지
// 않는다. 한글에는 대소문자가 없어 영향이 없다. 실제로 강조되는 텍스트는 match[0]을 그대로
// 쓰므로 표기(대소문자)는 원문 그대로 보여진다.
const COMBINED =
  PATTERN_SOURCES.length > 0 ? new RegExp(PATTERN_SOURCES.map((p) => `(?:${p})`).join('|'), 'gi') : null

/** 능력 설명 본문에서 키워드 용어를 찾아 <span className="card-rule-keyword">로 감싼 노드 배열을 만든다 */
export function highlightKeywords(text: string): ReactNode {
  if (!COMBINED || !text) return text

  COMBINED.lastIndex = 0
  const nodes: ReactNode[] = []
  let lastEnd = 0
  let match: RegExpExecArray | null
  let key = 0

  while ((match = COMBINED.exec(text))) {
    if (match[0].length === 0) {
      COMBINED.lastIndex += 1
      continue
    }
    if (match.index > lastEnd) nodes.push(text.slice(lastEnd, match.index))
    nodes.push(
      <span className="card-rule-keyword" key={key++}>
        {match[0]}
      </span>,
    )
    lastEnd = match.index + match[0].length
  }
  if (lastEnd < text.length) nodes.push(text.slice(lastEnd))
  return nodes
}
