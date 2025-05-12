import gameService from '#services/gameService.js'
import { ApiResponse, Card, CharacterCard, ShipCard } from '#types.js'

import { gameStatus } from './state.js'

export function handleShipPurchase(card: ShipCard) {
  const coinAmount = card.shipCoins
  const primaryPile = gameStatus.cards.primaryPile
  const shuffled = [...primaryPile].sort(() => Math.random() - 0.5)
  const currentPlayer = gameStatus.currentPlayer

  // delete as many cards from primaryPile as the coin amount is in ship
  // e.g. if ship gives 3 coins, remove 3 cards from the deck, because they're given to the player's coin deck
  const newPrimaryPile = shuffled.slice(coinAmount)
  const newCurrentPlayerCards = shuffled.slice(0, coinAmount)

  // set the current deck to the right one
  gameStatus.cards.primaryPile = newPrimaryPile
  currentPlayer.coins += coinAmount
  currentPlayer.cards = currentPlayer.cards.concat(newCurrentPlayerCards)

  gameStatus.cards.tablePile = gameStatus.cards.tablePile.filter((_card) => _card.id !== card.id)
  gameService.switchPlayer()
}

export function handleCharacterPurchase(card: CharacterCard) {
  const currentPlayer = gameStatus.currentPlayer
  const characterCost = card.characterCost

  if (characterCost > currentPlayer.coins) {
    const response: ApiResponse<null> = {
      statusCode: 400,
      message: 'Not enough coins',
      data: null,
      errors: [],
    }
    return response
  }

  const coinAmount = characterCost

  // remove face-down cards
  let removedCards: Card[] = []
  const cardsAfterPurchase = currentPlayer.cards.filter((_card) => {
    if (!_card.displayImage && removedCards.length !== coinAmount) {
      removedCards = [...removedCards, _card]
      return false
    }
    return true
  })
  // add card to array
  const newCurrentPlayerCards = cardsAfterPurchase.concat(card)

  // add removed cards to discard pile
  gameStatus.cards.discardPile = [...gameStatus.cards.discardPile, ...removedCards]

  currentPlayer.coins -= coinAmount
  currentPlayer.cards = newCurrentPlayerCards
  currentPlayer.abilities = [...currentPlayer.abilities, ...card.abilities]

  gameStatus.cards.tablePile = gameStatus.cards.tablePile.filter((_card) => _card.id !== card.id)
  gameService.switchPlayer()
}
