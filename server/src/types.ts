// Generic ApiResponse type that will be used to define the response structure of all API calls
export interface ApiResponse<T> {
  data: T // The generic type that will be replaced with specific data types
  statusCode: number
  message?: string
  errors?: string[] | null
}

export interface BuyCardRequest {
  playerId: number
  cardId: number
}

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

export type CardType = 'character' | 'research' | 'ship' | 'tax'

// Union type for all cards
export type Card = CharacterCard | ResearchCard | ShipCard | TaxCard

export interface CardBase {
  id: number
  type: CardType
  name: string
  displayImage: boolean
  imageName: string
}

// Specific cards are defined using narrowed type values
export interface CharacterCard extends CardBase {
  type: 'character'
  victoryPoints: number
  characterCost: number
  abilities: CharacterAbility[]
}

export interface ResearchCard extends CardBase {
  type: 'research'
  victoryPoints: number
  researchMode: ResearchMode
  coinsAmount: number
}

export interface ShipCard extends CardBase {
  type: 'ship'
  shipWeapons: number
  shipCoins: number
}

export interface TaxCard extends CardBase {
  type: 'tax'
  taxMode: TaxMode
}

export interface Cards {
  primaryPile: Card[]
  tablePile: Card[]
  discardPile: Card[]
  researchPile: Card[]
}

export interface Player {
  id: number
  name: string
  coins: number
  score: number
  cards: Card[]
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
