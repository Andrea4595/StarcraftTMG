import type { Ability, RuleAbility, WeaponProfile } from '../../types'
import { localize, useLang } from '../../LangContext'
import { WeaponTable, type WeaponRow } from './WeaponTable'

export interface RelatedAbilityTarget {
  ability: Ability
  /** 지정하면 클릭해서 해당 능력/무기의 상세 모달로 이동한다. 없으면 정보만 보여주는 비활성 행이 된다 */
  onClick?: () => void
  /** 지금 이 대상이 활성 상태인지 (기본 능력처럼 켜고 끄는 개념이 없으면 항상 true) */
  active?: boolean
  /** 업그레이드로 얻는 능력일 때만 지정: 이름 옆에 '(20)' 형태로 붙는다 */
  cost?: string
}

/**
 * 이름 직접 언급으로 감지된 연관 어빌리티/무기 목록. 무기 프로필은 스탯 한 줄(WeaponTable 재사용),
 * 룰 어빌리티는 '이름 (비용) : 룰 텍스트' 한 줄로 보여주고, 지정된 경우 눌러서 그 대상의 상세
 * 모달로 바로 이동할 수 있다. 룰 어빌리티 줄은 지금 활성 상태면 흰 글씨, 아니면 어둡게 보여준다 —
 * 어빌리티 상세 모달을 눌러가며 이동할 때 지금 보는 대상이 실제로 켜져 있는지 한눈에 알 수 있게.
 */
export function RelatedAbilities({ items }: { items: RelatedAbilityTarget[] }) {
  const { lang } = useLang()
  if (items.length === 0) return null

  const weapons = items.filter((i) => i.ability.kind === 'weapon') as {
    ability: WeaponProfile
    onClick?: () => void
  }[]
  const rules = items.filter((i) => i.ability.kind === 'rule') as {
    ability: RuleAbility
    onClick?: () => void
    active?: boolean
    cost?: string
  }[]

  return (
    <div className="card-related-abilities">
      <div className="card-related-abilities-label">강화:</div>
      {weapons.length > 0 && (
        <WeaponTable
          rows={weapons.map((w): WeaponRow => ({ weapon: w.ability, onClick: w.onClick, compact: true }))}
        />
      )}
      {rules.length > 0 && (
        <ul className="card-related-ability-lines">
          {rules.map((r, i) => {
            const name = localize(r.ability.name, lang)
            const text = lang === 'en' ? r.ability.rule.en : r.ability.rule.ko || r.ability.rule.en
            const active = r.active ?? true
            const inner = (
              <>
                <span className="card-related-ability-line-name">
                  {name}
                  {r.cost !== undefined && ` (${r.cost})`}
                </span>
                <span className="card-related-ability-line-sep"> : </span>
                <span className="card-related-ability-line-text" title={text}>
                  {text}
                </span>
              </>
            )
            return (
              <li key={i}>
                {r.onClick ? (
                  <button
                    type="button"
                    className={`card-related-ability-line ${active ? 'card-related-ability-line-active' : ''}`}
                    onClick={r.onClick}
                  >
                    {inner}
                  </button>
                ) : (
                  <div
                    className={`card-related-ability-line card-related-ability-line-static ${active ? 'card-related-ability-line-active' : ''}`}
                  >
                    {inner}
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
