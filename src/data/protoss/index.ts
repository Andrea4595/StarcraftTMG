import type { RaceData } from '../../types'
import { daelaam } from './tactical/daelaam'
import { khalai } from './tactical/khalai'
import { nerazim } from './tactical/nerazim'
import { templarCaste } from './tactical/templarCaste'
import { forge } from './tactical/forge'
import { gateChronoboosted } from './tactical/gateChronoboosted'
import { gateway } from './tactical/gateway'
import { nexus } from './tactical/nexus'
import { observer } from './tactical/observer'
import { overchargedNexus } from './tactical/overchargedNexus'
import { powerField } from './tactical/powerField'
import { roboticsFacility } from './tactical/roboticsFacility'
import { templarArchives } from './tactical/templarArchives'
import { twilightCouncil } from './tactical/twilightCouncil'
import { voidSeeker } from './tactical/voidSeeker'
import { warpGate } from './tactical/warpGate'
import { warpPrism } from './tactical/warpPrism'
import { pylon } from './units/pylon'
import { adept } from './units/adept'
import { artanis } from './units/artanis'
import { highTemplar } from './units/highTemplar'
import { immortal } from './units/immortal'
import { nerazimWatchersAdept } from './units/nerazimWatchersAdept'
import { praetorGuardZealot } from './units/praetorGuardZealot'
import { sentry } from './units/sentry'
import { stalker } from './units/stalker'
import { tassadar } from './units/tassadar'
import { twilightTemplar } from './units/twilightTemplar'
import { zealot } from './units/zealot'
import { zeratul } from './units/zeratul'

export const protoss: RaceData = {
  id: 'protoss',
  race: 'Protoss',
  name: 'Protoss',
  resourceLabel: { full: 'Psionic Energy', abbr: 'EN' },
  factionCards: [daelaam, khalai, nerazim, templarCaste],
  tacticalCards: [
    forge,
    gateChronoboosted,
    gateway,
    nexus,
    observer,
    overchargedNexus,
    powerField,
    roboticsFacility,
    templarArchives,
    twilightCouncil,
    voidSeeker,
    warpGate,
    warpPrism,
  ],
  units: [
    pylon,
    adept,
    artanis,
    highTemplar,
    immortal,
    nerazimWatchersAdept,
    praetorGuardZealot,
    sentry,
    stalker,
    tassadar,
    twilightTemplar,
    zealot,
    zeratul,
  ],
}
