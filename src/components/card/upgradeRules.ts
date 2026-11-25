import type { Rule, Upgrade } from '../../types'

/** SPECIALIST 키워드가 붙은 무기 업그레이드인지 (유닛의 모델 하나만 드는 무기) */
function isSpecialistUpgrade(upgrade: Upgrade): boolean {
  return upgrade.ability.kind === 'weapon' && upgrade.ability.stat.keyword.some((k) => k.name === 'SPECIALIST')
}

/**
 * 유닛 전체가 아니라 일부 모델만 쓰는 무기 업그레이드인지. SPECIALIST(모델 하나)와 perModel(원하는 모델
 * 수만큼)이 여기에 해당한다. 이런 업그레이드는 나머지 모델이 여전히 원래 무기를 쓰므로 원본을 봉인하지
 * 않고, 같은 대상 무기를 노리는 다른 '부분' 업그레이드와도 함께 켤 수 있다.
 */
export function isPartialWeaponUpgrade(upgrade: Upgrade): boolean {
  return upgrade.ability.kind === 'weapon' && (isSpecialistUpgrade(upgrade) || upgrade.perModel === true)
}

/** 켜면 forId의 원래 무기를 유닛 전체에서 끄는(봉인하는) 업그레이드인지 */
export function upgradeSealsBaseWeapon(upgrade: Upgrade): boolean {
  return upgrade.forId !== undefined && upgrade.ability.kind === 'weapon' && !isPartialWeaponUpgrade(upgrade)
}

const PER_MODEL_SCOPE: Rule = { en: 'any models', ko: '원하는 모델만' }

/** FOR 표기 뒤에 '원하는 모델만'을 덧붙인다 (perModel 업그레이드일 때만) */
export function forLabelWithScope(forName: string, upgrade: Upgrade, localize: (rule: Rule) => string): string {
  return upgrade.perModel ? `${forName} (${localize(PER_MODEL_SCOPE)})` : forName
}
