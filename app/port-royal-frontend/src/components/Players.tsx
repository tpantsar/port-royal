import { GameStatusInfo } from '../types/GameStatusInfo'

interface PlayersProps {
  gameStateFull: GameStatusInfo | undefined
}

const Players = ({ gameStateFull }: PlayersProps) => {
  const players = gameStateFull?.players || []
  //const player1 = gameStateFull?.players[0]

  return (
    <div className="row">
      {players.map((player, index) => (
        <div key={index}>
          <div>id: {player.id}</div>
          <div>name: {player.name}</div>
          <div>coins: {player.coins}</div>
          <div>score: {player.score}</div>
          <div>
            cards:{' '}
            {player.cards.length > 0 ? player.cards.map((card) => card.id).join(', ') : 'null'}
          </div>
          <div>abilities: {player.abilities.map((ability) => ability.toString()).join(', ')}</div>
        </div>
      ))}
      <div style={{ color: 'red' }}>
        Turn: {gameStateFull?.currentPlayer.name} (id={gameStateFull?.currentPlayer.id})
      </div>
    </div>
  )
}

Players.displayName = 'Players'
export default Players
