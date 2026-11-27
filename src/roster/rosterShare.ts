import type { RaceData, Roster, RosterUnitEntry } from '../types'
import { makeId } from './makeId'

/**
 * 로스터 공유 링크. 서버에 아무것도 저장하지 않고 로스터 구성 자체를 URL 해시(#share=...)에 담는다.
 * 해시는 서버로 전송되지 않으므로 GitHub Pages 같은 정적 호스팅에서도, 서비스워커 캐시 상태에서도
 * 앱이 그대로 열린 뒤 클라이언트에서만 읽힌다.
 *
 * 형식: base64url( deflate-raw( JSON(SharePayload) ) ). 압축을 못 쓰는 환경이면 'j' 접두어를 붙여
 * 압축 없이 담는다. 게임 진행 기록(스폰/사망/카드 소모)은 공유 대상이 아니라서 뺀다.
 */
const HASH_KEY = 'share='
const FORMAT_VERSION = 1

/** [unitId, squadTierIndex, upgradeIndexes, summonedBy?] - 링크 길이를 줄이려고 배열로 담는다 */
type ShareUnit = [string, number, number[]] | [string, number, number[], string]

interface SharePayload {
  v: number
  /** 로스터 이름 */
  n: string
  /** raceId */
  r: string
  /** factionCardId */
  f: string | null
  /** mineralCap */
  m: number
  /** tacticalCardIds */
  t: string[]
  u: ShareUnit[]
}

function toBase64Url(bytes: Uint8Array): string {
  let bin = ''
  for (const b of bytes) bin += String.fromCharCode(b)
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function fromBase64Url(text: string): Uint8Array {
  const b64 = text.replace(/-/g, '+').replace(/_/g, '/')
  const bin = atob(b64 + '='.repeat((4 - (b64.length % 4)) % 4))
  return Uint8Array.from(bin, (c) => c.charCodeAt(0))
}

async function pipeThrough(bytes: Uint8Array, stream: CompressionStream | DecompressionStream): Promise<Uint8Array> {
  const out = new Blob([bytes as BlobPart]).stream().pipeThrough(stream)
  return new Uint8Array(await new Response(out).arrayBuffer())
}

const canCompress = typeof CompressionStream === 'function' && typeof DecompressionStream === 'function'

/** 공유 링크 전체 URL을 만든다 */
export async function buildShareUrl(roster: Roster): Promise<string> {
  if (!roster.raceId) throw new Error('종족이 정해지지 않은 로스터는 공유할 수 없습니다')
  const payload: SharePayload = {
    v: FORMAT_VERSION,
    n: roster.name,
    r: roster.raceId,
    f: roster.factionCardId,
    m: roster.mineralCap,
    t: roster.tacticalCardIds,
    u: roster.units.map((e) =>
      e.summonedBy
        ? [e.unitId, e.squadTierIndex, e.upgradeIndexes, e.summonedBy]
        : [e.unitId, e.squadTierIndex, e.upgradeIndexes],
    ),
  }
  const json = new TextEncoder().encode(JSON.stringify(payload))
  const encoded = canCompress
    ? toBase64Url(await pipeThrough(json, new CompressionStream('deflate-raw')))
    : `j${toBase64Url(json)}`
  // 앱이 배포된 경로(base)를 그대로 쓰고, 기존 쿼리/해시는 버린다
  return `${window.location.origin}${import.meta.env.BASE_URL}#${HASH_KEY}${encoded}`
}

/** 지금 주소의 해시에 담긴 공유 데이터. 공유 링크로 들어온 게 아니면 null */
export function readShareHash(): string | null {
  const hash = window.location.hash.replace(/^#/, '')
  return hash.startsWith(HASH_KEY) ? hash.slice(HASH_KEY.length) : null
}

/** 같은 로스터가 새로고침마다 또 추가되지 않도록, 읽은 뒤에는 주소창에서 해시를 지운다 */
export function clearShareHash() {
  const { pathname, search } = window.location
  window.history.replaceState(window.history.state, '', `${pathname}${search}`)
}

function isNumberArray(v: unknown): v is number[] {
  return Array.isArray(v) && v.every((n) => Number.isInteger(n) && n >= 0)
}

/**
 * 공유 데이터를 새 로스터로 복원한다. 링크가 손상됐거나, 지금 앱 데이터에 없는 종족/유닛을 가리키면
 * 예외를 던진다. 카드/유닛 id는 새로 발급하므로 같은 링크를 여러 번 열어도 서로 다른 로스터가 된다.
 */
export async function decodeSharedRoster(encoded: string, races: RaceData[]): Promise<Roster> {
  const bytes = encoded.startsWith('j')
    ? fromBase64Url(encoded.slice(1))
    : await pipeThrough(fromBase64Url(encoded), new DecompressionStream('deflate-raw'))
  const p = JSON.parse(new TextDecoder().decode(bytes)) as Partial<SharePayload>

  if (p.v !== FORMAT_VERSION) throw new Error('지원하지 않는 공유 링크 형식입니다')
  const race = races.find((r) => r.id === p.r)
  if (!race) throw new Error('알 수 없는 종족입니다')
  if (typeof p.n !== 'string' || typeof p.m !== 'number' || !Array.isArray(p.t) || !Array.isArray(p.u)) {
    throw new Error('공유 링크가 손상되었습니다')
  }

  const factionCardId = p.f && race.factionCards.some((c) => c.id === p.f) ? p.f : null
  const tacticalCardIds = p.t.filter(
    (id): id is string => typeof id === 'string' && race.tacticalCards.some((c) => c.id === id),
  )
  const units: RosterUnitEntry[] = []
  for (const u of p.u) {
    if (!Array.isArray(u)) continue
    const [unitId, squadTierIndex, upgradeIndexes, summonedBy] = u
    const unit = race.units.find((x) => x.id === unitId)
    if (!unit || !Number.isInteger(squadTierIndex) || !isNumberArray(upgradeIndexes)) continue
    units.push({
      id: makeId(),
      unitId: unit.id,
      squadTierIndex: Math.min(Math.max(squadTierIndex, 0), unit.squad.length - 1),
      upgradeIndexes: upgradeIndexes.filter((i) => i < unit.upgrades.length),
      // Firestore가 undefined 값을 거부하므로 값이 없으면 키 자체를 만들지 않는다
      ...(typeof summonedBy === 'string' ? { summonedBy } : {}),
    })
  }

  return {
    id: makeId(),
    name: p.n.slice(0, 100),
    raceId: race.id,
    factionCardId,
    mineralCap: p.m,
    tacticalCardIds,
    units,
    consumedCardKeys: [],
    updatedAt: Date.now(),
  }
}
