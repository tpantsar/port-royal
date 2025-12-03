import { useAppDispatch, useAppSelector } from '../hooks/common';
import { buyCard } from '../reducers/gameReducer';
import { Card } from '../types/Card';

export default function TablePile() {
  const dispatch = useAppDispatch();
  const gameState = useAppSelector((state) => state.game.game);
  const tablePile = gameState?.cards.tablePile;

  const handleBuyCard = async (event: React.MouseEvent<HTMLImageElement>, card: Card) => {
    event.preventDefault();

    const currentPlayerId = gameState?.currentPlayer.id;
    const cardId = card?.id;

    if (currentPlayerId !== undefined && cardId !== undefined) {
      if (window.confirm('Are you sure you want to buy this card?')) {
        await dispatch(buyCard(currentPlayerId, cardId));
      }
    }
  };

  const handleDrawCard = async (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
    console.log('handleDrawCard, not yet implemented');
  };

  if (tablePile?.length === 0 || tablePile === undefined) {
    return (
      <div className="row player-card">
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <img
            className="coin-card"
            src="/cards/cardback.png"
            alt="coin"
            onClick={(e) => handleDrawCard(e)}
          />
          <span
            style={{
              position: 'absolute',
              top: '20%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              fontSize: '2.5em',
            }}
          >
            {gameState?.cards.primaryPile.length}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="row player-card">
      {tablePile &&
        tablePile.map((card, index) => (
          <div key={index}>
            <div>{card.id}</div>
            <div>{card.name}</div>
            <div>{card.displayImage.toString()}</div>
            <div>{card.imageName}</div>
            <img
              src={card.displayImage ? `/cards/${card.imageName}` : '/cards/cardback.png'}
              alt="card"
              onClick={(event) => handleBuyCard(event, card)}
            />
          </div>
        ))}
    </div>
  );
}
