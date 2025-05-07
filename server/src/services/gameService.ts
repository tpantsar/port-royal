import { CardBase, GameStatus } from '#types.js'
import { gameStatus, resetGame } from '#utils/state.js'

const getStatus = (): GameStatus => {
  return gameStatus
}

const drawCard = (): CardBase => {
  const primaryPile = gameStatus.cards.primaryPile.length

  // Shuffle discard pile if primary pile is empty
  if (primaryPile === 0) {
    gameStatus.cards.primaryPile = gameStatus.cards.discardPile
    gameStatus.cards.discardPile = []
  }

  const randomCard = gameStatus.cards.primaryPile[Math.floor(Math.random() * primaryPile)]
  console.log('Draw card:', randomCard)

  // Remove the drawn card from the primary pile
  gameStatus.cards.primaryPile = gameStatus.cards.primaryPile.filter(
    (card) => card.id !== randomCard.id,
  )

  // Add the drawn card to the table pile
  gameStatus.cards.tablePile.push(randomCard)

  return randomCard
}

// Reset the game state to its initial state
const resetGameState = () => {
  resetGame()
  return gameStatus
}

export default {
  getStatus,
  drawCard,
  resetGameState,
}
