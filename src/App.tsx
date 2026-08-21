import type { RaceData } from './types'
import { terran } from './data/terran'
import { zerg } from './data/zerg'
import { protoss } from './data/protoss'
import { RosterProvider } from './roster/RosterContext'
import { RosterBuilderPage } from './roster/RosterBuilderPage'
import { LangProvider } from './LangContext'
import { AuthProvider } from './AuthContext'
import { LangToggleBar } from './components/LangToggleBar'
import './components/card/card.css'

const RACES: RaceData[] = [terran, zerg, protoss]

function App() {
  return (
    <LangProvider>
      <AuthProvider>
        <RosterProvider>
          <RosterBuilderPage races={RACES} />
        </RosterProvider>
      </AuthProvider>
      <LangToggleBar />
    </LangProvider>
  )
}

export default App
