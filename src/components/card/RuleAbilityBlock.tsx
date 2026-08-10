import type { RuleAbility, SquadScaledCost } from '../../types'
import { formatScaledCost } from './costDisplay'

// TODO: 종족별로 커맨드 포인트 명칭이 다를 수 있음 (현재는 테란 'COMMAND POINT'로 고정)
const RESOURCE_LABEL = 'COMMAND POINT'

function formatBadge(ability: RuleAbility): string {
  if (ability.type === 'Passive') return 'PASSIVE'
  const label = ability.type.toUpperCase()
  return ability.cost === 0 ? label : `${label} (${ability.cost} ${RESOURCE_LABEL})`
}

export function RuleAbilityBlock({
  ability,
  pts,
  forWeapon,
}: {
  ability: RuleAbility
  /** 업그레이드로 제공되는 능력일 때만 지정 (미네랄 비용 표시) */
  pts?: SquadScaledCost
  forWeapon?: string
}) {
  return (
    <div className="card-rule-ability">
      <div className="card-rule-ability-header">
        <div className="card-rule-ability-title">
          <span className="card-rule-ability-name">{ability.name}</span>
          {pts !== undefined && <span className="card-pts-badge">PTS: {formatScaledCost(pts)}</span>}
        </div>
        <span className={`card-badge card-badge-${ability.type.toLowerCase()}`}>{formatBadge(ability)}</span>
      </div>
      {forWeapon && <div className="card-weapon-for">FOR {forWeapon}</div>}
      <p className="card-rule-text">{ability.rule.ko || ability.rule.en}</p>
    </div>
  )
}
