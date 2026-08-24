export const PHASES = ['Any', 'Movement', 'Assault', 'Combat'] as const
export type Phase = (typeof PHASES)[number]

export const UNIT_TYPES = ['Hero', 'Core', 'Elite', 'Support', 'Other'] as const
export type UnitType = (typeof UNIT_TYPES)[number]

export const ABILITY_TYPES = ['Passive', 'Active', 'Reaction'] as const
export type AbilityType = (typeof ABILITY_TYPES)[number]

export const TARGET_TYPES = ['All', 'Ground', 'Flying'] as const
export type TargetType = (typeof TARGET_TYPES)[number]

export const SURGE_TYPES = ['Light', 'Armoured'] as const
export type SurgeType = (typeof SURGE_TYPES)[number]

/** 원문/번역문 쌍 */
export interface Rule {
  en: string
  ko: string
}

/**
 * 'ANTI-EVADE (2)', 'BURST FIRE 8" (3)' 처럼 이름 뒤에 붙는 괄호/단위 표기.
 * 키워드 규칙 설명 기능에서 name으로 레퍼런싱하기 위해 name과 분리해서 저장.
 */
export interface Keyword {
  name: string
  suffix?: string
}

interface AbilityBase {
  /** 안정적인 영문 식별자. 기존 영문 name 문자열과 동일한 값 (sealed weapon 판정, 즐겨찾기 등에 쓰임) */
  id: string
  name: Rule
  phase: Phase
}

export interface RuleAbility extends AbilityBase {
  kind: 'rule'
  rule: Rule
  type: AbilityType
  /** Command Point 비용 (명칭은 종족에 따라 달라짐). 'X'는 사용 시점에 가변적으로 지불하는 비용 */
  cost: number | 'X'
  /**
   * 이 능력이 강화하는, 같은 유닛의 다른 어빌리티/무기 id들. 카드 상세의 '강화:' 정방향 목록과,
   * 그 대상 쪽의 역방향 목록을 이 필드 하나로 만든다 — 텍스트를 기계적으로 스캔해 자동으로
   * 찾아내지 않는 이유는, 이름을 그대로 언급하지 않는 관계(예: 해병/불곰의 전투 자극제가 이름을
   * 대지 않고 '모든 근접무기'라고만 말하며 근접무기를 강화하는 경우)를 놓치기 때문. 어빌리티
   * 텍스트는 앞으로 거의 바뀌지 않을 데이터라, 처음 한 번만 채워두면 유지보수 부담이 크지 않다.
   */
  enhances?: string[]
  /** 이 능력이 전장에 배치하는 토큰의 id (data/tokens.ts의 TokenEntry.id 참조). 시뮬레이터 연동 데이터의 tokens 목록을 만드는 데 쓰인다 */
  placesTokenId?: string
}

export interface WeaponProfile extends AbilityBase {
  kind: 'weapon'
  stat: {
    /** 사거리. 'E'는 근접(Engagement Range) 무기를 뜻함 */
    rng: number | 'E'
    tgt: TargetType
    /** 주사위 굴리는 개수 */
    roa: number
    /** 명중, '0+' 양식 */
    hit: string
    /** 다중 선택 가능 */
    surge: SurgeType[]
    /** D3, D6, D3+1 같은 형식 */
    sDie: string
    dmg: number
    keyword: Keyword[]
  }
}

export type Ability = RuleAbility | WeaponProfile

/**
 * 미네랄 비용. 스쿼드 크기와 무관하게 고정이면 number.
 * 스쿼드 tier(UnitCard.squad)에 따라 값이 달라지면, squad와 같은 길이/순서의 배열로 대응.
 * 예: squad가 [1-3, 4-6, 7-9] 3 tier면 pts도 [소, 소, 대] 형태로 3개.
 */
export type SquadScaledCost = number | number[]

export interface Upgrade {
  ability: Ability
  pts: SquadScaledCost
  /** 이 업그레이드가 대체/강화하는 기본 무기·능력의 id. 없으면 undefined ('FOR -') */
  forId?: string
}

interface CardBase {
  /**
   * 안정적인 영문 식별자. 원래 name이 하던 역할(로스터 저장 데이터, 즐겨찾기, 팩션/택티컬 카드
   * 선택 상태 등에서의 식별키)을 그대로 이어받는다 — 기존 영문 name 문자열과 동일한 값을 쓴다.
   */
  id: string
  name: Rule
  /** 유니크일 경우 로스터에 하나만 포함시킬 수 있다. */
  isUnique: boolean
  /** 프로젝트 내 이미지 경로. 텍스트 기반 렌더링에서는 사용하지 않을 수 있음 */
  thumb?: string
}

/**
 * 미니어처의 물리 베이스 크기(mm). 사용자에게 노출하는 정보가 아니라, 다른 앱과의
 * 데이터 연동을 위해 보관한다. 원형(diameterMm 하나) / 타원형(widthMm x lengthMm)
 * 둘 다 표현 가능하도록 shape로 판별한다.
 */
export type BaseSize =
  | { shape: 'circle'; diameterMm: number }
  | { shape: 'oval'; widthMm: number; lengthMm: number }

export interface Squad {
  /** Min과 Max 사이의 유닛 수는 이 스쿼드에 해당한다. */
  modelMin: number
  modelMax: number
  /** 이 스쿼드가 소모하는 보급 */
  supply: number
  /** 로스터에 포함시키는데 들어가는 미네랄 비용 */
  pts: number
}

export interface UnitCard extends CardBase {
  category: 'unit'
  type: UnitType
  stat: {
    /** null이면 이 스탯 자체가 없는 유닛(예: 쉴드 없음) */
    shld: number | null
    /** null이면 이동 불가 유닛(예: 고정 배치된 드론) */
    spd: {
      /** 리더 모델이 이동하는 거리 */
      move: number
      /** 코헤런시 거리. 기본값은 규칙상 3이며, 능력으로 변경될 수 있다 */
      cohesion: number
    } | null
    /** 회피, '0+' 양식 */
    eva: string
    /** 방어력, '0+' 양식 */
    arm: string
    hp: number
    siz: number | null
  }
  /** 무기 KEYWORD와 별개인 유닛 자체의 태그 (예: Biological, Light, Ground) */
  tags: Keyword[]
  /** 이 유닛(모델) 자체가 DISPLACEMENT 키워드를 지니는지. 유닛이 배치하는 토큰의 변위 여부와는 별개 */
  hasDisplacement?: boolean
  baseSize: BaseSize
  squad: Squad[]
  abilities: Ability[]
  upgrades: Upgrade[]
}

export interface Slot {
  unitType: UnitType
  count: number
}

export interface TacticalCard extends CardBase {
  category: 'tactical'
  /** 로스터에 포함시키는데 필요한 가스 비용. 팩션 카드처럼 비용이 없으면 undefined */
  gasPts?: number
  /** 라운드 진행 도중 이 카드를 소모시켜 얻는 Command Point */
  resource: number
  slot: Slot[]
  cardAbilities: RuleAbility[]
}

export type Card = UnitCard | TacticalCard
