import { GameStatus } from '../types/GameStatus'
import { Player } from '../types/Player'

interface PlayersProps {
  gameState: GameStatus | undefined
}

const PlayerInfo = ({ player }: { player: Player }) => {
  const visibleCards = player.cards.filter((card) => card.displayImage)
  //const visibleCards = player.cards

  return (
    <div className="row player-card">
      <div>
        <div>id: {player.id}</div>
        <div>name: {player.name}</div>
        <div>score: {player.score}</div>
        <div>abilities: {player.abilities.map((ability) => ability.toString()).join(', ')}</div>
        <div>cards length: {player.cards.length}</div>
      </div>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <img className="coin-card" src="/cards/cardback.png" alt="coin" />
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
          {player.coins}
        </span>
      </div>
      {visibleCards.map((card, index) => (
        <div key={index}>
          <div>{card.id}</div>
          <img src={`/cards/${card.imageName}`} alt="card" />
        </div>
      ))}
    </div>
  )
}

const Players = ({ gameState }: PlayersProps) => {
  const players = gameState?.players || []

  return (
    <div>
      {players.map((player, index) => (
        <PlayerInfo key={index} player={player} />
      ))}
    </div>
  )
}

Players.displayName = 'Players'
export default Players
