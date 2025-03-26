import gameService from '#services/gameService.js'
import express, { Request, Response } from 'express'

const router = express.Router()

router.get('/status', (_req: Request, res: Response) => {
  res.json(gameService.getStatus())
})

export default router
