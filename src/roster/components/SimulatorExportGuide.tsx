const UNIT_FIELDS: { field: string; desc: string }[] = [
  { field: 'name', desc: '유닛 이름 (한글/영문)' },
  { field: 'model_count', desc: '이 로스터에 포함된 모델 수' },
  { field: 'base_mm', desc: '미니어처 베이스의 실제 물리 크기 (가로/세로, mm)' },
  { field: 'stat', desc: '쉴드/이동력·코헤런시/회피/방어력/체력/사이즈 등 전체 스탯. 해당 스탯이 없는 유닛은 null' },
  { field: 'tags', desc: '유닛 분류 태그 (생체/경장갑/지상 등, 한글/영문)' },
  { field: 'is_displacement', desc: '유닛 자체가 변위(DISPLACEMENT) 키워드를 지니는지' },
  { field: 'ranges', desc: '거리(inch)와 상시 표시 여부(always_show)로 이루어진 범위 표시기 가이드라인 목록' },
  { field: 'abilities', desc: '보유한 룰/무기 능력 전체 목록. 이름, 설명, 무기 스탯, 업그레이드로 얻었는지(is_upgrade)를 포함' },
]

const TOKEN_FIELDS: { field: string; desc: string }[] = [
  { field: 'name', desc: '토큰 이름 (한글/영문) — 역장, 점막 종양, 그림자 등' },
  { field: 'base_mm', desc: '토큰의 실제 물리 베이스 크기 (mm)' },
  { field: 'is_displacement', desc: '이 토큰이 변위(DISPLACEMENT) 키워드를 지니는지' },
  { field: 'ranges', desc: '거리(inch)와 상시 표시 여부(always_show)로 이루어진 범위 표시기 가이드라인 목록' },
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
        <code>roster_name</code>(로스터 이름), <code>units</code>(유닛 목록), <code>tokens</code>(유닛/카드가 전장에
        배치하는 토큰 목록) 세 부분으로 이루어져 있습니다.
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

      <h3 className="export-guide-section-title">활용 예시</h3>
      <ul className="export-guide-bullets">
        <li>base_mm으로 각 유닛/토큰 모델을 실제 크기 그대로 배치하는 시뮬레이터 제작</li>
        <li>stat.spd와 ranges 정보로 이동/코헤런시/능력 사거리를 자동으로 표시</li>
        <li>is_displacement로 변위 규칙이 적용되는 대상을 자동 판별</li>
        <li>abilities의 설명 텍스트를 그대로 활용한 개인용 참고 카드/뷰어 제작</li>
      </ul>
    </div>
  )
}
