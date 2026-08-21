import type { RuleAbility } from '../../types'
import { localize, useLang } from '../../LangContext'

function formatBadge(ability: RuleAbility, resourceLabel: string): string {
  if (ability.type === 'Passive') return 'PASSIVE'
  const label = ability.type.toUpperCase()
  return ability.cost === 0 ? label : `${label} (${ability.cost} ${resourceLabel.toUpperCase()})`
}

export function RuleAbilityBlock({
  ability,
  resourceLabel,
  ptsLabel,
  forWeapon,
  interactive,
  favorite,
}: {
  ability: RuleAbility
  /** 이 종족의 자원 약어 (예: 'CP', 'BM', 'EN') */
  resourceLabel: string
  /** 업그레이드로 제공되는 능력일 때만 지정 (미네랄 비용 표시) */
  ptsLabel?: string
  forWeapon?: string
  /** 지정하면 PTS 배지가 이 업그레이드를 켜고 끄는 버튼이 된다 */
  interactive?: { active: boolean; onToggle: () => void }
  /** 지정하면 이름 왼쪽에 즐겨찾기 별 토글 버튼을 붙인다 (게임 레퍼런스 화면 전용 기능) */
  favorite?: { active: boolean; onToggle: () => void }
}) {
  const { lang } = useLang()
  const text = lang === 'en' ? ability.rule.en : ability.rule.ko || ability.rule.en
  const name = localize(ability.name, lang)

  return (
    <div className={`card-rule-ability ${interactive && !interactive.active ? 'card-rule-ability-dim' : ''}`}>
      <div className="card-rule-ability-header">
        <div className="card-rule-ability-title">
          {favorite && (
            <button
              type="button"
              className={`card-favorite-star ${favorite.active ? 'card-favorite-star-active' : ''}`}
              onClick={favorite.onToggle}
              aria-label={favorite.active ? `${name} 즐겨찾기 해제` : `${name} 즐겨찾기 추가`}
            >
              {favorite.active ? '★' : '☆'}
            </button>
          )}
          <span className="card-rule-ability-name">{name}</span>
        </div>
        <div className="card-rule-ability-right">
          {ptsLabel !== undefined &&
            (interactive ? (
              <button
                type="button"
                className={`card-pts-badge card-pts-toggle ${interactive.active ? 'card-pts-toggle-active' : ''}`}
                onClick={interactive.onToggle}
              >
                PTS: {ptsLabel}
              </button>
            ) : (
              <span className="card-pts-badge">PTS: {ptsLabel}</span>
            ))}
          <span className={`card-badge card-badge-${ability.type.toLowerCase()}`}>
            {formatBadge(ability, resourceLabel)}
          </span>
        </div>
      </div>
      {forWeapon && <div className="card-weapon-for">FOR {forWeapon}</div>}
      <p className="card-rule-text">{text}</p>
    </div>
  )
}
