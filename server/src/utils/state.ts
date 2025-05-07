// In-memory based state management for a game
// This module handles loading and saving the game state to a runtime variable.
import allCards from '#data/cards.js'
import { Cards, GameStatus, GameStatusEnum, Player } from '#types.js'

const CARDS: Cards = {
  primaryPile: allCards,
  tablePile: [],
  discardPile: [],
  researchPile: [],
}

const initialPlayerCoins = 3

// Assign 3 random cards to each player at the start of the game
// Shuffle the cards and take the first 3
const assignInitialPlayerCards = () => {
  const shuffledCards = [...allCards].sort(() => Math.random() - 0.5)
  const randomCards = shuffledCards.slice(0, initialPlayerCoins)

  // Remove the assigned cards from the primary pile
  CARDS.primaryPile = CARDS.primaryPile.filter(
    (card) => !randomCards.some((assignedCard) => assignedCard.id === card.id),
  )

  return randomCards
}

// Initial test players
const PLAYERS: Player[] = [
  {
    id: 1,
    name: 'Player 1',
    score: 0,
    cards: assignInitialPlayerCards(),
    coins: initialPlayerCoins,
    abilities: [],
  },
  {
    id: 2,
    name: 'Player 2',
    score: 0,
    cards: assignInitialPlayerCards(),
    coins: initialPlayerCoins,
    abilities: [],
  },
]

// This is the main game state that will be modified throughout the game
export const gameStatus: GameStatus = {
  cards: CARDS,
  players: PLAYERS,
  currentPlayer: PLAYERS[0], // The current player is the first player in the list
  duplicateColoredShips: false,
  status: GameStatusEnum.IN_PROGRESS,
}
