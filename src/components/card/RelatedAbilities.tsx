import { useLocalize } from '../../LangContext'
import type { AbilityReference } from './abilityReferences'

/**
 * 이름 직접 언급으로 감지된 연관 어빌리티/무기 목록을 보여준다. 아직 클릭해서 이동하는 기능은
 * 없다 — 우선 감지/표시만으로 개념을 검증한 뒤, 필요하면 클릭 이동을 붙인다.
 */
export function RelatedAbilities({
  relatedTo,
  referencedBy,
}: {
  relatedTo?: AbilityReference[]
  referencedBy?: AbilityReference[]
}) {
  const localize = useLocalize()
  if (!relatedTo?.length && !referencedBy?.length) return null

  return (
    <div className="card-related-abilities">
      {!!relatedTo?.length && (
        <div className="card-related-abilities-row">
          <span className="card-related-abilities-label">강화 대상:</span>
          <span className="card-related-abilities-name">{relatedTo.map((r) => localize(r.name)).join(', ')}</span>
        </div>
      )}
      {!!referencedBy?.length && (
        <div className="card-related-abilities-row">
          <span className="card-related-abilities-label">강화 출처:</span>
          <span className="card-related-abilities-name">{referencedBy.map((r) => localize(r.name)).join(', ')}</span>
        </div>
      )}
    </div>
  )
}
