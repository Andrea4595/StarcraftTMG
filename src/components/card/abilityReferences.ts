import type { Ability } from '../../types'

/**
 * ability.enhances(같은 유닛 안에서 이 능력이 강화하는 대상들의 id)를 pool에서 실제 Ability로
 * 풀어낸다. enhances는 데이터에 직접 명시한다 — 룰 텍스트를 스캔해 이름 언급을 찾는 방식은 '모든
 * 근접무기' 처럼 이름을 대지 않는 관계(해병/불곰의 전투 자극제 등)를 놓치기 때문이다.
 */
export function abilityEnhances(pool: Ability[], ability: Ability): Ability[] {
  if (ability.kind !== 'rule' || !ability.enhances) return []
  return ability.enhances.map((id) => pool.find((a) => a.id === id)).filter((a): a is Ability => a !== undefined)
}

/** ability를 강화한다고 명시한, 같은 유닛의 다른 어빌리티들을 찾는다 (역방향) */
export function abilityEnhancedBy(pool: Ability[], ability: Ability): Ability[] {
  return pool.filter((other) => other.kind === 'rule' && other.enhances?.includes(ability.id))
}

/**
 * seeds와 그 각각이 강화하거나(정방향) 그것을 강화하는(역방향) 능력을 pool 안에서 모두 모은다.
 * 한 단계만 따라간다 — 관계의 관계까지 펼치면 결국 유닛 능력 거의 전부가 딸려 나온다.
 */
export function abilitiesRelatedTo(pool: Ability[], seeds: Ability[]): Set<Ability> {
  const related = new Set<Ability>(seeds)
  for (const seed of seeds) {
    for (const a of abilityEnhances(pool, seed)) related.add(a)
    for (const a of abilityEnhancedBy(pool, seed)) related.add(a)
  }
  return related
}
