import gameService from '#services/gameService.js'
import { ApiResponse, Card, CharacterCard, GameStatus, Player, ShipCard } from '#types.js'
import { gameStatus } from '#utils/state.js'
import express, { Request, Response } from 'express'

const router = express.Router()

router.get('/status', (_req: Request, res: Response<ApiResponse<GameStatus | null>>) => {
  try {
    const status = gameService.getStatus()

    const response: ApiResponse<GameStatus> = {
      statusCode: 200,
      message: 'Game status fetched successfully',
      data: status,
      errors: null,
    }

    res.status(200).json(response)
  } catch (error) {
    const response: ApiResponse<null> = {
      statusCode: 500,
      message: 'Failed to fetch game status',
      data: null,
      errors: [error instanceof Error ? error.message : 'Unknown error'],
    }

    res.status(500).json(response)
  }
})

router.get('/draw', (_req: Request, res: Response<ApiResponse<Card | null>>) => {
  try {
    const card = gameService.drawCard()

    const response: ApiResponse<Card> = {
      statusCode: 200,
      message: 'Card drawn successfully',
      data: card,
      errors: null,
    }

    res.status(200).json(response)
  } catch (error) {
    const response: ApiResponse<null> = {
      statusCode: 500,
      message: 'Failed to draw card',
      data: null,
      errors: [error instanceof Error ? error.message : 'Unknown error'],
    }

    res.status(500).json(response)
  }
})

router.get('/reset', (_req: Request, res: Response<ApiResponse<GameStatus | null>>) => {
  try {
    const reset = gameService.resetGameState()

    const response: ApiResponse<GameStatus> = {
      statusCode: 200,
      message: 'Game reset successfully',
      data: reset,
      errors: null,
    }

    res.status(200).json(response)
  } catch (error) {
    const response: ApiResponse<null> = {
      statusCode: 500,
      message: 'Failed to reset game',
      data: null,
      errors: [error instanceof Error ? error.message : 'Unknown error'],
    }

    res.status(500).json(response)
  }
})

router.get('/switch', (_req: Request, res: Response<ApiResponse<Player | null>>) => {
  try {
    const nextPlayer = gameService.switchPlayer()

    const response: ApiResponse<Player> = {
      statusCode: 200,
      message: 'Player switched successfully',
      data: nextPlayer,
      errors: null,
    }

    res.status(200).json(response)
  } catch (error) {
    const response: ApiResponse<null> = {
      statusCode: 500,
      message: 'Failed to switch player',
      data: null,
      errors: [error instanceof Error ? error.message : 'Unknown error'],
    }

    res.status(500).json(response)
  }
})

router.post('/buy', (_req: Request, res: Response<ApiResponse<GameStatus | null>>) => {
  try {
    let cardBeingBought: Card | null = null

    // for-loop toimii jostain syystä. array.forEach ei toimi cardBeingBought:in kanssa
    // sanoo cardBeingBought:in olevan "never"
    const tablePile = gameStatus.cards.tablePile
    for (let x = 0; x < tablePile.length; x++) {
      if (tablePile[x].id === _req.body['cardId']) {
        cardBeingBought = tablePile[x]
        break
      }
    }

    if (cardBeingBought === null) {
      const response: ApiResponse<null> = {
        statusCode: 400,
        message: 'Card was not found',
        data: null,
        errors: [],
      }
      res.status(response.statusCode).json(response)
      return
    }

    switch (cardBeingBought.type) {
      case 'research':
      case 'tax':
        const response: ApiResponse<null> = {
          statusCode: 400,
          message: 'You cannot buy that card',
          data: null,
          errors: [],
        }
        res.status(response.statusCode).json(response)
        return
      case 'character':
        handleCharacterPurchase(cardBeingBought)
        break
      case 'ship':
        handleShipPurchase(cardBeingBought)
        break
      default:
        throw new Error('You cannot buy that card')
    }

    function handleCharacterPurchase(card: CharacterCard) {
      if (card.characterCost > gameStatus.currentPlayer.coins) {
        const response: ApiResponse<null> = {
          statusCode: 400,
          message: 'Not enough coins',
          data: null,
          errors: [],
        }
        res.status(response.statusCode).json(response)
        return
      }
      const coinAmount = card.characterCost

      // add card to player
      const addedCardArray = gameStatus.currentPlayer.cards.concat(card)
      // set the old array with new one
      gameStatus.currentPlayer.coins -= coinAmount
      gameStatus.currentPlayer.cards = addedCardArray
      gameStatus.currentPlayer.abilities = [
        ...gameStatus.currentPlayer.abilities,
        ...card.abilities,
      ]
      gameStatus.cards.tablePile = tablePile.filter((_card) => _card.id !== card.id)
      gameService.switchPlayer()
    }

    function handleShipPurchase(card: ShipCard) {
      const coinAmount = card.shipCoins
      const primaryPile = gameStatus.cards.primaryPile
      const shuffled = [...primaryPile].sort(() => Math.random() - 0.5)

      // delete as many cards from primaryPile as the coin amount is in ship
      // e.g. if ship gives 3 coins, remove 3 cards from the deck, because they're given to the player's coin deck
      const newPrimaryPile = shuffled.slice(coinAmount)
      const newCurrentPlayerCards = shuffled.slice(0, coinAmount)

      // set the current deck to the right one
      gameStatus.cards.primaryPile = newPrimaryPile
      gameStatus.currentPlayer.coins += coinAmount
      gameStatus.currentPlayer.cards = [...gameStatus.currentPlayer.cards, ...newCurrentPlayerCards]
      gameStatus.cards.tablePile = tablePile.filter((_card) => _card.id !== card.id)
      gameService.switchPlayer()
    }

    const response: ApiResponse<GameStatus> = {
      statusCode: 200,
      message: 'Player switched successfully',
      data: gameStatus,
      errors: null,
    }
    res.status(200).json(response)
  } catch (error) {
    const response: ApiResponse<null> = {
      statusCode: 500,
      message: 'Failed to switch player',
      data: null,
      errors: [error instanceof Error ? error.message : 'Unknown error'],
    }

    res.status(500).json(response)
  }
})

export default router
