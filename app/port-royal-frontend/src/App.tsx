// src/App.tsx
import { useState } from 'react'
import './App.css'
import CardImage from './components/CardImage'
import gameService from './services/game'
import { ApiResponse } from './types/ApiResponse'
import { Card } from './types/Card'
import { GameStatusInfoSimple } from './types/GameStatusInfoSimple'

const Cards = ({ gameState }) => {
  return (
    <div className="container text-center">
      <div className="row">
        <p>researchPile: {gameState?.researchPile}</p>
      </div>
      <div className="row">
        <div className="col">
          <p>primaryPile: {gameState?.primaryPile}</p>
          <CardImage imageName="cardback.png" />
        </div>
        <div className="col-6">
          <p>tablePile: {gameState?.tablePile}</p>
        </div>
        <div className="col">
          <p>discardPile: {gameState?.discardPile}</p>
          <CardImage imageName="cardback.png" />
        </div>
      </div>
    </div>
  )
}

const ApiButtons = ({
  gameState,
  getGameState,
  drawCard,
  buyCard,
  drawCardMessage,
  cardDrawn,
  setCardId,
  setPlayerId,
  buyCardMessage,
}) => {
  return (
    <div className="container text-center">
      <div className="row">
        <div className="col">
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
        <div className="col">
          <button onClick={drawCard}>draw-card</button>
          {drawCardMessage && (
            <div>
              <p>{drawCardMessage}</p>
            </div>
          )}
          {cardDrawn && (
            <div>
              <p>id: {cardDrawn?.id}</p>
              <p>name: {cardDrawn?.name}</p>
              <p>type: {cardDrawn?.type}</p>
              <p>displayImage: {cardDrawn?.displayImage.toString()}</p>
              <p>imageName: {cardDrawn?.imageName}</p>
              {cardDrawn?.displayImage && <CardImage imageName={cardDrawn?.imageName} />}
            </div>
          )}
        </div>
        <div className="col">
          <form onSubmit={buyCard}>
            <label>
              cardId:
              <input
                type="number"
                value={cardDrawn?.id}
                onChange={(event) => setCardId(Number(event.target.value))}
              />
            </label>
            <label>
              playerId:
              <input
                type="number"
                value={gameState?.currentPlayer.id}
                onChange={(event) => setPlayerId(Number(event.target.value))}
              />
            </label>
            <button type="submit">buy-card</button>
          </form>
          {buyCardMessage && (
            <div>
              <p>{buyCardMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function App() {
  // API
  const [gameState, setGameState] = useState<GameStatusInfoSimple | null>(null)
  const [cardDrawn, setCardDrawn] = useState<Card | null>(null)
  const [cardBought, setCardBought] = useState<Card | null>(null)

  // POST buy-card parameters
  const [cardId, setCardId] = useState<number>(1)
  const [playerId, setPlayerId] = useState<number>(1)

  const [drawCardMessage, setDrawCardMessage] = useState<string | null>(null)
  const [buyCardMessage, setBuyCardMessage] = useState<string | null>(null)

  // Updates the game state
  const getGameState = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    try {
      const response: ApiResponse<GameStatusInfoSimple> = await gameService.getGameState()
      setGameState(response.data)
    } catch (error) {
      console.error('Failed to fetch game state', error)
    }
  }

  const drawCard = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    try {
      const response: ApiResponse<Card> = await gameService.drawCard()
      setCardDrawn(response.data)
      setDrawCardMessage(response.message)
      getGameState(event)
    } catch (error) {
      console.error('Failed to draw card', error)
    }
  }

  const buyCard = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    try {
      const params = { cardId, playerId }
      const response: ApiResponse<Card> = await gameService.buyCard(params)
      setCardBought(response.data)
      setBuyCardMessage(response.message)
      // getGameState(event);
    } catch (error) {
      console.error('Failed to buy card', error)
    }
  }

  return (
    <>
      <Cards gameState={gameState} />
      <ApiButtons
        gameState={gameState}
        getGameState={getGameState}
        drawCard={drawCard}
        buyCard={buyCard}
        drawCardMessage={drawCardMessage}
        cardDrawn={cardDrawn}
        setCardId={setCardId}
        setPlayerId={setPlayerId}
        buyCardMessage={buyCardMessage}
      />
    </>
  )
}

export default App
