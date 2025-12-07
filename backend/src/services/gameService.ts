import { Card } from '#types.js'
import { gameServer } from '#utils/state.js'

const switchPlayer = () => {
  const players = gameServer.players
  const currentPlayer = gameServer.currentPlayer

  const currentPlayerIndex = players.findIndex((player) => player.id === currentPlayer.id)

  const nextPlayerIndex = (currentPlayerIndex + 1) % players.length
  gameServer.currentPlayer = players[nextPlayerIndex]

  console.log('Switched to player:', gameServer.currentPlayer.name)
  return gameServer.currentPlayer
}

const drawCard = (): Card => {
  const cards = gameServer.cards
  let primaryPileCards = cards.primaryPile.length

  // Shuffle discard pile if primary pile is empty
  if (primaryPileCards === 0) {
    cards.primaryPile = cards.discardPile
    cards.discardPile = []
    primaryPileCards = cards.primaryPile.length
    console.log('Moved discard pile into primary pile')
  }

  const randomCard = cards.primaryPile[Math.floor(Math.random() * primaryPileCards)]
  randomCard.displayImage = true
  console.log('Random card drawn:', randomCard)

  // Remove the drawn card from the primary pile
  cards.primaryPile = cards.primaryPile.filter((card) => card.id !== randomCard.id)

  // Add to research pile if it's a research card
  if (randomCard.type === 'research') {
    cards.researchPile.push(randomCard)
  } else {
    // Otherwise, add to table pile
    cards.tablePile.push(randomCard)
  }

  // Check if duplicate colored ships (by name) are present in table pile
  const shipCards = cards.tablePile.filter((card) => card.type === 'ship' && card.displayImage)

  const uniqueShipNames = new Set(shipCards.map((card) => card.name))
  console.log('Unique ship names:', uniqueShipNames)

  gameServer.duplicateColoredShips = shipCards.length !== uniqueShipNames.size

  if (gameServer.duplicateColoredShips) {
    console.log('Duplicate colored ships found!')

    // Switch to the next player
    switchPlayer()

    // Move all table cards to discard pile
    cards.discardPile.push(...cards.tablePile)
    cards.tablePile = []

    // Reset duplicate colored ships status after moving cards
    gameServer.duplicateColoredShips = false
  }

  return randomCard
}

export const GameService = {
  drawCard,
  switchPlayer,
}

export default GameService
