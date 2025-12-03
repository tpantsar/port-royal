import { GameService } from '../services/game';
import type { AppDispatch } from '../store.ts';
import { GameStatus } from '../types/GameStatus';

import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import { openSnackbar } from './snackbarReducer';
import { parseAxiosError } from './utils.ts';

interface InitialGameState {
  game: GameStatus | null;
}

const initialState: InitialGameState = {
  game: null,
};

// https://redux.js.org/usage/usage-with-typegame#application-usage
// https://redux-toolkit.js.org/api/createSlice#customizing-generated-action-creators
const gamesSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameState(state, action: PayloadAction<GameStatus>) {
      state.game = action.payload;
    },
  },
});

export const fetchGameState = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await GameService.getGameState();
      const game: GameStatus = response.data;
      dispatch(setGameState(game));
      console.log('Fetched game state:', game);
    } catch (error: unknown) {
      const { message, status } = parseAxiosError(error);
      console.error('Fetching game state failed:', message, 'Status:', status, error);
      dispatch(
        openSnackbar({
          title: 'Error',
          message: message ?? 'Failed to fetch games',
          severity: 'error',
        }),
      );
    }
  };
};

export const drawCard = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await GameService.drawCard();
      console.debug('drawCard response:', response);
      dispatch(fetchGameState()); // Refresh game state after drawing a card
    } catch (error: unknown) {
      const { message, status } = parseAxiosError(error);
      console.error('Drawing a card failed:', message, 'Status:', status, error);
      dispatch(
        openSnackbar({
          title: 'Error',
          message: message ?? 'Failed to draw a card',
          severity: 'error',
        }),
      );
    }
  };
};

export const resetGame = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await GameService.resetGame();
      console.debug('resetGame response:', response);
      dispatch(fetchGameState()); // Refresh game state after resetting the game
    } catch (error: unknown) {
      const { message, status } = parseAxiosError(error);
      console.error('Resetting the game failed:', message, 'Status:', status, error);
      dispatch(
        openSnackbar({
          title: 'Error',
          message: message ?? 'Failed to reset the game',
          severity: 'error',
        }),
      );
    }
  };
};

export const switchPlayerTurn = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await GameService.switchPlayerTurn();
      console.debug('switchPlayerTurn response:', response);
      dispatch(fetchGameState()); // Refresh game state after switching player turn
    } catch (error: unknown) {
      const { message, status } = parseAxiosError(error);
      console.error('Switching player turn failed:', message, 'Status:', status, error);
      dispatch(
        openSnackbar({
          title: 'Error',
          message: message ?? 'Failed to switch player turn',
          severity: 'error',
        }),
      );
    }
  };
};

export const buyCard = (playerId: number, cardId: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      console.debug('buyCard called with playerId:', playerId, 'cardId:', cardId);
      const response = await GameService.buyCard({ playerId, cardId });
      console.debug('buyCard response:', response);
      dispatch(fetchGameState()); // Refresh game state after buying a card
      dispatch(
        openSnackbar({
          title: 'Success',
          message: response.message || 'Card bought successfully',
          severity: 'success',
        }),
      );
    } catch (error: unknown) {
      const { message, status } = parseAxiosError(error);
      console.error('Buying a card failed:', message, 'Status:', status, error);
      dispatch(
        openSnackbar({
          title: 'Error',
          message: message ?? 'Failed to buy the card',
          severity: 'error',
        }),
      );
    }
  };
};

export const { setGameState } = gamesSlice.actions;
export default gamesSlice.reducer;
