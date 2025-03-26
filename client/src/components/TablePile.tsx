import gameService from '../services/game'
import { ApiResponse } from '../types/ApiResponse'
import { Card } from '../types/Card'
import { GameStatusInfo } from '../types/GameStatusInfo'

interface TablePileProps {
  gameStateFull: GameStatusInfo | undefined
  updateGameState: () => void
  handleNotification: (message: string, type: 'success' | 'info' | 'warning' | 'error') => void
}

const TablePile = ({ gameStateFull, updateGameState, handleNotification }: TablePileProps) => {
  const tablePile = gameStateFull?.cards.tablePile

  const handleBuyCard = async (event: React.MouseEvent<HTMLImageElement>, card: Card) => {
    event.preventDefault()

    const currentPlayerId = gameStateFull?.currentPlayer.id
    const cardId = card?.id

    console.log('currentPlayerId', currentPlayerId)
    console.log('cardId', cardId)

    try {
      if (currentPlayerId !== undefined && cardId !== undefined) {
        if (window.confirm('Are you sure you want to buy this card?')) {
          const body = { playerId: currentPlayerId, cardId: cardId }
          const response: ApiResponse<Card> = await gameService.buyCard(body)
          console.log('ApiResponse<Card>', response.data)

          if (response.statusCode === 200) {
            handleNotification(response.message, 'success')
          } else {
            handleNotification(response.message, 'error')
          }

          updateGameState()
        }
      } else {
        console.error('Player ID or Card ID is undefined')
      }
    } catch (error) {
      console.error('Failed to buy card', error)
    }
  }

  if (tablePile?.length === 0 || tablePile === undefined) {
    return null
  }

  return (
    <div className="row player-card">
      {tablePile &&
        tablePile.map((card, index) => (
          <div key={index}>
            <div>{card.id}</div>
            <div>{card.name}</div>
            <div>{card.type}</div>
            <div>{card.displayImage}</div>
            <div>{card.imageName}</div>
            <img
              src={`/cards/${card.imageName}`}
              alt="card"
              onClick={(event) => handleBuyCard(event, card)}
            />
          </div>
        ))}
    </div>
  )
}

TablePile.displayName = 'TablePile'
export default TablePile
