// In-memory based state management for a game
// This module handles loading and saving the game state to a runtime variable.
import { GameStatus, GameStatusEnum, Player } from '#types.js'

// Initial test players
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

const CURRENT_PLAYER: Player = {
  id: 1,
  name: 'Player 1',
  coins: 0,
  score: 0,
  cards: [],
  abilities: [],
}

// This is the main game state that will be modified throughout the game
export const gameStatus: GameStatus = {
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
