import { GameStatus, GameStatusEnum, Player } from '#types.js'
import fs from 'fs'
import path from 'path'

// File-based state management for a game
// This module handles loading and saving the game state to a JSON file.

// File path for storing game state
const PATH = path.dirname(new URL(import.meta.url).pathname)
console.log('PATH', PATH)

// File path for storing game state
const STATE_FILE = path.join(PATH, '../data/state.json')
console.log('STATE_FILE', STATE_FILE)

const PLAYERS: Player[] = [
  {
    id: 1,
    name: 'Player 1',
    coins: 0,
    score: 0,
    cards: [],
    abilities: [],
  },
  {
    id: 2,
    name: 'Player 2',
    coins: 0,
    score: 0,
    cards: [],
    abilities: [],
  },
]

// Initial test player
const CURRENT_PLAYER: Player = {
  id: 1,
  name: 'Player 1',
  coins: 0,
  score: 0,
  cards: [],
  abilities: [],
}

// This is the main game state that will be modified throughout the game
const gameStatus: GameStatus = {
  cards: {
    primaryPile: [],
    tablePile: [],
    discardPile: [],
    researchPile: [],
  },
  players: PLAYERS,
  currentPlayer: CURRENT_PLAYER,
  duplicateColoredShips: false,
  status: GameStatusEnum.IN_PROGRESS,
}

// Load state from file (or initialize it if it doesn’t exist)
export const loadState = (): GameStatus => {
  if (fs.existsSync(STATE_FILE)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'))
  } else {
    return gameStatus
  }
}

// Save state to file
export const saveState = (state: GameStatus) => {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf-8')
}

export const initGame = () => {
  saveState(gameStatus)
  console.log('Game state initialized')
}
