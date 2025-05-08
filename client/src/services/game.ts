import axios from 'axios'
import { ApiResponse } from '../types/ApiResponse'
import { CardBase } from '../types/Card'
import { GameStatus } from '../types/GameStatus'
import { Player } from '../types/Player'

const baseUrl = 'api/game'

type BuyCardRequest = {
  playerId: number
  cardId: number
}

const getGameState = async (): Promise<ApiResponse<GameStatus>> => {
  const response = await axios.get(`${baseUrl}/status`)
  return response.data
}

const resetGame = async (): Promise<ApiResponse<GameStatus>> => {
  const response = await axios.get(`${baseUrl}/reset`)
  return response.data
}

const switchPlayerTurn = async (): Promise<ApiResponse<Player>> => {
  const response = await axios.get(`${baseUrl}/switch`)
  return response.data
}

const drawCard = async (): Promise<ApiResponse<CardBase>> => {
  const response = await axios.get(`${baseUrl}/draw`)
  return response.data
}

const buyCard = async (body: BuyCardRequest): Promise<ApiResponse<CardBase>> => {
  const response = await axios.post(`${baseUrl}/buy`, body)
  return response.data
}

export default {
  getGameState,
  resetGame,
  switchPlayerTurn,
  drawCard,
  buyCard,
}
