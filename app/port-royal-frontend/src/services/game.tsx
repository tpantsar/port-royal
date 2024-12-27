import axios from 'axios'
import { ApiResponse } from '../types/ApiResponse'
import { Card } from '../types/Card'
import { GameStatusInfoSimple } from '../types/GameStatusInfoSimple'

const baseUrl = 'api/game'

type BuyCardRequest = {
  playerId: number
  cardId: number
}

const getGameStateSimple = async (): Promise<ApiResponse<GameStatusInfoSimple>> => {
  const response = await axios.get<ApiResponse<GameStatusInfoSimple>>(`${baseUrl}/state-simple`)
  return response.data
}

const resetGame = async (): Promise<ApiResponse<string>> => {
  const response = await axios.get<ApiResponse<string>>(`${baseUrl}/reset`)
  return response.data
}

const drawCard = async (): Promise<ApiResponse<Card>> => {
  const response = await axios.post<ApiResponse<Card>>(`${baseUrl}/draw-card`)
  return response.data
}

const buyCard = async (body: BuyCardRequest): Promise<ApiResponse<Card>> => {
  const response = await axios.post<ApiResponse<Card>>(`${baseUrl}/buy-card`, body)
  return response.data
}

export default {
  getGameStateSimple,
  resetGame,
  drawCard,
  buyCard,
}
