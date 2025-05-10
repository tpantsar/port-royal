import gameService from '#services/gameService.js'
import { ApiResponse, BuyCardRequest, Card, GameStatus, Player } from '#types.js'
import { handleCharacterPurchase, handleShipPurchase } from '#utils/common.js'
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

router.post(
  '/buy',
  (
    req: Request<unknown, unknown, BuyCardRequest>,
    res: Response<ApiResponse<GameStatus | null>>,
  ) => {
    const { playerId, cardId } = req.body
    const currentPlayer = gameStatus.currentPlayer

    console.log('Player ID:', playerId)
    console.log('Card ID:', cardId)
    console.log('Current Player ID:', currentPlayer.id)

    try {
      let cardBeingBought: Card | null = null
      const tablePile = gameStatus.cards.tablePile

      for (const card of tablePile) {
        if (card.id === cardId) {
          cardBeingBought = card
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

      const invalidBuyResponse: ApiResponse<null> = {
        statusCode: 400,
        message: 'You cannot buy that card',
        data: null,
        errors: [],
      }

      switch (cardBeingBought.type) {
        case 'research':
        case 'tax': {
          res.status(invalidBuyResponse.statusCode).json(invalidBuyResponse)
          return
        }
        case 'character':
          handleCharacterPurchase(cardBeingBought)
          break
        case 'ship':
          handleShipPurchase(cardBeingBought)
          break
        default: {
          res.status(invalidBuyResponse.statusCode).json(invalidBuyResponse)
          return
        }
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
  },
)

export default router
