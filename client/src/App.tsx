import { useEffect, useState } from 'react'
import './App.css'
import Alert from './components/Alert'
import Players from './components/Players'
import ResearchPile from './components/ResearchPile'
import TablePile from './components/TablePile'
import gameService from './services/game'
import { ApiResponse } from './types/ApiResponse'
import { Card } from './types/Card'
import { GameStatusInfo } from './types/GameStatusInfo'
import { GameStatusInfoSimple } from './types/GameStatusInfoSimple'
import { Player } from './types/Player'

export default function App() {
  const [gameStateSimple, setGameStateSimple] = useState<GameStatusInfoSimple>()
  const [gameStateFull, setGameStateFull] = useState<GameStatusInfo>()
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

  const updateGameState = async () => {
    getGameStateSimple()
    getGameStateFull()
  }

  useEffect(() => {
    updateGameState()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card])

  const handleDraw = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    try {
      const response: ApiResponse<Card> = await gameService.drawCard()
      console.log('ApiResponse<Card>', response.data)

      updateGameState()
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
      updateGameState()
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
      updateGameState()

      if (response.statusCode === 200) {
        handleNotification(response.message, 'success')
      } else {
        handleNotification(response.message, 'error')
      }
    } catch (error) {
      console.error('Failed to switch player turn', error)
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
      <div style={{ color: 'red' }}>
        Turn: {gameStateSimple?.currentPlayer.name} (id={gameStateSimple?.currentPlayer.id})
      </div>
      <button onClick={handleDraw}>Draw</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleSwitch}>Switch player</button>
      <Alert message={notificationMessage} type={notificationType} />
      <TablePile
        gameStateFull={gameStateFull}
        updateGameState={updateGameState}
        handleNotification={handleNotification}
      />
      <Players gameStateFull={gameStateFull} />
    </div>
  )
}
