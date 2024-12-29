import { GameStatusInfo } from '../types/GameStatusInfo'

interface PlayersProps {
  gameStateFull: GameStatusInfo | undefined
}

const Players = ({ gameStateFull }: PlayersProps) => {
  const players = gameStateFull?.players || []
  const player1 = gameStateFull?.players[0]

  return (
    <>
      <div className="row">
        {player1 && (
          <div>
            <div>id: {player1.id}</div>
            <div>name: {player1.name}</div>
            <div>coins: {player1.coins}</div>
            <div>score: {player1.score}</div>
            <div>cards: {player1.cards.map((card) => card.id).join(', ')}</div>
            <div>
              abilities: {player1.abilities.map((ability) => ability.toString()).join(', ')}
            </div>
          </div>
        )}
      </div>
      <div className="row">
        {players.map((player, index) => (
          <div key={index}>
            <div>id: {player.id}</div>
            <div>name: {player.name}</div>
            <div>coins: {player.coins}</div>
            <div>score: {player.score}</div>
            <div>cards: {player.cards.map((card) => card.id).join(', ')}</div>
            <div>abilities: {player.abilities.map((ability) => ability.toString()).join(', ')}</div>
          </div>
        ))}
      </div>
    </>
  )
}

Players.displayName = 'Players'
export default Players
