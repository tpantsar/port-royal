import axios from "axios";
import { ApiResponse } from "../types/ApiResponse";
import { Card } from "../types/Card";
import { GameStatusInfoSimple } from "../types/GameStatusInfoSimple";

const baseUrl = "http://localhost:8080/api/game";
const gameStateUrl = `${baseUrl}/state-simple`;
const drawCardUrl = `${baseUrl}/draw-card`;

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

export default {
  getGameState,
  drawCard,
};
