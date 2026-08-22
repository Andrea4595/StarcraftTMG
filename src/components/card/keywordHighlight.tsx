import type { ReactNode } from 'react'
import { KEYWORDS, type KeywordEntry } from '../../data/keywords'
import type { Ability, Keyword } from '../../types'
import { useLocalize } from '../../LangContext'

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

/** 능력 설명 본문에서 실제로 어떤 키워드가 언급됐는지 찾기 위한, 엔트리별 매칭 정규식 */
const KEYWORD_ENTRY_PATTERNS: { entry: KeywordEntry; regex: RegExp }[] = KEYWORDS.filter(
  (k) => !EXCLUDED_IDS.has(k.id),
)
  .map((entry) => {
    const sources = [entry.name.ko, entry.name.en]
      .filter((s, i, all) => s.length > 0 && all.indexOf(s) === i)
      .map(buildPatternSource)
      .filter((s) => s.length > 0)
    return sources.length > 0 ? { entry, regex: new RegExp(sources.map((p) => `(?:${p})`).join('|'), 'i') } : null
  })
  .filter((p): p is { entry: KeywordEntry; regex: RegExp } => p !== null)

/** 능력 설명 본문(룰 텍스트)에 실제로 등장하는 키워드 엔트리를 (중복 없이) 찾아 반환한다 */
export function matchedKeywordsInText(text: string): KeywordEntry[] {
  if (!text) return []
  const found: KeywordEntry[] = []
  for (const { entry, regex } of KEYWORD_ENTRY_PATTERNS) {
    if (regex.test(text)) found.push(entry)
  }
  return found
}

/**
 * 이름 템플릿에서 (X)/(Y)/[Tag] 같은 값 자리와 괄호 밖에 홀로 있는 X/Y를 지워 순수 이름만 남긴다.
 * 무기 프로필의 KEYWORD 칸(예: 'LONG RANGE', 'ANTI-EVADE')은 이미 이 형태(값 없는 순수 이름)로
 * 저장되어 있어서, 키워드 사전 id도 같은 방식으로 다듬어야 서로 비교/매칭할 수 있다. 한글 이름
 * 템플릿(예: '안티-회피(X)')에도 그대로 써서, KEYWORD 칸에 값과 함께 보여줄 때 "안티-회피(X) (1)"처럼
 * 자리표시자가 실제 값 옆에 중복으로 남지 않게 한다.
 */
function stripPlaceholder(template: string): string {
  return template
    .replace(/\[[^\]]*\]/g, ' ')
    .replace(/\([^)]*\)/g, ' ')
    .replace(/"/g, ' ')
    .split(/\s+/)
    .filter((tok) => tok && tok !== 'X' && tok !== 'Y')
    .join(' ')
    .trim()
}

const KEYWORD_BASE_NAME_MAP = new Map<string, KeywordEntry>(
  KEYWORDS.map((entry) => [stripPlaceholder(entry.id).toUpperCase(), entry]),
)

/** 무기 KEYWORD 칸의 이름(예: 'LONG RANGE')으로 키워드 사전 엔트리를 찾는다. 못 찾으면 undefined */
export function keywordEntryForName(name: string): KeywordEntry | undefined {
  return KEYWORD_BASE_NAME_MAP.get(name.toUpperCase())
}

/**
 * 이미 localize()로 번역된 키워드 이름(예: '안티-회피(X)')에서 (X)/[Tag] 값 자리를 지워, 무기
 * KEYWORD 칸처럼 실제 값(suffix)을 따로 붙이는 자리에 쓸 수 있는 순수 이름으로 만든다.
 */
export function stripKeywordPlaceholder(localizedName: string): string {
  return stripPlaceholder(localizedName)
}

function weaponKeywordEntries(keywords: Keyword[]): KeywordEntry[] {
  const found: KeywordEntry[] = []
  const seen = new Set<string>()
  for (const kw of keywords) {
    const entry = keywordEntryForName(kw.name)
    if (entry && !seen.has(entry.id)) {
      seen.add(entry.id)
      found.push(entry)
    }
  }
  return found
}

/** 어빌리티(룰/무기 프로필)에 실제로 쓰인 키워드 엔트리 목록. 상세 모달에서 설명을 나열할 때 쓴다 */
export function keywordEntriesForAbility(ability: Ability): KeywordEntry[] {
  if (ability.kind === 'weapon') return weaponKeywordEntries(ability.stat.keyword)
  return matchedKeywordsInText(`${ability.rule.en} ${ability.rule.ko}`)
}

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

/** 여러 어빌리티(원거리 무기 종합 모달 전용)에 쓰인 키워드를 (중복 없이) 모아 반환한다 */
function keywordEntriesForAbilities(abilities: Ability[]): KeywordEntry[] {
  const found: KeywordEntry[] = []
  const seen = new Set<string>()
  for (const ability of abilities) {
    for (const entry of keywordEntriesForAbility(ability)) {
      if (!seen.has(entry.id)) {
        seen.add(entry.id)
        found.push(entry)
      }
    }
  }
  return found
}

/**
 * 어빌리티 상세 모달 전용: 그 능력(들)에 쓰인 키워드의 이름/설명을 나열한다. ability 하나만 넘기면
 * 그 능력의 키워드만, abilities를 넘기면(원거리 무기 종합 모달) 전부 모아 중복 없이 보여준다.
 */
export function KeywordDefinitionsList({ ability, abilities }: { ability?: Ability; abilities?: Ability[] }) {
  const localize = useLocalize()
  const entries = ability ? keywordEntriesForAbility(ability) : abilities ? keywordEntriesForAbilities(abilities) : []
  if (entries.length === 0) return null

  return (
    <div className="card-keyword-definitions">
      {entries.map((entry) => (
        <div key={entry.id}>
          <div className="card-keyword-definition-name">{localize(entry.name)}</div>
          <p className="card-keyword-definition-text">{localize(entry.definition)}</p>
        </div>
      ))}
    </div>
  )
}
