import { KEYWORDS } from '../src/data/keywords'
import { terran } from '../src/data/terran'
import { zerg } from '../src/data/zerg'
import { protoss } from '../src/data/protoss'
import type { Ability, Card, RaceData } from '../src/types'

const EXCLUDED_IDS = new Set(['ENEMY', 'FRIENDLY', 'STATUS', 'WHOLLY WITHIN', 'WITHIN'])

function escapeLiteral(ch: string): string {
  return /[.*+?^${}()|[\]\\]/.test(ch) ? `\\${ch}` : ch
}

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

// ---- 카드 코퍼스 수집 ----
function collectAbilityText(a: Ability, bucket: string[]) {
  bucket.push(a.name.ko, a.name.en)
  if (a.kind === 'rule') bucket.push(a.rule.ko, a.rule.en)
}

function collectCardText(c: Card, bucket: string[]) {
  bucket.push(c.name.ko, c.name.en)
  if (c.category === 'unit') {
    for (const a of c.abilities) collectAbilityText(a, bucket)
    for (const u of c.upgrades) collectAbilityText(u.ability, bucket)
  } else {
    for (const a of c.cardAbilities) collectAbilityText(a, bucket)
  }
}

function collectRaceText(r: RaceData, bucket: string[]) {
  for (const c of r.factionCards) collectCardText(c, bucket)
  for (const c of r.tacticalCards) collectCardText(c, bucket)
  for (const c of r.units) collectCardText(c, bucket)
}

const bucket: string[] = []
collectRaceText(terran, bucket)
collectRaceText(zerg, bucket)
collectRaceText(protoss, bucket)
const corpus = bucket.join('\n')

// ---- 감사 ----
console.log(`코퍼스 문자열 조각 수: ${bucket.length}\n`)

for (const k of KEYWORDS) {
  if (EXCLUDED_IDS.has(k.id)) continue
  for (const template of [k.name.ko, k.name.en]) {
    if (!template) continue
    const src = buildPatternSource(template)
    if (!src) continue
    let re: RegExp
    try {
      re = new RegExp(src, 'gi')
    } catch {
      console.log(`[정규식 오류] ${k.id} / "${template}" -> /${src}/`)
      continue
    }
    const strictHit = re.test(corpus)
    if (strictHit) continue // 정상적으로 매칭됨, 문제 없음

    // 정확 매칭은 안 되지만, 공백/하이픈을 무시하고 대소문자도 무시하면 코퍼스 어딘가에 있는지 확인
    const normalize = (s: string) => s.replace(/[\s-]+/g, '').toLowerCase()
    const noSpaceTemplate = normalize(template)
    const literalNoSpace = noSpaceTemplate
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      .replace(/\\\[[^\]]*\\\]/g, '[^\\s()-]+')
    let looseHit = false
    try {
      looseHit = new RegExp(literalNoSpace).test(normalize(corpus))
    } catch {
      looseHit = false
    }
    if (looseHit) {
      console.log(`[표기 불일치 의심] ${k.id}: 키워드="${template}" (본문에 공백/하이픈 제거 시 존재하지만 정확히 매칭 안 됨)`)
    }
  }
}
