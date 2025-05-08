// In-memory based state management for a game
// This module handles loading and saving the game state to a runtime variable.
import allCards from '#data/cards.js'
import { CardBase, GameStatus, GameStatusEnum, Player } from '#types.js'

// Helper to assign 3 random initial cards to each player
const assignInitialPlayerCards = (primaryPile: CardBase[]): [Player[], CardBase[]] => {
  const shuffled = [...primaryPile].sort(() => Math.random() - 0.5)
  const player1Cards = shuffled.slice(0, 3)
  const player2Cards = shuffled.slice(3, 6)
  const remainingCards = shuffled.slice(6)

  const players: Player[] = [
    {
      id: 1,
      name: 'Player 1',
      score: 0,
      cards: player1Cards,
      coins: 3,
      abilities: [],
    },
    {
      id: 2,
      name: 'Player 2',
      score: 0,
      cards: player2Cards,
      coins: 3,
      abilities: [],
    },
  ]

  return [players, remainingCards]
}

// Function to create a fresh initial game state
const createInitialGameStatus = (): GameStatus => {
  const clonedCards = structuredClone(allCards)
  const [players, remainingPrimaryPile] = assignInitialPlayerCards(clonedCards)

  return {
    cards: {
      primaryPile: remainingPrimaryPile,
      tablePile: [],
      discardPile: [],
      researchPile: [],
    },
    players,
    currentPlayer: players[0],
    duplicateColoredShips: false,
    status: GameStatusEnum.IN_PROGRESS,
  }
}

// Actual mutable game state
export let gameStatus: GameStatus = createInitialGameStatus()

// Reset function that fully restores a clean initial state
export const resetGame = () => {
  console.log('Resetting game state...')
  gameStatus = createInitialGameStatus()
}
