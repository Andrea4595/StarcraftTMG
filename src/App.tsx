import type { RaceData } from './types'
import { terran } from './data/terran'
import { zerg } from './data/zerg'
import { protoss } from './data/protoss'
import { RosterProvider } from './roster/RosterContext'
import { RosterBuilderPage } from './roster/RosterBuilderPage'
import './components/card/card.css'

const RACES: RaceData[] = [terran, zerg, protoss]

function App() {
  return (
    <RosterProvider>
      <RosterBuilderPage races={RACES} />
    </RosterProvider>
  )
}

export default App
