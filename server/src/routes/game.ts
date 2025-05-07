import gameService from '#services/gameService.js'
import { ApiResponse, GameStatus } from '#types.js'
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

export default router
