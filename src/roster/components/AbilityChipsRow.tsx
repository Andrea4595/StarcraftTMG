import { PHASES, type Ability, type Phase, type Rule, type WeaponProfile } from '../../types'
import { PhaseBadge } from '../../components/card/PhaseBadge'

/** 무기 하나가 이 유닛에서 지금 어떤 상태인지 */
export type WeaponTone = 'base' | 'active' | 'inactive'

export interface WeaponSummaryEntry {
  ability: WeaponProfile
  tone: WeaponTone
}

/**
 * '사격'/'근접 공격' 종합 칩 하나를 만드는 데 필요한 입력. 호출자가 abilities에서 이 phase의 무기
 * 프로필을 미리 걸러내야 한다 — 그래야 이 칩과 중복되지 않는다.
 */
export interface WeaponSummaryInput {
  phase: Phase
  /** 칩 이름 앞에 붙는 라벨 (예: '사격', '근접 공격') */
  label: Rule
  entries: WeaponSummaryEntry[]
}

type ChipItem =
  | { phaseIndex: number; kind: 'ability'; ability: Ability }
  | { phaseIndex: number; kind: 'weapon-summary'; input: WeaponSummaryInput }

/** 어빌리티 칩 아이콘 색을 어빌리티 타입(액티브/패시브/리액션)에 맞춰 고른다. 무기 프로필은 타입
 *  개념이 없어 기본(파란) 톤을 그대로 쓴다 */
function abilityTypeTone(ability: Ability): 'default' | 'active' | 'passive' | 'reaction' {
  if (ability.kind !== 'rule') return 'default'
  switch (ability.type) {
    case 'Active':
      return 'active'
    case 'Passive':
      return 'passive'
    case 'Reaction':
      return 'reaction'
  }
}

/** 어빌리티/무기 프로필 칩 한 줄. 어느 칩을 누르든 그 카드/유닛의 능력 전체를 보여주는 모달을 띄운다
 *  (onOpen). 부모 카드/유닛 행의 클릭과 겹치지 않도록 stopPropagation한다 */
export function AbilityChipsRow({
  abilities,
  weaponSummaries = [],
  hideInactiveWeaponNames = false,
  onOpen,
  localize,
  upgradeStateFor,
  costFor,
}: {
  abilities: Ability[]
  /** '사격'/'근접 공격'처럼 무기를 묶어 보여줄 종합 칩들. 비어 있는 항목은 알아서 무시된다 */
  weaponSummaries?: WeaponSummaryInput[]
  /** 종합 칩 이름에서 비활성(미선택) 무기 이름을 뺀다 — 게임 레퍼런스 화면 전용 */
  hideInactiveWeaponNames?: boolean
  /** 칩을 누르면 호출된다. 이 칩들이 속한 카드/유닛의 능력 전체 모달을 여는 데 쓴다 */
  onOpen: () => void
  localize: (rule: Rule) => string
  /**
   * 업그레이드에서 나온 능력의 활성/비활성 상태를 알려준다(로스터 편집 화면 전용). 기본 능력이거나
   * 지정하지 않으면 항상 기본(파란) 톤으로 보여준다.
   */
  upgradeStateFor?: (ability: Ability) => 'active' | 'inactive' | undefined
  /** 업그레이드에서 나온 능력의 비용을 알려준다(로스터 편집 화면 전용). 지정하면 칩 우측에 '(20)' 형태로 붙는다 */
  costFor?: (ability: Ability) => number | undefined
}) {
  const summaries = weaponSummaries.filter((s) => s.entries.length > 0)
  if (abilities.length === 0 && summaries.length === 0) return null

  /** ANY > MOVEMENT > ASSAULT > COMBAT 순으로 정렬한다 (원본 데이터 배열 순서는 뒤죽박죽이라 그대로 보여주면 읽기 어렵다).
   *  무기 종합 칩은 각자의 phase 자리에 끼워 넣는다 */
  const items: ChipItem[] = [
    ...abilities.map((ability): ChipItem => ({ phaseIndex: PHASES.indexOf(ability.phase), kind: 'ability', ability })),
    ...summaries.map((input): ChipItem => ({ phaseIndex: PHASES.indexOf(input.phase), kind: 'weapon-summary', input })),
  ].sort((a, b) => a.phaseIndex - b.phaseIndex)

  return (
    <div className="ability-chips-row">
      {items.map((item, i) => {
        if (item.kind === 'weapon-summary') {
          const { input } = item
          const displayEntries = hideInactiveWeaponNames ? input.entries.filter((e) => e.tone !== 'inactive') : input.entries
          return (
            <button
              type="button"
              className="ability-chip"
              key={i}
              onClick={(e) => {
                e.stopPropagation()
                onOpen()
              }}
            >
              <PhaseBadge phase={input.phase} tone="default" />
              {localize(input.label)}
              {displayEntries.length > 0 && (
                <>
                  {' '}
                  |{' '}
                  {displayEntries.map((entry, j) => (
                    <span className={`ability-chip-weapon-name ability-chip-weapon-name-${entry.tone}`} key={j}>
                      {localize(entry.ability.name)}
                      {j < displayEntries.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </>
              )}
            </button>
          )
        }

        const { ability } = item
        /** 이 능력이 업그레이드로 나온 것인지, 나왔다면 지금 켜져 있는지 (undefined면 기본 능력) */
        const upgradeState = upgradeStateFor?.(ability)
        const cost = costFor?.(ability)
        return (
          <button
            type="button"
            className={`ability-chip ${upgradeState === 'inactive' ? 'ability-chip-dim' : ''} ${upgradeState === 'active' ? 'ability-chip-upgrade' : ''}`}
            key={i}
            onClick={(e) => {
              e.stopPropagation()
              onOpen()
            }}
          >
            <PhaseBadge phase={ability.phase} tone={abilityTypeTone(ability)} />
            {localize(ability.name)}
            {cost !== undefined && ` (${cost})`}
          </button>
        )
      })}
    </div>
  )
}
