import type { Squad } from '../../types'

export function SquadTable({ squad }: { squad: Squad[] }) {
  return (
    <div className="card-squad">
      {squad.map((s, i) => (
        <div className="card-squad-tier" key={i}>
          <div className="card-squad-tier-value">
            {s.modelMin === s.modelMax ? s.modelMin : `${s.modelMin} - ${s.modelMax}`}
          </div>
          <div className="card-squad-tier-label">MODELS</div>
          <div className="card-squad-tier-value">{s.supply}</div>
          <div className="card-squad-tier-label">SUPPLY</div>
        </div>
      ))}
    </div>
  )
}
