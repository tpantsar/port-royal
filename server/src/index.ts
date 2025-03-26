import cors from 'cors'
import dotenv from 'dotenv'
import express, { Application, Request, Response } from 'express'

//For env File
dotenv.config()

const app: Application = express()
app.use(express.json())
app.use(cors())

const port = process.env.PORT ?? '3000'

app.get('/', (req: Request, res: Response) => {
  res.send('Port Royal API')
})

app.get('/api/ping', (_req: Request, res: Response) => {
  console.log('ping received')
  res.send('pong')
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
