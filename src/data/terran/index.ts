import type { Faction } from '../../types'
import { raynorsRaiders } from './tactical/raynorsRaiders'
import { barracks } from './tactical/barracks'
import { marine } from './units/marine'
import { goliath } from './units/goliath'
import { jimRaynor } from './units/jimRaynor'
import { medic } from './units/medic'
import { pointDefenseDrone } from './units/pointDefenseDrone'

export const raynorsRaidersFaction: Faction = {
  id: 'raynors-raiders',
  name: "Raynor's Raiders",
  factionCard: raynorsRaiders,
  tacticalCards: [barracks],
  units: [marine, goliath, jimRaynor, medic, pointDefenseDrone],
}
