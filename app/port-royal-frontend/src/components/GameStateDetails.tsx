import React from 'react'
import { GameStatusInfoSimple } from '../types/GameStatusInfoSimple'

type GameStateDetailsProps = {
  gameState: GameStatusInfoSimple | null
  getGameState: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const GameStateDetails: React.FC<GameStateDetailsProps> = ({ gameState, getGameState }) => {
  return (
    <div>
      <button onClick={getGameState}>state-simple</button>
      <p>primaryPile: {gameState?.primaryPile}</p>
      <p>tablePile: {gameState?.tablePile}</p>
      <p>discardPile: {gameState?.discardPile}</p>
      <p>researchPile: {gameState?.researchPile}</p>
      <p>status: {gameState?.status}</p>
      <p>duplicateColoredShips: {gameState?.duplicateColoredShips.toString()}</p>
      <p>currentPlayer: {gameState?.currentPlayer.name}</p>
      <p>players: {gameState?.players.map((player) => player.name).join(', ')}</p>
    </div>
  )
}

export default GameStateDetails
