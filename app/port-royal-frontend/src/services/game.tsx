import axios from 'axios'
import { ApiResponse } from '../types/ApiResponse'
import { Card } from '../types/Card'
import { GameStatusInfoSimple } from '../types/GameStatusInfoSimple'

const baseUrl = 'api/game'

type BuyCardParams = {
  cardId: number
  playerId: number
}

const getGameState = async (): Promise<ApiResponse<GameStatusInfoSimple>> => {
  const response = await axios.get<ApiResponse<GameStatusInfoSimple>>(`${baseUrl}/state-simple`)
  return response.data
}

const drawCard = async (): Promise<ApiResponse<Card>> => {
  const response = await axios.post<ApiResponse<Card>>(`${baseUrl}/draw-card`)
  return response.data
}

const buyCard = async (params: BuyCardParams): Promise<ApiResponse<Card>> => {
  const response = await axios.post<ApiResponse<Card>>(`${baseUrl}/buy-card`, params)
  return response.data
}

export default {
  getGameState,
  drawCard,
  buyCard,
}
