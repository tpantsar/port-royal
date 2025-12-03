import { GameStatus } from '../types/GameStatus';

interface ResearchPileProps {
  gameState: GameStatus | undefined;
}

const ResearchPile = ({ gameState }: ResearchPileProps) => {
  const researchPile = gameState?.cards.researchPile;

  return (
    <div className="row">
      {researchPile &&
        researchPile.map((card, index) => (
          <div key={index}>
            <div>{card.id}</div>
            <div>{card.name}</div>
            <div>{card.displayImage.toString()}</div>
            <div>{card.imageName}</div>
            <img
              src={card.displayImage ? `/cards/${card.imageName}` : '/cards/cardback.png'}
              alt="card"
            />
          </div>
        ))}
    </div>
  );
};

ResearchPile.displayName = 'ResearchPile';
export default ResearchPile;
