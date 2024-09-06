import axios from "axios";
import { ApiResponse } from "../types/ApiResponse";
import { Card } from "../types/Card";
import { GameStatusInfoSimple } from "../types/GameStatusInfoSimple";

const baseUrl = "http://localhost:8080/api/game";
const gameStateUrl = `${baseUrl}/state-simple`;
const drawCardUrl = `${baseUrl}/draw-card`;
const buyCardUrl = `${baseUrl}/buy-card`;

const getGameState = async (): Promise<ApiResponse<GameStatusInfoSimple>> => {
  const response = await axios.get<ApiResponse<GameStatusInfoSimple>>(
    gameStateUrl
  );
  return response.data;
};

const drawCard = async (): Promise<ApiResponse<Card>> => {
  const response = await axios.post<ApiResponse<Card>>(drawCardUrl);
  return response.data;
};

const buyCard = async (params: BuyCardParams): Promise<ApiResponse<Card>> => {
  const response = await axios.post<ApiResponse<Card>>(buyCardUrl, params);
  return response.data;
};

type BuyCardParams = {
  cardId: number;
  playerId: number;
};

export default {
  getGameState,
  drawCard,
  buyCard,
};
