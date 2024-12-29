import { useEffect, useState } from 'react'
import './App.css'
import Players from './components/Players'
import ResearchPile from './components/ResearchPile'
import TablePile from './components/TablePile'
import gameService from './services/game'
import { ApiResponse } from './types/ApiResponse'
import { Card } from './types/Card'
import { GameStatusInfo } from './types/GameStatusInfo'
import { GameStatusInfoSimple } from './types/GameStatusInfoSimple'

export default function App() {
  const [gameStateSimple, setGameStateSimple] = useState<GameStatusInfoSimple>()
  const [gameStateFull, setGameStateFull] = useState<GameStatusInfo>()
  const [card, setCard] = useState<Card>()

  // Gets the latest game state
  const getGameStateSimple = async () => {
    try {
      const response: ApiResponse<GameStatusInfoSimple> = await gameService.getGameStateSimple()
      console.log('ApiResponse<GameStatusInfoSimple>', response.data)
      setGameStateSimple(response.data)
    } catch (error) {
      console.error('Failed to fetch game state', error)
    }
  }

  // Gets the latest game state
  const getGameStateFull = async () => {
    try {
      const response: ApiResponse<GameStatusInfo> = await gameService.getGameStateFull()
      console.log('ApiResponse<GameStatusInfo>', response.data)
      setGameStateFull(response.data)
    } catch (error) {
      console.error('Failed to fetch game state', error)
    }
  }

  useEffect(() => {
    getGameStateSimple()
    getGameStateFull()
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
      getGameStateSimple()
      getGameStateFull()
      setCard(undefined)
    } catch (error) {
      console.error('Failed to reset', error)
    }
  }

  if (!gameStateSimple) {
    return <div>Loading</div>
  }

  return (
    <div>
      <ResearchPile gameStateFull={gameStateFull} />
      <div>Primary pile: {gameStateSimple?.primaryPile}</div>
      <div>Table pile: {gameStateSimple?.tablePile}</div>
      <div>Research pile: {gameStateSimple?.researchPile}</div>
      <div>Discard pile: {gameStateSimple?.discardPile}</div>
      <div>Duplicate ships: {gameStateSimple?.duplicateColoredShips.toString()}</div>
      <button onClick={handleDraw}>Draw</button>
      <button onClick={handleReset}>Reset</button>
      <TablePile gameStateFull={gameStateFull} />
      <Players gameStateFull={gameStateFull} />
    </div>
  )
}
