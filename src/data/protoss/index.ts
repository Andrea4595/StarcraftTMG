import type { RaceData } from '../../types'
import { daelaam } from './tactical/daelaam'
import { khalai } from './tactical/khalai'
import { forge } from './tactical/forge'
import { gateChronoboosted } from './tactical/gateChronoboosted'
import { gateway } from './tactical/gateway'
import { nexus } from './tactical/nexus'
import { observer } from './tactical/observer'
import { overchargedNexus } from './tactical/overchargedNexus'
import { powerField } from './tactical/powerField'
import { twilightCouncil } from './tactical/twilightCouncil'
import { warpGate } from './tactical/warpGate'
import { warpPrism } from './tactical/warpPrism'
import { pylon } from './units/pylon'
import { adept } from './units/adept'
import { artanis } from './units/artanis'
import { praetorGuardZealot } from './units/praetorGuardZealot'
import { sentry } from './units/sentry'
import { stalker } from './units/stalker'
import { zealot } from './units/zealot'

export const protoss: RaceData = {
  id: 'protoss',
  race: 'Protoss',
  name: 'Protoss',
  resourceLabel: { full: 'Psionic Energy', abbr: 'EN' },
  factionCards: [daelaam, khalai],
  tacticalCards: [
    forge,
    gateChronoboosted,
    gateway,
    nexus,
    observer,
    overchargedNexus,
    powerField,
    twilightCouncil,
    warpGate,
    warpPrism,
  ],
  units: [pylon, adept, artanis, praetorGuardZealot, sentry, stalker, zealot],
}
