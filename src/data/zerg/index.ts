import type { RaceData } from '../../types'
import { kerrigansSwarm } from './tactical/kerrigansSwarm'
import { zergSwarm } from './tactical/zergSwarm'
import { acceleratingCreep } from './tactical/acceleratingCreep'
import { evolutionChamber } from './tactical/evolutionChamber'
import { hatchery } from './tactical/hatchery'
import { hydraliskDen } from './tactical/hydraliskDen'
import { lair } from './tactical/lair'
import { malignantCreep } from './tactical/malignantCreep'
import { overlord } from './tactical/overlord'
import { overseer } from './tactical/overseer'
import { roachWarren } from './tactical/roachWarren'
import { spawningPool } from './tactical/spawningPool'
import { spawningPoolSixPool } from './tactical/spawningPoolSixPool'
import { zergling } from './units/zergling'
import { corpserRoach } from './units/corpserRoach'
import { hydralisk } from './units/hydralisk'
import { kerrigan } from './units/kerrigan'
import { kerriganSwarmRaptorZergling } from './units/kerriganSwarmRaptorZergling'
import { omegaWorm } from './units/omegaWorm'
import { queen } from './units/queen'
import { raptorZergling } from './units/raptorZergling'
import { roach } from './units/roach'
import { roachling } from './units/roachling'
import { swarmlingZergling } from './units/swarmlingZergling'
import { vileRoach } from './units/vileRoach'

export const zerg: RaceData = {
  id: 'zerg',
  race: 'Zerg',
  name: 'Zerg',
  resourceLabel: { full: 'Biomass', abbr: 'BM' },
  factionCards: [kerrigansSwarm, zergSwarm],
  tacticalCards: [
    acceleratingCreep,
    evolutionChamber,
    hatchery,
    hydraliskDen,
    lair,
    malignantCreep,
    overlord,
    overseer,
    roachWarren,
    spawningPool,
    spawningPoolSixPool,
  ],
  units: [
    zergling,
    corpserRoach,
    hydralisk,
    kerrigan,
    kerriganSwarmRaptorZergling,
    omegaWorm,
    queen,
    raptorZergling,
    roach,
    roachling,
    swarmlingZergling,
    vileRoach,
  ],
}
