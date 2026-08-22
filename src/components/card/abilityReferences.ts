import type { Ability, Rule } from '../../types'

export interface AbilityReference {
  id: string
  name: Rule
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * ability의 룰 텍스트(en+ko) 안에서, 같은 유닛(pool)의 '다른' 어빌리티/무기 이름이 그대로
 * 언급된 항목을 찾는다. 예: 골리앗의 '아레스급 목표물 설정 시스템'은 텍스트에 '자동포'/
 * '하부 기관총'을 이름으로 직접 언급하므로 매치된다.
 *
 * 키워드 메커니즘을 통한 간접적인 연관 — 예를 들어 질럿의 '내 목숨을 아이어에'가 '파괴적인
 * 돌진'을 이름으로 언급하지 않고 IMPACT 키워드만 언급하는 경우 — 는 이 함수로 잡히지 않는다.
 * 이름 직접 언급만 다루는 게 의도된 범위다.
 */
export function abilityReferencesInText(pool: Ability[], ability: Ability): AbilityReference[] {
  if (ability.kind !== 'rule') return []
  const text = `${ability.rule.en} ${ability.rule.ko}`
  const found: AbilityReference[] = []
  for (const other of pool) {
    if (other.id === ability.id) continue
    /**
     * 이름은 한국어 표기만 검사한다. 영문 이름은 'Charge'(돌진)처럼 룰 텍스트 안에서 일반
     * 서술어로도 흔히 쓰이는 단어와 겹쳐, 진짜 이름 언급이 아닌데도 잘못 매치되기 쉽다
     * (예: '파괴적인 돌진'의 영문 룰 텍스트에 나오는 동사 'Charge'가 어빌리티 '돌진'의
     * 영문 이름과 같아서 잘못 걸리는 경우를 실제로 확인함). 한국어 어빌리티 이름은 이런
     * 식으로 일반 단어와 우연히 겹칠 위험이 훨씬 낮다.
     */
    const name = other.name.ko || other.name.en
    if (name && new RegExp(escapeRegExp(name), 'i').test(text)) found.push({ id: other.id, name: other.name })
  }
  return found
}

/** ability를 이름으로 언급하는(강화하는) 같은 유닛의 다른 어빌리티들을 찾는다 (역방향) */
export function abilitiesReferencing(pool: Ability[], ability: Ability): AbilityReference[] {
  const found: AbilityReference[] = []
  for (const other of pool) {
    if (other.id === ability.id) continue
    if (abilityReferencesInText(pool, other).some((r) => r.id === ability.id)) {
      found.push({ id: other.id, name: other.name })
    }
  }
  return found
}
