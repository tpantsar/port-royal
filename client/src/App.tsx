import { useEffect, useState } from 'react'
import './App.css'
import Alert from './components/Alert'
import Players from './components/Players'
import ResearchPile from './components/ResearchPile'
import TablePile from './components/TablePile'
import gameService from './services/game'
import { ApiResponse } from './types/ApiResponse'
import { Card } from './types/Card'
import { GameStatus } from './types/GameStatus'
import { Player } from './types/Player'

export default function App() {
  const [gameState, setGameState] = useState<GameStatus>()
  const [card, setCard] = useState<Card>()

  const [notificationMessage, setNotificationMessage] = useState<string>('')
  const [notificationType, setNotificationType] = useState<
    'success' | 'info' | 'warning' | 'error'
  >('info')

  let notificationTimeoutId: number
  const notificationTimeoutLength = 3000

  const handleNotification = (message: string, type: 'success' | 'info' | 'warning' | 'error') => {
    clearTimeout(notificationTimeoutId)
    setNotificationMessage(message)
    setNotificationType(type)

    notificationTimeoutId = window.setTimeout(() => {
      setNotificationMessage('')
      setNotificationType('success')
    }, notificationTimeoutLength)
  }

  // Gets the latest game state
  const getGameState = async () => {
    try {
      const response: ApiResponse<GameStatus> = await gameService.getGameState()
      console.log('ApiResponse<GameStatusInfo>', response.data)
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

      getGameState()
      setCard(response.data)

      if (response.statusCode === 400) {
        handleNotification('Duplicate colored ships detected', 'info')
      }
    } catch (error) {
      console.error('Failed to draw card', error)
      handleNotification('Failed to draw card', 'error')
    }
  }

  const handleReset = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    try {
      const response: ApiResponse<string> = await gameService.resetGame()
      console.log('ApiResponse<string>', response.data)
      getGameState()
      setCard(undefined)

      if (response.statusCode === 200) {
        handleNotification(response.message, 'success')
      } else {
        handleNotification(response.message, 'error')
      }
    } catch (error) {
      console.error('Failed to reset game', error)
      handleNotification('Failed to reset game', 'error')
    }
  }

  const handleSwitch = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    try {
      const response: ApiResponse<Player> = await gameService.switchPlayerTurn()
      console.log('ApiResponse<Player>', response.data)
      getGameState()

      if (response.statusCode === 200) {
        handleNotification(response.message, 'success')
      } else {
        handleNotification(response.message, 'error')
      }
    } catch (error) {
      console.error('Failed to switch player turn', error)
      handleNotification('Failed to switch player turn', 'error')
    }
  }

  if (!gameState || gameState === undefined) {
    return <div>Loading</div>
  }

  return (
    <div>
      <ResearchPile gameStateFull={gameState} />
      <div>Primary pile: {gameState.cards.primaryPile.length}</div>
      <div>Table pile: {gameState.cards.tablePile.length}</div>
      <div>Discard pile: {gameState.cards.discardPile.length}</div>
      <div>Research pile: {gameState.cards.researchPile.length}</div>
      <div>Duplicate ships: {gameState.duplicateColoredShips.toString()}</div>
      <div style={{ color: 'red' }}>
        Turn: {gameState.currentPlayer.name} (id={gameState.currentPlayer.id})
      </div>
      <button onClick={handleDraw}>Draw</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleSwitch}>Switch player</button>
      <Alert message={notificationMessage} type={notificationType} />
      <TablePile
        gameState={gameState}
        updateGameState={getGameState}
        handleNotification={handleNotification}
      />
      <Players gameStateFull={gameState} />
    </div>
  )
}
