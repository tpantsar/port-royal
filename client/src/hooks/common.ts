import type { AppDispatch, RootState } from '../store';

import { useDispatch, useSelector } from 'react-redux';

// https://redux.js.org/usage/usage-with-typescript#define-typed-hooks
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
