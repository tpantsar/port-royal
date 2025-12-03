import gameService from '#services/gameService.js'
import {
  ApiResponse,
  CharacterAbility,
  CharacterCard,
  GameStatus,
  ResearchCard,
  ResearchMode,
  ShipCard,
} from '#types.js'

import { gameStatus } from './state.js'

export function handleShipPurchase(card: ShipCard): ApiResponse<GameStatus | null> {
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

  const response: ApiResponse<null> = {
    statusCode: 200,
    message: 'Ship purchased successfully',
    data: null,
    errors: [],
  }
  return response
}

export function handleCharacterPurchase(card: CharacterCard): ApiResponse<GameStatus | null> {
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

  // add card to player
  const addedCardArray = currentPlayer.cards.concat(card)

  // set the old array with new one
  currentPlayer.coins -= coinAmount
  currentPlayer.cards = addedCardArray
  currentPlayer.abilities = [...currentPlayer.abilities, ...card.abilities]

  gameStatus.cards.tablePile = gameStatus.cards.tablePile.filter((_card) => _card.id !== card.id)
  gameService.switchPlayer()

  const response: ApiResponse<GameStatus> = {
    statusCode: 200,
    message: 'Card purchased successfully',
    data: gameStatus,
    errors: null,
  }
  return response
}

export function handleResearchPurchase(card: ResearchCard): ApiResponse<GameStatus | null> {
  const currentPlayer = gameStatus.currentPlayer
  const researchModes = card.researchMode

  // Count occurrences of abilities
  const countOccurrences = (arr: unknown[]): Record<string, number> =>
    arr.reduce<Record<string, number>>((acc, val) => {
      acc[val as string] = (acc[val as string] || 0) + 1
      return acc
    }, {})

  // Required abilities for this research card
  const requiredAbilityCounts = countOccurrences(card.researchMode)

  // Player's available abilities
  const playerAbilityCounts = countOccurrences(currentPlayer.abilities)

  // Check if player has enough of each required ability
  const hasAllRequiredAbilities = Object.entries(requiredAbilityCounts).every(
    ([ability, count]) => (playerAbilityCounts[ability] || 0) >= count,
  )

  if (!hasAllRequiredAbilities) {
    const response: ApiResponse<null> = {
      statusCode: 400,
      message: 'Not enough abilities to buy this card',
      data: null,
      errors: [],
    }
    return response
  }

  // Add research card to player
  currentPlayer.cards = currentPlayer.cards.concat(card)

  // Increase player score by the victory points of the research card
  currentPlayer.score += card.victoryPoints

  // Remove the abilities from the player that were used to buy the research card
  for (const mode of researchModes) {
    if (mode === ResearchMode.HOUSE) {
      currentPlayer.abilities = currentPlayer.abilities.filter(
        (ability) => ability !== CharacterAbility.HOUSE,
      )
    }
    if (mode === ResearchMode.ANCHOR) {
      currentPlayer.abilities = currentPlayer.abilities.filter(
        (ability) => ability !== CharacterAbility.ANCHOR,
      )
    }
    if (mode === ResearchMode.CROSS) {
      currentPlayer.abilities = currentPlayer.abilities.filter(
        (ability) => ability !== CharacterAbility.CROSS,
      )
    }
  }

  gameStatus.cards.tablePile = gameStatus.cards.tablePile.filter((_card) => _card.id !== card.id)
  gameService.switchPlayer()

  const response: ApiResponse<GameStatus> = {
    statusCode: 200,
    message: 'Card purchased successfully',
    data: gameStatus,
    errors: null,
  }
  return response
}
