import { PHASES, type Ability, type Phase, type Roster, type Rule, type SquadScaledCost, type UnitType, type WeaponProfile } from '../../types'
import { isFavoriteAbility } from '../rosterCalc'
import { PhaseBadge } from '../../components/card/PhaseBadge'

/**
 * 상세 모달에서 업그레이드 켜기/끄기 버튼을 그리는 데 필요한, 이 업그레이드를 가리키는 안정적인
 * 식별 정보. active/cost처럼 바뀔 수 있는 값을 미리 계산해서 얼려두지 않는 이유는, 모달이 떠 있는
 * 동안 다른 곳(칩, 상세 패널)에서 이 업그레이드를 껐다 켜도 모달이 그 변화를 실시간으로 반영해야
 * 하기 때문이다 — 그래서 상세 모달이 매 렌더 roster에서 현재 상태를 직접 읽는다.
 */
export interface UpgradeToggleRef {
  entryId: string
  upgradeIndex: number
  /** 유닛 카탈로그에 고정된 값이라 얼려도 안전하다 (등급별 실제 비용은 모달이 entry.squadTierIndex로 계산) */
  pts: SquadScaledCost
  /** 이 업그레이드를 켤 때 함께 꺼야 하는 다른 업그레이드 인덱스들 (같은 무기를 대체하는 상호 배타 업그레이드) */
  exclusiveWith: number[]
}

/**
 * 어빌리티(룰/무기 프로필) 하나를 단독 모달로 띄울 때 필요한 정보. 게임 레퍼런스와 로스터 편집
 * 화면의 어빌리티 칩, 그리고 다른 유닛/카드에서 즐겨찾기한 능력을 눌렀을 때 모두 이 형태를 공유한다.
 */
export interface AbilityDetailRef {
  kind: 'ability'
  ability: Ability
  sourceLabel: string
  sourceId: string
  /** 유닛에서 나온 능력일 때만 지정된다 (UNIT/TACTICAL 배지, 배지 색 결정용) */
  unitType?: UnitType
  /** 이 능력이 업그레이드로 나온 것이라면, 대체(FOR)하는 원본 능력의 로컬라이즈된 이름 */
  forLabel?: string
  /** 이 능력이 유닛의 업그레이드일 때만 지정(로스터 편집 화면 전용): 상세 모달 타이틀의 PTS 토글 버튼에 쓰인다 */
  upgradeToggle?: UpgradeToggleRef
  /**
   * 유닛에서 나온 능력일 때, 그 유닛의 로스터 항목 id. 이 능력의 룰 텍스트가 언급하는 다른 무기로
   * 이동할 때(연관 어빌리티 '강화:' 목록) 종합 무기 모달을 열려면 필요하다. 다른 유닛/카드에서
   * 즐겨찾기한 능력을 볼 때처럼 특정 로스터 항목을 확정할 수 없는 경우 비워둔다.
   */
  entryId?: string
}

/** 무기 하나가 이 유닛에서 지금 어떤 상태인지 */
export type WeaponTone = 'base' | 'active' | 'inactive'

export interface WeaponSummaryEntry {
  ability: WeaponProfile
  tone: WeaponTone
  /** 업그레이드로 나온 무기라면, 대체(FOR)하는 원본 무기의 로컬라이즈된 이름 */
  forLabel?: string
  /** 업그레이드로 나온 무기일 때만 지정: 상세 모달에서 켜기/끄기 버튼에 쓰인다 */
  upgradeToggle?: UpgradeToggleRef
}

/**
 * '사격'/'근접 공격' 종합 칩 하나를 만드는 데 필요한 입력. 호출자가 abilities에서 이 phase의 무기
 * 프로필을 미리 걸러내야 한다 — 그래야 이 칩과 중복되지 않는다.
 */
export interface WeaponSummaryInput {
  /** 이 유닛 로스터 항목의 id. 모달이 이걸로 entries를 다시 계산하는 데 쓴다 */
  entryId: string
  phase: Phase
  /** 칩 이름 앞에 붙는 라벨 (예: '사격', '근접 공격') */
  label: Rule
  entries: WeaponSummaryEntry[]
}

/**
 * 무기 종합 칩을 눌렀을 때 뜨는 상세 정보. 이 유닛이 가진 해당 페이즈 무기 프로필을 한 번에
 * 보여준다 — 개별 무기 칩 대신 이 칩 하나로 묶어서 표시할 때 쓴다.
 *
 * entries를 여기 얼려두지 않고 entryId/phase만 담는 이유는, 모달이 떠 있는 동안 그 안에서(또는
 * 다른 곳에서) 이 유닛의 업그레이드 상태가 바뀌면 — 특히 FOR 대상 무기가 봉인/해제될 때 —
 * 그 변화가 실시간으로 반영돼야 하기 때문이다. 모달이 매 렌더 roster에서 entries를 직접 다시 계산한다.
 */
export interface WeaponSummaryRef {
  kind: 'weapon-summary'
  sourceLabel: string
  sourceId: string
  unitType?: UnitType
  label: Rule
  entryId: string
  phase: Phase
}

export type AbilitySelectionRef = AbilityDetailRef | WeaponSummaryRef

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

/** 어빌리티/무기 프로필 칩 한 줄. 눌러진 칩은 즉시 그 능력만 담은 상세 모달을 띄운다(부모 카드/유닛의
 *  전체 상세를 여는 클릭과 겹치지 않도록 stopPropagation한다). 즐겨찾기된 룰 능력은 칩 배경색을
 *  달리해서 살짝 강조한다 */
export function AbilityChipsRow({
  abilities,
  weaponSummaries = [],
  hideInactiveWeaponNames = false,
  sourceId,
  sourceLabel,
  unitType,
  entryId,
  roster,
  onSelectAbility,
  localize,
  upgradeStateFor,
  costFor,
  forFor,
  upgradeToggleFor,
  showFavorite = false,
}: {
  abilities: Ability[]
  /** '사격'/'근접 공격'처럼 무기를 묶어 보여줄 종합 칩들. 비어 있는 항목은 알아서 무시된다 */
  weaponSummaries?: WeaponSummaryInput[]
  /** 종합 칩 이름에서 비활성(미선택) 무기 이름을 뺀다 — 게임 레퍼런스 화면 전용 */
  hideInactiveWeaponNames?: boolean
  sourceId: string
  sourceLabel: string
  unitType?: UnitType
  /** 유닛에서 나온 칩일 때만 지정: 상세 모달에 담아 연관 어빌리티 '강화:' 목록의 무기 이동에 쓴다 */
  entryId?: string
  roster: Roster
  onSelectAbility: (ref: AbilitySelectionRef) => void
  localize: (rule: Rule) => string
  /**
   * 업그레이드에서 나온 능력의 활성/비활성 상태를 알려준다(로스터 편집 화면 전용). 기본 능력이거나
   * 지정하지 않으면 항상 기본(파란) 톤으로 보여준다.
   */
  upgradeStateFor?: (ability: Ability) => 'active' | 'inactive' | undefined
  /** 업그레이드에서 나온 능력의 비용을 알려준다(로스터 편집 화면 전용). 지정하면 칩 우측에 '(20)' 형태로 붙는다 */
  costFor?: (ability: Ability) => number | undefined
  /** 업그레이드에서 나온 능력이 대체(FOR)하는 원본 능력의 이름을 알려준다. 지정하면 상세 모달의 FOR 표기에 쓰인다 */
  forFor?: (ability: Ability) => string | undefined
  /** 업그레이드에서 나온 능력이 어떤 업그레이드인지 알려준다(로스터 편집 화면 전용). 지정하면 상세 모달 타이틀에 PTS 토글 버튼이 붙는다 */
  upgradeToggleFor?: (ability: Ability) => UpgradeToggleRef | undefined
  /** 즐겨찾기된 칩을 배경색으로 강조할지. 즐겨찾기는 게임 레퍼런스 화면 전용 기능이라 기본은 꺼져 있다 */
  showFavorite?: boolean
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
                onSelectAbility({
                  kind: 'weapon-summary',
                  sourceLabel,
                  sourceId,
                  unitType,
                  label: input.label,
                  entryId: input.entryId,
                  phase: input.phase,
                })
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
        const favorited = showFavorite && ability.kind === 'rule' && isFavoriteAbility(roster, sourceId, ability.id)
        /** 이 능력이 업그레이드로 나온 것인지, 나왔다면 지금 켜져 있는지 (undefined면 기본 능력) */
        const upgradeState = upgradeStateFor?.(ability)
        const cost = costFor?.(ability)
        return (
          <button
            type="button"
            className={`ability-chip ${upgradeState === 'inactive' ? 'ability-chip-dim' : ''} ${upgradeState === 'active' ? 'ability-chip-upgrade' : ''} ${favorited ? 'ability-chip-favorited' : ''}`}
            key={i}
            onClick={(e) => {
              e.stopPropagation()
              onSelectAbility({
                kind: 'ability',
                ability,
                sourceLabel,
                sourceId,
                unitType,
                forLabel: forFor?.(ability),
                upgradeToggle: upgradeToggleFor?.(ability),
                entryId,
              })
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
