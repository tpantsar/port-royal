import { ApiResponse } from '../types/ApiResponse';
import { Card } from '../types/Card';
import { GameStatus } from '../types/GameStatus';
import { Player } from '../types/Player';

import { axiosClient } from './apiClient';

type BuyCardRequest = {
  playerId: number;
  cardId: number;
};

const baseUrl = '/game';

export class GameService {
  public static getGameState = async (): Promise<ApiResponse<GameStatus>> => {
    const response = await axiosClient.get(`${baseUrl}/status`);
    return response.data;
  };

  public static resetGame = async (): Promise<ApiResponse<GameStatus>> => {
    const response = await axiosClient.get(`${baseUrl}/reset`);
    return response.data;
  };

  public static switchPlayerTurn = async (): Promise<ApiResponse<Player>> => {
    const response = await axiosClient.get(`${baseUrl}/switch`);
    return response.data;
  };

  public static drawCard = async (): Promise<ApiResponse<Card>> => {
    const response = await axiosClient.get(`${baseUrl}/draw`);
    return response.data;
  };

  public static buyCard = async (body: BuyCardRequest): Promise<ApiResponse<Card>> => {
    const response = await axiosClient.post(`${baseUrl}/buy`, body);
    return response.data;
  };
}
