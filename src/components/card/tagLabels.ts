import type { Lang } from '../../LangContext'

/**
 * SurgeType(Light/Armoured), TargetType(All/Ground/Flying), 유닛 태그(unit.tags)에 등장하는 값들의
 * 한글 명칭. 참고 중인 번역 자료의 표기를 그대로 따른다. 여기 없는 값(Mechanical/Biological 등)은
 * 아직 확정된 번역이 없어 원문 그대로 둔다.
 */
const TAG_LABELS_KO: Record<string, string> = {
  Armoured: '중장갑',
  Light: '경장갑',
  All: '전체',
  Ground: '지상',
  Flying: '비행',
}

/** SurgeType/TargetType/유닛 태그처럼 Rule(en/ko 쌍)이 아니라 영문 상수 하나로 저장된 값을 번역한다.
 *  번역이 없으면 원문을 그대로 돌려준다 */
export function localizeTag(term: string, lang: Lang): string {
  if (lang === 'en') return term
  return TAG_LABELS_KO[term] ?? term
}

/**
 * 자유 텍스트 안에 등장하는 태그 단어만 골라 번역한다(예: PIERCE 키워드의 suffix 'Armoured (3)').
 * 문장이 아니라 'TagName (값)' 형태의 짧은 구라, 단어 경계로 안전하게 치환할 수 있다.
 */
export function localizeTagWordsInText(text: string, lang: Lang): string {
  if (lang === 'en') return text
  return text.replace(/\b[A-Za-z]+\b/g, (word) => TAG_LABELS_KO[word] ?? word)
}
