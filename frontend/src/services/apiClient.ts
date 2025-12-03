import { VITE_API_URL } from '../config.ts';

import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
