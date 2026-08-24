const UNIT_FIELDS: { field: string; desc: string }[] = [
  { field: 'name', desc: '유닛 이름 (한글/영문)' },
  { field: 'unit_type', desc: '유닛 슬롯 분류 (Hero/Core/Elite/Support/Other)' },
  { field: 'model_count', desc: '이 로스터에 포함된 모델 수' },
  { field: 'base_mm', desc: '미니어처 베이스의 실제 물리 크기 (가로/세로, mm)' },
  { field: 'stat', desc: '쉴드/이동력·코헤런시/회피/방어력/체력/사이즈 등 전체 스탯. 해당 스탯이 없는 유닛은 null' },
  { field: 'tags', desc: '유닛 분류 태그 (생체/경장갑/지상 등, 한글/영문)' },
  { field: 'is_displacement', desc: '유닛 자체가 변위(DISPLACEMENT) 키워드를 지니는지' },
  { field: 'ranges', desc: '거리(inch)와 상시 표시 여부(always_show)로 이루어진 범위 표시기 가이드라인 목록' },
  { field: 'abilities', desc: '보유한 룰/무기 능력 전체 목록. 이름, 설명, 무기 스탯, 업그레이드로 얻었는지(is_upgrade)를 포함' },
  { field: 'squad', desc: '로스터에서 선택한 스쿼드 등급 정보 — model_min/model_max(모델 수 범위), supply(서플라이), pts(미네랄 비용)' },
]

const TOKEN_FIELDS: { field: string; desc: string }[] = [
  { field: 'name', desc: '토큰 이름 (한글/영문) — 역장, 점막 종양, 그림자 등' },
  { field: 'base_mm', desc: '토큰의 실제 물리 베이스 크기 (mm)' },
  { field: 'is_displacement', desc: '이 토큰이 변위(DISPLACEMENT) 키워드를 지니는지' },
  { field: 'ranges', desc: '거리(inch)와 상시 표시 여부(always_show)로 이루어진 범위 표시기 가이드라인 목록' },
]

const TACTICAL_CARD_FIELDS: { field: string; desc: string }[] = [
  { field: 'name', desc: '카드 이름 (한글/영문)' },
  { field: 'is_faction_card', desc: '로스터에 항상 하나 포함되는 팩션 카드인지, 별도로 선택한 택티컬 카드인지' },
  { field: 'count', desc: '이 로스터에 같은 카드가 몇 장 포함됐는지' },
  { field: 'gas_cost', desc: '이 카드를 로스터에 포함시키는 데 든 가스 비용. 팩션 카드처럼 비용이 없으면 null' },
  { field: 'resource', desc: '이 카드가 소모될 때 얻는 종족 자원의 양. 단위는 최상위 resource_label 참고' },
  { field: 'slots', desc: '이 카드가 제공하는 유닛 슬롯 (unit_type별 count)' },
  { field: 'abilities', desc: '이 카드가 지닌 능력 전체 목록' },
]

export function SimulatorExportGuide() {
  return (
    <div className="export-guide">
      <p className="export-guide-notice">
        "시뮬레이터 연동 데이터"는 이 로스터에 포함된 유닛/토큰 정보를 JSON 파일 하나로 내보내는 기능입니다. 미니어처
        배치 시뮬레이터, 거리 측정 보조 도구, 개인 참고용 뷰어 등을 직접 만드신다면 이 파일을 읽어 아래 정보를 그대로
        활용하실 수 있습니다.
      </p>

      <h3 className="export-guide-section-title">최상위 구조</h3>
      <p className="export-guide-text">
        <code>roster_name</code>(로스터 이름), <code>resource_label</code>(이 종족의 카드 자원 명칭 — 테란 CP, 저그
        BM, 프로토스 EN 등), <code>units</code>(유닛 목록), <code>tokens</code>(유닛/카드가 전장에 배치하는 토큰
        목록), <code>tactical_cards</code>(팩션 카드와 선택한 택티컬 카드 목록) 다섯 부분으로 이루어져 있습니다.
      </p>

      <h3 className="export-guide-section-title">유닛 (units)</h3>
      <dl className="export-guide-list">
        {UNIT_FIELDS.map((f) => (
          <div className="export-guide-item" key={f.field}>
            <dt>{f.field}</dt>
            <dd>{f.desc}</dd>
          </div>
        ))}
      </dl>

      <h3 className="export-guide-section-title">토큰 (tokens)</h3>
      <dl className="export-guide-list">
        {TOKEN_FIELDS.map((f) => (
          <div className="export-guide-item" key={f.field}>
            <dt>{f.field}</dt>
            <dd>{f.desc}</dd>
          </div>
        ))}
      </dl>

      <h3 className="export-guide-section-title">택티컬/팩션 카드 (tactical_cards)</h3>
      <dl className="export-guide-list">
        {TACTICAL_CARD_FIELDS.map((f) => (
          <div className="export-guide-item" key={f.field}>
            <dt>{f.field}</dt>
            <dd>{f.desc}</dd>
          </div>
        ))}
      </dl>

      <h3 className="export-guide-section-title">활용 예시</h3>
      <ul className="export-guide-bullets">
        <li>base_mm으로 각 유닛/토큰 모델을 실제 크기 그대로 배치하는 시뮬레이터 제작</li>
        <li>stat.spd와 ranges 정보로 이동/코헤런시/능력 사거리를 자동으로 표시</li>
        <li>is_displacement로 변위 규칙이 적용되는 대상을 자동 판별</li>
        <li>abilities의 설명 텍스트를 그대로 활용한 개인용 참고 카드/뷰어 제작</li>
        <li>tactical_cards의 resource/slots로 라운드별 자원·유닛 슬롯 현황을 함께 추적</li>
      </ul>

      <p className="export-guide-caution">이 스키마는 앞으로 필드가 추가되거나 구조가 바뀔 수 있습니다.</p>
    </div>
  )
}
