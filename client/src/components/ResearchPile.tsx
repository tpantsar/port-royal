import { GameStatus } from '../types/GameStatus'

interface ResearchPileProps {
  gameStateFull: GameStatus | undefined
}

const ResearchPile = ({ gameStateFull }: ResearchPileProps) => {
  const researchPile = gameStateFull?.cards.researchPile

  return (
    <div className="row">
      {researchPile &&
        researchPile.map((card, index) => (
          <div key={index}>
            <div>{card.id}</div>
            <div>{card.name}</div>
            <div>{card.displayImage}</div>
            <div>{card.imageName}</div>
            <img src={`/cards/${card.imageName}`} alt="card" />
          </div>
        ))}
    </div>
  )
}

ResearchPile.displayName = 'ResearchPile'
export default ResearchPile
