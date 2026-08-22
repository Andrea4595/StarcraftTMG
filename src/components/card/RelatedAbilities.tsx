import type { Ability, RuleAbility, WeaponProfile } from '../../types'
import { localize, useLang } from '../../LangContext'
import { WeaponTable, type WeaponRow } from './WeaponTable'

export interface RelatedAbilityTarget {
  ability: Ability
  /** 지정하면 클릭해서 해당 능력/무기의 상세 모달로 이동한다. 없으면 정보만 보여주는 비활성 행이 된다 */
  onClick?: () => void
}

/**
 * 이름 직접 언급으로 감지된 연관 어빌리티/무기 목록. 무기 프로필은 스탯 한 줄(WeaponTable 재사용),
 * 룰 어빌리티는 '이름 : 룰 텍스트' 한 줄로 보여주고, 지정된 경우 눌러서 그 대상의 상세 모달로
 * 바로 이동할 수 있다.
 */
export function RelatedAbilities({ items }: { items: RelatedAbilityTarget[] }) {
  const { lang } = useLang()
  if (items.length === 0) return null

  const weapons = items.filter((i) => i.ability.kind === 'weapon') as { ability: WeaponProfile; onClick?: () => void }[]
  const rules = items.filter((i) => i.ability.kind === 'rule') as { ability: RuleAbility; onClick?: () => void }[]

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
            const inner = (
              <>
                <span className="card-related-ability-line-name">{name}</span>
                <span className="card-related-ability-line-sep"> : </span>
                <span className="card-related-ability-line-text" title={text}>
                  {text}
                </span>
              </>
            )
            return (
              <li key={i}>
                {r.onClick ? (
                  <button type="button" className="card-related-ability-line" onClick={r.onClick}>
                    {inner}
                  </button>
                ) : (
                  <div className="card-related-ability-line card-related-ability-line-static">{inner}</div>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
