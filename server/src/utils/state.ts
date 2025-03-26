import { GameStatus, GameStatusEnum, Player } from '#types.js'
import fs from 'fs'
import path from 'path'

// File path for storing game state
const PATH = path.dirname(new URL(import.meta.url).pathname)
console.log('PATH', PATH)

// File path for storing game state
const STATE_FILE = path.join(PATH, '../data/state.json')
console.log('STATE_FILE', STATE_FILE)

const currentPlayer: Player = {
  id: 1,
  name: 'Player 1',
  coins: 0,
  score: 0,
  cards: [],
  abilities: [],
}

const gameStatus: GameStatus = {
  cards: {
    primaryPile: [],
    tablePile: [],
    discardPile: [],
    researchPile: [],
  },
  players: [currentPlayer],
  currentPlayer: currentPlayer,
  duplicateColoredShips: false,
  status: GameStatusEnum.IN_PROGRESS,
}

// 🌟 Function to load state from file (or initialize it if it doesn’t exist)
export const loadState = (): GameStatus => {
  if (fs.existsSync(STATE_FILE)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'))
  } else {
    return gameStatus
  }
}

// 🌟 Function to save state to file
export const saveState = (state: GameStatus) => {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf-8')
}

export const initGame = () => {
  saveState(gameStatus)
  console.log('Game state initialized')
}
