import axios from 'axios'
import { ApiResponse } from '../types/ApiResponse'
import { Card } from '../types/Card'
import { GameStatusInfo } from '../types/GameStatusInfo'
import { GameStatusInfoSimple } from '../types/GameStatusInfoSimple'
import { Player } from '../types/Player'

const baseUrl = 'api/game'

type BuyCardRequest = {
  playerId: number
  cardId: number
}

const getGameStateFull = async (): Promise<ApiResponse<GameStatusInfo>> => {
  const response = await axios.get<ApiResponse<GameStatusInfo>>(`${baseUrl}/state-full`)
  return response.data
}

const getGameStateSimple = async (): Promise<ApiResponse<GameStatusInfoSimple>> => {
  const response = await axios.get<ApiResponse<GameStatusInfoSimple>>(`${baseUrl}/state-simple`)
  return response.data
}

const resetGame = async (): Promise<ApiResponse<string>> => {
  const response = await axios.get<ApiResponse<string>>(`${baseUrl}/reset`)
  return response.data
}

const switchPlayerTurn = async (): Promise<ApiResponse<Player>> => {
  const response = await axios.get<ApiResponse<Player>>(`${baseUrl}/switch-player`)
  return response.data
}

const drawCard = async (): Promise<ApiResponse<Card>> => {
  const response = await axios.get<ApiResponse<Card>>(`${baseUrl}/draw-card`)
  return response.data
}

const buyCard = async (body: BuyCardRequest): Promise<ApiResponse<Card>> => {
  const response = await axios.post<ApiResponse<Card>>(`${baseUrl}/buy-card`, body)
  return response.data
}

export default {
  getGameStateFull,
  getGameStateSimple,
  resetGame,
  switchPlayerTurn,
  drawCard,
  buyCard,
}
