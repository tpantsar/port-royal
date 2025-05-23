import { PORT } from '#config.js'
import gameRouter from '#routes/game.js'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { Application, Request, Response } from 'express'

//For env File
dotenv.config()

const app: Application = express()
app.use(express.json())
app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.send('Port Royal API')
})

app.get('/ping', (_req: Request, res: Response) => {
  console.log('ping received')
  res.send('pong')
})

app.use('/api/game', gameRouter)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
