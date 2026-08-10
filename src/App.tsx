import { raynorsRaidersFaction } from './data/terran'
import { RosterProvider } from './roster/RosterContext'
import { RosterBuilderPage } from './roster/RosterBuilderPage'
import './components/card/card.css'

function App() {
  return (
    <RosterProvider>
      <RosterBuilderPage faction={raynorsRaidersFaction} />
    </RosterProvider>
  )
}

export default App
