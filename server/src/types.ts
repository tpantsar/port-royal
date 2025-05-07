enum ResearchMode {
  ANCHOR,
  CROSS,
  HOUSE,
}

enum TaxMode {
  LOWEST_POINTS,
  MOST_SWORDS,
}

enum CharacterAbility {
  FIVE_CARDS = 'FIVE_CARDS',
  ONE_CHEAPER = 'ONE_CHEAPER',
  BOARD_EMPTY = 'BOARD_EMPTY',
  EXTRA_CARD = 'EXTRA_CARD',
  EXTRA_COIN_SKIFF = 'EXTRA_COIN_SKIFF',
  EXTRA_COIN_FLUTE = 'EXTRA_COIN_FLUTE',
  EXTRA_COIN_FRIGATE = 'EXTRA_COIN_FRIGATE',
  EXTRA_COIN_GALLEON = 'EXTRA_COIN_GALLEON',
  EXTRA_COIN_PINANCE = 'EXTRA_COIN_PINANCE',

  // For destroying ships
  SWORDS = 'SWORDS',

  // For buying research cards
  HOUSE = 'HOUSE',
  ANCHOR = 'ANCHOR',
  CROSS = 'CROSS',
}

export interface CardBase {
  id: number
  name: string
  displayImage: boolean
  imageName: string
}

export interface CharacterCard extends CardBase {
  victoryPoints: number
  characterCost: number
  abilities: CharacterAbility[]
  type: 'character'
}

export interface ResearchCard extends CardBase {
  victoryPoints: number
  researchMode: ResearchMode
  coinsAmount: number
  type: 'research'
}

export interface ShipCard extends CardBase {
  shipWeapons: number
  shipCoins: number
  type: 'ship'
}

export interface TaxCard extends CardBase {
  taxMode: TaxMode
  type: 'tax'
}

export interface Cards {
  primaryPile: CardBase[]
  tablePile: CardBase[]
  discardPile: CardBase[]
  researchPile: CardBase[]
}

export interface Player {
  id: number
  name: string
  coins: number
  score: number
  cards: CardBase[]
  abilities: CharacterAbility[]
}

export enum GameStatusEnum {
  IN_PROGRESS,
  FINISHED,
}

// Game status for handling all game logic and state
// This is the main game state that will be modified throughout the game
// It contains all the information about the game, including the players, cards, and current player
export interface GameStatus {
  cards: Cards
  players: Player[]
  currentPlayer: Player
  duplicateColoredShips: boolean
  status: GameStatusEnum
}
