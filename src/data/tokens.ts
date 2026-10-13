import type { RangeIndicator, Rule } from '../types'

/** 유닛/택티컬 카드가 전장에 배치하는 토큰 종류. 시뮬레이터 연동 데이터(tokens 목록)의 원본이 된다 */
export interface TokenEntry {
  /** 안정적인 식별자. 각 능력의 placesTokenId가 이 값을 참조한다 */
  id: string
  name: Rule
  base_mm: { width: number; height: number }
  is_displacement: boolean
  /** 시뮬레이터 '범위 표시기' 가이드라인. 없으면 표시할 범위가 없는 것 */
  ranges?: RangeIndicator[]
}

export const TOKENS: TokenEntry[] = [
  {
    id: 'Force Field',
    name: { en: 'Force Field', ko: '역장' },
    base_mm: { width: 80, height: 80 },
    is_displacement: false,
  },
  {
    id: 'Creep Tumor',
    name: { en: 'Creep Tumor', ko: '점막 종양' },
    base_mm: { width: 28, height: 28 },
    is_displacement: true,
    ranges: [{ inch: 6, alwaysShow: true }],
  },
  {
    id: 'Shade',
    name: { en: 'Shade', ko: '그림자' },
    base_mm: { width: 40, height: 40 },
    is_displacement: true,
  },
  {
    id: 'Ravager Burrow',
    name: { en: 'Ravager Burrow', ko: '궤멸충 땅굴' },
    base_mm: { width: 80, height: 80 },
    is_displacement: true,
  },
  {
    id: 'Corrosive Bile',
    name: { en: 'Corrosive Bile', ko: '부식성 담즙' },
    base_mm: { width: 25, height: 25 },
    is_displacement: false,
  },
  {
    id: 'Faction Marker',
    name: { en: 'Faction Marker', ko: '팩션 마커' },
    base_mm: { width: 25, height: 25 },
    is_displacement: false,
  },
  {
    id: 'Bile Bomb',
    name: { en: 'Bile Bomb', ko: '담즙 폭탄' },
    base_mm: { width: 32, height: 32 },
    is_displacement: true,
  },
  {
    id: 'Dark Swarm',
    name: { en: 'Dark Swarm', ko: '암흑 구름' },
    base_mm: { width: 32, height: 32 },
    is_displacement: true,
  },
  {
    // 5" 원형 블래스트 템플릿
    id: 'Plague Blast Template',
    name: { en: 'Plague Blast Template', ko: '역병 블래스트 템플릿' },
    base_mm: { width: 127, height: 127 },
    is_displacement: false,
  },
  {
    id: 'Force Wall',
    name: { en: 'Force Wall', ko: '역장 벽' },
    base_mm: { width: 40, height: 100 },
    is_displacement: false,
  },
  {
    // 각 페이즈 종료 시 이 토큰 중앙에 5" 원형 사이오닉 폭풍 블래스트 템플릿을 놓는다
    id: 'Psionic Storm',
    name: { en: 'Psionic Storm', ko: '사이오닉 폭풍' },
    base_mm: { width: 32, height: 32 },
    is_displacement: false,
  },
]
