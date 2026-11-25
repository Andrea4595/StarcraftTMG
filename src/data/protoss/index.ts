import type { RaceData } from '../../types'
import { daelaam } from './tactical/daelaam'
import { khalai } from './tactical/khalai'
import { nerazim } from './tactical/nerazim'
import { templarCaste } from './tactical/templarCaste'
import { taldarim } from './tactical/taldarim'
import { forge } from './tactical/forge'
import { gateChronoboosted } from './tactical/gateChronoboosted'
import { gateway } from './tactical/gateway'
import { nexus } from './tactical/nexus'
import { observer } from './tactical/observer'
import { overchargedNexus } from './tactical/overchargedNexus'
import { powerField } from './tactical/powerField'
import { roboticsFacility } from './tactical/roboticsFacility'
import { roboticsSupportBay } from './tactical/roboticsSupportBay'
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
import { alarak } from './units/alarak'
import { reaver } from './units/reaver'
import { phasingScarab, scarab, solariteScarab } from './units/scarabs'
import { slayer } from './units/slayer'
import { taldarimPylon } from './units/taldarimPylon'

export const protoss: RaceData = {
  id: 'protoss',
  race: 'Protoss',
  name: 'Protoss',
  resourceLabel: { full: 'Psionic Energy', abbr: 'EN' },
  factionCards: [daelaam, khalai, nerazim, templarCaste, taldarim],
  tacticalCards: [
    forge,
    gateChronoboosted,
    gateway,
    nexus,
    observer,
    overchargedNexus,
    powerField,
    roboticsFacility,
    roboticsSupportBay,
    templarArchives,
    twilightCouncil,
    voidSeeker,
    warpGate,
    warpPrism,
  ],
  units: [
    pylon,
    taldarimPylon,
    adept,
    alarak,
    artanis,
    highTemplar,
    immortal,
    nerazimWatchersAdept,
    praetorGuardZealot,
    reaver,
    scarab,
    solariteScarab,
    phasingScarab,
    sentry,
    slayer,
    stalker,
    tassadar,
    twilightTemplar,
    zealot,
    zeratul,
  ],
}
