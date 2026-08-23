import type { Ability } from '../../types'

/**
 * ability.enhances(같은 유닛 안에서 이 능력이 강화하는 대상들의 id)를 pool에서 실제 Ability로
 * 풀어낸다. enhances는 데이터에 직접 명시한다 — 예전에는 룰 텍스트에서 다른 어빌리티/무기 이름이
 * 그대로 언급되는지 정규식으로 스캔해서 자동으로 찾았지만, '모든 근접무기' 처럼 이름을 대지 않는
 * 관계(해병/불곰의 전투 자극제 등)를 놓치는 근본적인 한계가 있어 데이터에서 직접 명시하는 방식으로
 * 바꿨다. 어빌리티 텍스트는 앞으로 거의 바뀌지 않는 데이터라 한 번만 채워두면 된다.
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
 * 룰 어빌리티를 실제로 발동시키는 데 드는 자원 비용(CP/EN/BM 등). Passive는 발동 개념이 없어
 * 항상 undefined, Active/Reaction이면서 비용이 0보다 클 때만(가변 비용 'X' 포함) 값을 돌려준다.
 * 미네랄로 사는 업그레이드 비용(RelatedAbilityTarget.cost)과는 다른 값이다.
 */
export function abilityResourceCost(ability: Ability, resourceLabel: string): string | undefined {
  if (ability.kind !== 'rule' || ability.type === 'Passive' || ability.cost === 0) return undefined
  return `${ability.cost} ${resourceLabel}`
}
