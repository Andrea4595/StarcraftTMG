/** 로스터에 포함된 유닛 스쿼드 한 장. 같은 유닛이라도 스쿼드별로 각자 별도 항목을 가진다 (Unique 유닛/카드는 예외적으로 로스터에 하나만) */
export interface RosterUnitEntry {
  id: string
  unitId: string
  /** UnitCard.squad 배열의 인덱스. 모델 수는 항상 해당 tier의 modelMax를 사용한다 */
  squadTierIndex: number
  /** UnitCard.upgrades 배열의 인덱스들. 여러 개 동시 선택 가능 */
  upgradeIndexes: number[]
  /**
   * 이 유닛이 다른 택티컬 카드/유닛의 능력(summonsUnitId)으로 자동 소환된 것이면, 그 출처 카드/유닛의
   * id. 수동으로 추가한 유닛은 undefined. 값이 있으면 로스터 동기화 로직이 개수를 자동으로 맞추고,
   * 화면에서는 제거 버튼 대신 출처 태그를 보여준다.
   */
  summonedBy?: string
  /**
   * 게임 레퍼런스 화면에서 이 유닛을 맵에 스폰한 스쿼드 등급(UnitCard.squad 인덱스). 로스터에서 정한
   * squadTierIndex와 별개로, 실제 게임에서 깔린 등급을 기록해 서플라이 합계를 내는 데 쓴다. 스폰하지
   * 않았으면 필드 자체가 없다 (Firestore가 undefined 값을 거부하므로 값 대신 키를 지운다).
   */
  spawnedTierIndex?: number
  /** 게임 레퍼런스 화면에서 '사망' 처리한 유닛이면 true. 사망하면 스폰 기록은 지워진다 */
  dead?: boolean
}

export interface Roster {
  id: string
  name: string
  /** 로스터 생성 후 사용자가 선택하는 종족. 선택 전에는 null */
  raceId: string | null
  /** RaceData.factionCards 중 이 로스터가 선택한 팩션 카드의 id. 선택 전에는 null */
  factionCardId: string | null
  /** 이 로스터에 설정된 미네랄 예산 */
  mineralCap: number
  /** 팩션 카드 외에 추가로 포함시킨 택티컬 카드 id들 (팩션 카드는 항상 포함되므로 별도 표기 안 함) */
  tacticalCardIds: string[]
  units: RosterUnitEntry[]
  /**
   * 게임 레퍼런스 화면에서 '소모' 처리한 팩션/택티컬 카드들의 키(consumedCardKey). 같은 택티컬 카드를
   * 여러 장 채용했으면 장마다 따로 소모 처리할 수 있도록, 카드 id에 몇 번째 장인지까지 붙여 식별한다.
   * Firestore에 이 필드가 생기기 전에 저장된 로스터는 값이 없을 수 있어 optional이다.
   */
  consumedCardKeys?: string[]
  /**
   * 마지막으로 내용이 바뀐 시각(ms). 여러 기기에서 같은 로스터를 고쳤을 때 로그인 시점에 어느 쪽이
   * 더 최신인지 가르는 데 쓴다. 이 필드가 생기기 전에 저장된 로스터에는 없다.
   */
  updatedAt?: number
}
