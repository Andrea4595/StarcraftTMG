import type { RuleAbility } from '../../types'

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
}: {
  ability: RuleAbility
  /** 이 종족의 자원 전체 명칭 (예: 'Command Point', 'Biomass') */
  resourceLabel: string
  /** 업그레이드로 제공되는 능력일 때만 지정 (미네랄 비용 표시) */
  ptsLabel?: string
  forWeapon?: string
  /** 지정하면 PTS 배지가 이 업그레이드를 켜고 끄는 버튼이 된다 */
  interactive?: { active: boolean; onToggle: () => void }
}) {
  return (
    <div className={`card-rule-ability ${interactive && !interactive.active ? 'card-rule-ability-dim' : ''}`}>
      <div className="card-rule-ability-header">
        <div className="card-rule-ability-title">
          <span className="card-rule-ability-name">{ability.name}</span>
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
      <p className="card-rule-text">{ability.rule.ko || ability.rule.en}</p>
    </div>
  )
}
