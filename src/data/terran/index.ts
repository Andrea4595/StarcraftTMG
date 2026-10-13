import type { RaceData } from '../../types'
import { raynorsRaiders } from './tactical/raynorsRaiders'
import { terranArmedForces } from './tactical/terranArmedForces'
import { novaCovertOps } from './tactical/novaCovertOps'
import { academy } from './tactical/academy'
import { armory } from './tactical/armory'
import { barracks } from './tactical/barracks'
import { barracksProxy } from './tactical/barracksProxy'
import { barracksTechLab } from './tactical/barracksTechLab'
import { dropship } from './tactical/dropship'
import { engineeringBay } from './tactical/engineeringBay'
import { factory } from './tactical/factory'
import { factoryTechLab } from './tactical/factoryTechLab'
import { orbitalCommand } from './tactical/orbitalCommand'
import { supplyDepot } from './tactical/supplyDepot'
import { vanadiumPlating } from './tactical/vanadiumPlating'
import { marine } from './units/marine'
import { autoTurret } from './units/autoTurret'
import { goliath } from './units/goliath'
import { holoDecoy } from './units/holoDecoy'
import { jimRaynor } from './units/jimRaynor'
import { medic } from './units/medic'
import { novaAssaultMode } from './units/novaAssaultMode'
import { novaStealthMode } from './units/novaStealthMode'
import { pointDefenseDrone } from './units/pointDefenseDrone'
import { marauder } from './units/marauder'
import { raven } from './units/raven'
import { raynorsRaiderMarine } from './units/raynorsRaiderMarine'
import { sabotageDrone } from './units/sabotageDrone'
import { siegeTank } from './units/siegeTank'
import { specOpsMarauder } from './units/specOpsMarauder'

export const terran: RaceData = {
  id: 'terran',
  race: 'Terran',
  name: 'Terran',
  resourceLabel: { full: 'Command Point', abbr: 'CP' },
  factionCards: [raynorsRaiders, terranArmedForces, novaCovertOps],
  tacticalCards: [
    academy,
    armory,
    barracks,
    barracksProxy,
    barracksTechLab,
    dropship,
    engineeringBay,
    factory,
    factoryTechLab,
    orbitalCommand,
    supplyDepot,
    vanadiumPlating,
  ],
  units: [
    marine,
    autoTurret,
    goliath,
    holoDecoy,
    jimRaynor,
    medic,
    novaAssaultMode,
    novaStealthMode,
    pointDefenseDrone,
    marauder,
    raven,
    raynorsRaiderMarine,
    sabotageDrone,
    siegeTank,
    specOpsMarauder,
  ],
}
