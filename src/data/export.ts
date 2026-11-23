import { KEYWORDS } from './keywords'
import { TOKENS } from './tokens'
import { protoss } from './protoss'
import { terran } from './terran'
import { zerg } from './zerg'

/**
 * 외부 공개용 전체 데이터 덤프. 빌드 시 vite 플러그인이 이 함수를 호출해 `data.json`으로 내보낸다.
 * 구조를 바꿀 땐 외부 사용자가 깨지지 않도록 schemaVersion을 올린다.
 */
export function buildDataExport() {
  return {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    races: [terran, zerg, protoss],
    keywords: KEYWORDS,
    tokens: TOKENS,
  }
}
