/** 추가 웨이브로 출시된 카드(CardBase.wave)에 UNIQUE/팩션 배지와 나란히 붙이는 'Wave N' 배지. 기본 구성품이면 아무것도 그리지 않는다 */
export function WaveBadge({ wave }: { wave?: number }) {
  if (wave === undefined) return null
  return <span className="card-wave-badge">Wave {wave}</span>
}
