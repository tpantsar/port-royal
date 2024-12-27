import { GameStatusInfo } from '../types/GameStatusInfo'

interface TablePileProps {
  gameStateFull: GameStatusInfo | undefined
}

const TablePile = ({ gameStateFull }: TablePileProps) => {
  const tablePile = gameStateFull?.cards.tablePile

  return (
    <div className="row">
      {tablePile &&
        tablePile.map((card, index) => (
          <div key={index}>
            <div>{card.id}</div>
            <div>{card.name}</div>
            <div>{card.type}</div>
            <div>{card.displayImage}</div>
            <div>{card.imageName}</div>
            <img src={`/cards/${card.imageName}`} alt="card" />
          </div>
        ))}
    </div>
  )
}

TablePile.displayName = 'TablePile'
export default TablePile
