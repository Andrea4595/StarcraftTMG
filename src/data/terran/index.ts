import type { RaceData } from '../../types'
import { raynorsRaiders } from './tactical/raynorsRaiders'
import { terranArmedForces } from './tactical/terranArmedForces'
import { academy } from './tactical/academy'
import { armory } from './tactical/armory'
import { barracks } from './tactical/barracks'
import { barracksProxy } from './tactical/barracksProxy'
import { barracksTechLab } from './tactical/barracksTechLab'
import { dropship } from './tactical/dropship'
import { engineeringBay } from './tactical/engineeringBay'
import { factory } from './tactical/factory'
import { orbitalCommand } from './tactical/orbitalCommand'
import { supplyDepot } from './tactical/supplyDepot'
import { marine } from './units/marine'
import { goliath } from './units/goliath'
import { jimRaynor } from './units/jimRaynor'
import { medic } from './units/medic'
import { pointDefenseDrone } from './units/pointDefenseDrone'
import { marauder } from './units/marauder'
import { raynorsRaiderMarine } from './units/raynorsRaiderMarine'

export const terran: RaceData = {
  id: 'terran',
  race: 'Terran',
  name: 'Terran',
  resourceLabel: { full: 'Command Point', abbr: 'CP' },
  factionCards: [raynorsRaiders, terranArmedForces],
  tacticalCards: [
    academy,
    armory,
    barracks,
    barracksProxy,
    barracksTechLab,
    dropship,
    engineeringBay,
    factory,
    orbitalCommand,
    supplyDepot,
  ],
  units: [marine, goliath, jimRaynor, medic, pointDefenseDrone, marauder, raynorsRaiderMarine],
}
