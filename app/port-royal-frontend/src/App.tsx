import { useEffect, useState } from 'react'
import './App.css'
import gameService from './services/game'
import { ApiResponse } from './types/ApiResponse'
import { GameStatusInfoSimple } from './types/GameStatusInfoSimple'

export default function App() {
  const [gameState, setGameState] = useState<GameStatusInfoSimple>()

  // Updates the game state
  const getGameState = async () => {
    try {
      const response: ApiResponse<GameStatusInfoSimple> = await gameService.getGameState()
      console.log('response.data', response.data)
      setGameState(response.data)
    } catch (error) {
      console.error('Failed to fetch game state', error)
    }
  }

  useEffect(() => {
    getGameState()
  }, [])

  if (!gameState) {
    return <div>Loading</div>
  }

  return (
    <div>
      {gameState?.primaryPile} {gameState?.tablePile} {gameState?.researchPile}{' '}
      {gameState?.discardPile}
    </div>
  )
}
