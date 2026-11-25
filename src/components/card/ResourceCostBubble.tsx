/** 능력 발동에 드는 종족 자원 비용(CP/BM/EN 등)을 노란 알약 버블로 보여준다. 다른 화면의 자원 표시와 같은 노란색 */
export function ResourceCostBubble({ amount, label, small }: { amount: number | 'X'; label: string; small?: boolean }) {
  return (
    <span className={`card-resource-bubble ${small ? 'card-resource-bubble-small' : ''}`}>
      <span className="card-resource-bubble-amount">{amount}</span>
      <span className="card-resource-bubble-label">{label.toUpperCase()}</span>
    </span>
  )
}
