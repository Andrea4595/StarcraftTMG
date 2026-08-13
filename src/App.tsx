import type { RaceData } from './types'
import { terran } from './data/terran'
import { zerg } from './data/zerg'
import { protoss } from './data/protoss'
import { RosterProvider } from './roster/RosterContext'
import { RosterBuilderPage } from './roster/RosterBuilderPage'
import { LangProvider } from './LangContext'
import { LangToggleBar } from './components/LangToggleBar'
import './components/card/card.css'

const RACES: RaceData[] = [terran, zerg, protoss]

function App() {
  return (
    <LangProvider>
      <RosterProvider>
        <RosterBuilderPage races={RACES} />
      </RosterProvider>
      <LangToggleBar />
    </LangProvider>
  )
}

export default App
