import { useEffect, useState } from 'react'
import './App.css'
import gameService from './services/game'
import { ApiResponse } from './types/ApiResponse'
import { Card } from './types/Card'
import { GameStatusInfoSimple } from './types/GameStatusInfoSimple'

export default function App() {
  const [gameState, setGameState] = useState<GameStatusInfoSimple>()
  const [card, setCard] = useState<Card>()

  // Updates the game state
  const getGameState = async () => {
    try {
      const response: ApiResponse<GameStatusInfoSimple> = await gameService.getGameStateSimple()
      console.log('ApiResponse<GameStatusInfoSimple>', response.data)
      setGameState(response.data)
    } catch (error) {
      console.error('Failed to fetch game state', error)
    }
  }

  useEffect(() => {
    getGameState()
  }, [card])

  const handleDraw = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    try {
      const response: ApiResponse<Card> = await gameService.drawCard()
      console.log('ApiResponse<Card>', response.data)
      setCard(response.data)
    } catch (error) {
      console.error('Failed to draw', error)
    }
  }

  const handleReset = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    try {
      const response: ApiResponse<string> = await gameService.resetGame()
      console.log('ApiResponse<string>', response.data)
      getGameState()
      setCard(undefined)
    } catch (error) {
      console.error('Failed to reset', error)
    }
  }

  if (!gameState) {
    return <div>Loading</div>
  }

  return (
    <div>
      <div>Primary pile: {gameState?.primaryPile}</div>
      <div>Table pile: {gameState?.tablePile}</div>
      <div>Research pile: {gameState?.researchPile}</div>
      <div>Discard pile: {gameState?.discardPile}</div>
      <button onClick={handleDraw}>Draw</button>
      <button onClick={handleReset}>Reset</button>
      <div>
        {card ? (
          <>
            <div>{card.id}</div>
            <div>{card.name}</div>
            <div>{card.type}</div>
            <div>{card.displayImage}</div>
            <div>{card.imageName}</div>

            <div>{card.victoryPoints}</div>
            <div>{card.characterCost}</div>

            <img src={`../../public/cards/${card.imageName}`} alt="card" />
          </>
        ) : null}
      </div>
    </div>
  )
}
