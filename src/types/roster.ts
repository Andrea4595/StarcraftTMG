/** 로스터에 포함된 유닛 스쿼드 한 장. 같은 유닛이라도 스쿼드별로 각자 별도 항목을 가진다 (Unique 유닛/카드는 예외적으로 로스터에 하나만) */
export interface RosterUnitEntry {
  id: string
  unitName: string
  /** UnitCard.squad 배열의 인덱스. 모델 수는 항상 해당 tier의 modelMax를 사용한다 */
  squadTierIndex: number
  /** UnitCard.upgrades 배열의 인덱스들. 여러 개 동시 선택 가능 */
  upgradeIndexes: number[]
}

export interface Roster {
  id: string
  name: string
  /** 로스터 생성 후 사용자가 선택하는 종족. 선택 전에는 null */
  raceId: string | null
  /** RaceData.factionCards 중 이 로스터가 선택한 팩션 카드 이름. 선택 전에는 null */
  factionCardName: string | null
  /** 이 로스터에 설정된 미네랄 예산 */
  mineralCap: number
  /** 팩션 카드 외에 추가로 포함시킨 택티컬 카드 이름들 (팩션 카드는 항상 포함되므로 별도 표기 안 함) */
  tacticalCardNames: string[]
  units: RosterUnitEntry[]
}
