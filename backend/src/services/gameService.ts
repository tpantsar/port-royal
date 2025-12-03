import { Card, GameStatus } from '#types.js'
import { gameStatus, resetGame } from '#utils/state.js'

const getStatus = (): GameStatus => {
  return gameStatus
}

const drawCard = (): Card => {
  const primaryPileCards = gameStatus.cards.primaryPile.length

  // Shuffle discard pile if primary pile is empty
  if (primaryPileCards === 0) {
    gameStatus.cards.primaryPile = gameStatus.cards.discardPile
    gameStatus.cards.discardPile = []
    console.log('Moved discard pile into primary pile')
  }

  const randomCard = gameStatus.cards.primaryPile[Math.floor(Math.random() * primaryPileCards)]
  randomCard.displayImage = true
  console.log('Random card drawn:', randomCard)

  // Remove the drawn card from the primary pile
  gameStatus.cards.primaryPile = gameStatus.cards.primaryPile.filter(
    (card) => card.id !== randomCard.id,
  )

  // Add the drawn card to the table pile
  gameStatus.cards.tablePile.push(randomCard)

  // Check if duplicate colored ships (by name) are present in table pile
  const shipCards = gameStatus.cards.tablePile.filter(
    (card) => card.type === 'ship' && card.displayImage,
  )

  const uniqueShipNames = new Set(shipCards.map((card) => card.name))
  console.log('Unique ship names:', uniqueShipNames)

  gameStatus.duplicateColoredShips = shipCards.length !== uniqueShipNames.size

  if (gameStatus.duplicateColoredShips) {
    console.log('Duplicate colored ships found!')

    // Switch to the next player
    switchPlayer()

    // Move all table cards to discard pile
    gameStatus.cards.discardPile.push(...gameStatus.cards.tablePile)
    gameStatus.cards.tablePile = []

    // Reset duplicate colored ships status after moving cards
    gameStatus.duplicateColoredShips = false
  }

  return randomCard
}

// Reset the game state to its initial state
const resetGameState = () => {
  resetGame()
  return gameStatus
}

const switchPlayer = () => {
  const currentPlayerIndex = gameStatus.players.findIndex(
    (player) => player.id === gameStatus.currentPlayer.id,
  )

  const nextPlayerIndex = (currentPlayerIndex + 1) % gameStatus.players.length
  gameStatus.currentPlayer = gameStatus.players[nextPlayerIndex]

  console.log('Switched to player:', gameStatus.currentPlayer.name)
  return gameStatus.currentPlayer
}

export default {
  getStatus,
  drawCard,
  resetGameState,
  switchPlayer,
}
