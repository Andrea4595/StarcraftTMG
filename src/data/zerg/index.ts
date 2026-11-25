import type { RaceData } from '../../types'
import { kerrigansSwarm } from './tactical/kerrigansSwarm'
import { zergSwarm } from './tactical/zergSwarm'
import { zagarasSwarm } from './tactical/zagarasSwarm'
import { stukovsForces } from './tactical/stukovsForces'
import { acceleratingCreep } from './tactical/acceleratingCreep'
import { cocoon } from './tactical/cocoon'
import { defilerMound } from './tactical/defilerMound'
import { evolutionChamber } from './tactical/evolutionChamber'
import { hatchery } from './tactical/hatchery'
import { healingPathogen } from './tactical/healingPathogen'
import { hive } from './tactical/hive'
import { hungeringInfestation } from './tactical/hungeringInfestation'
import { hydraliskDen } from './tactical/hydraliskDen'
import { infestedBarracks } from './tactical/infestedBarracks'
import { infestedCommandCenter } from './tactical/infestedCommandCenter'
import { lair } from './tactical/lair'
import { malignantCreep } from './tactical/malignantCreep'
import { overlord } from './tactical/overlord'
import { overseer } from './tactical/overseer'
import { reactiveCreep } from './tactical/reactiveCreep'
import { roachWarren } from './tactical/roachWarren'
import { spawningPool } from './tactical/spawningPool'
import { spawningPoolSixPool } from './tactical/spawningPoolSixPool'
import { weightedPustule } from './tactical/weightedPustule'
import { zergling } from './units/zergling'
import { bileLauncher } from './units/bileLauncher'
import { corpserRoach } from './units/corpserRoach'
import { defiler } from './units/defiler'
import { hydralisk } from './units/hydralisk'
import { infestedGoliath } from './units/infestedGoliath'
import { infestedMarine } from './units/infestedMarine'
import { infestedMissileTurret } from './units/infestedMissileTurret'
import { infestedSiegeTank } from './units/infestedSiegeTank'
import { infestedTrooper } from './units/infestedTrooper'
import { kerrigan } from './units/kerrigan'
import { kerriganSwarmRaptorZergling } from './units/kerriganSwarmRaptorZergling'
import { omegaWorm } from './units/omegaWorm'
import { queen } from './units/queen'
import { raptorZergling } from './units/raptorZergling'
import { ravager } from './units/ravager'
import { roach } from './units/roach'
import { roachling } from './units/roachling'
import { stukov } from './units/stukov'
import { swarmlingZergling } from './units/swarmlingZergling'
import { vileRoach } from './units/vileRoach'
import { vilelingZergling } from './units/vilelingZergling'
import { zagara } from './units/zagara'

export const zerg: RaceData = {
  id: 'zerg',
  race: 'Zerg',
  name: 'Zerg',
  resourceLabel: { full: 'Biomass', abbr: 'BM' },
  factionCards: [kerrigansSwarm, zergSwarm, zagarasSwarm, stukovsForces],
  tacticalCards: [
    acceleratingCreep,
    cocoon,
    defilerMound,
    evolutionChamber,
    hatchery,
    healingPathogen,
    hive,
    hungeringInfestation,
    hydraliskDen,
    infestedBarracks,
    infestedCommandCenter,
    lair,
    malignantCreep,
    overlord,
    overseer,
    reactiveCreep,
    roachWarren,
    spawningPool,
    spawningPoolSixPool,
    weightedPustule,
  ],
  units: [
    zergling,
    bileLauncher,
    corpserRoach,
    defiler,
    hydralisk,
    infestedGoliath,
    infestedMarine,
    infestedMissileTurret,
    infestedSiegeTank,
    infestedTrooper,
    kerrigan,
    kerriganSwarmRaptorZergling,
    omegaWorm,
    queen,
    raptorZergling,
    ravager,
    roach,
    roachling,
    stukov,
    swarmlingZergling,
    vileRoach,
    vilelingZergling,
    zagara,
  ],
}
