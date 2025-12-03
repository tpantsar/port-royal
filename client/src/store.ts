import { configureStore } from '@reduxjs/toolkit';

import gameReducer from './reducers/gameReducer';
import snackbarReducer from './reducers/snackbarReducer';

const store = configureStore({
  reducer: {
    game: gameReducer,
    snackbars: snackbarReducer,
  },
});

// https://redux.js.org/usage/usage-with-typescript#define-root-state-and-dispatch-types
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export default store;
