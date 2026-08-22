import { PHASES, type Ability, type Roster, type Rule, type UnitType } from '../../types'
import { isFavoriteAbility } from '../rosterCalc'
import { PhaseBadge } from '../../components/card/PhaseBadge'

/**
 * 어빌리티(룰/무기 프로필) 하나를 단독 모달로 띄울 때 필요한 정보. 게임 레퍼런스와 로스터 편집
 * 화면의 어빌리티 칩, 그리고 다른 유닛/카드에서 즐겨찾기한 능력을 눌렀을 때 모두 이 형태를 공유한다.
 */
export interface AbilityDetailRef {
  ability: Ability
  sourceLabel: string
  sourceId: string
  /** 유닛에서 나온 능력일 때만 지정된다 (UNIT/TACTICAL 배지, 배지 색 결정용) */
  unitType?: UnitType
}

/** 어빌리티/무기 프로필 칩 한 줄. 눌러진 칩은 즉시 그 능력만 담은 상세 모달을 띄운다(부모 카드/유닛의
 *  전체 상세를 여는 클릭과 겹치지 않도록 stopPropagation한다). 즐겨찾기된 룰 능력은 이름 앞에 별표를 붙인다 */
export function AbilityChipsRow({
  abilities,
  sourceId,
  sourceLabel,
  unitType,
  roster,
  onSelectAbility,
  localize,
  upgradeStateFor,
}: {
  abilities: Ability[]
  sourceId: string
  sourceLabel: string
  unitType?: UnitType
  roster: Roster
  onSelectAbility: (ref: AbilityDetailRef) => void
  localize: (rule: Rule) => string
  /**
   * 업그레이드에서 나온 능력의 활성/비활성 상태를 알려준다(로스터 편집 화면 전용). 기본 능력이거나
   * 지정하지 않으면 항상 기본(파란) 톤으로 보여준다.
   */
  upgradeStateFor?: (ability: Ability) => 'active' | 'inactive' | undefined
}) {
  if (abilities.length === 0) return null
  /** ANY > MOVEMENT > ASSAULT > COMBAT 순으로 정렬한다 (원본 데이터 배열 순서는 뒤죽박죽이라 그대로 보여주면 읽기 어렵다) */
  const sorted = [...abilities].sort((a, b) => PHASES.indexOf(a.phase) - PHASES.indexOf(b.phase))
  return (
    <div className="ability-chips-row">
      {sorted.map((ability, i) => {
        const favorited = ability.kind === 'rule' && isFavoriteAbility(roster, sourceId, ability.id)
        const tone = upgradeStateFor?.(ability)
        return (
          <button
            type="button"
            className={`ability-chip ${tone === 'inactive' ? 'ability-chip-dim' : ''}`}
            key={i}
            onClick={(e) => {
              e.stopPropagation()
              onSelectAbility({ ability, sourceLabel, sourceId, unitType })
            }}
          >
            <PhaseBadge phase={ability.phase} tone={tone ?? 'default'} />
            {favorited && <span className="ability-chip-star">★</span>}
            {localize(ability.name)}
          </button>
        )
      })}
    </div>
  )
}
