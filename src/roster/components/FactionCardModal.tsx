import type { RaceData, Roster } from '../../types'
import { useRosterStore } from '../RosterContext'
import { TacticalCardView } from '../../components/card/TacticalCardView'
import { Modal } from './Modal'

export function FactionCardModal({
  race,
  roster,
  onClose,
}: {
  race: RaceData
  roster: Roster
  onClose: () => void
}) {
  const store = useRosterStore()

  return (
    <Modal title="팩션 카드 선택" onClose={onClose}>
      <div className="gallery-grid">
        {race.factionCards.map((card) => {
          const selected = roster.factionCardName === card.name
          const pick = () => {
            store.setFactionCard(roster.id, card.name)
            onClose()
          }
          return (
            <div
              key={card.name}
              className={`gallery-card-wrap ${selected ? 'gallery-card-selected' : ''}`}
              role="button"
              tabIndex={0}
              onClick={pick}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') pick()
              }}
            >
              <TacticalCardView card={card} resourceLabel={race.resourceLabel} isFactionCard />
            </div>
          )
        })}
      </div>
    </Modal>
  )
}
