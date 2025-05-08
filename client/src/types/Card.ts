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

type ResearchMode = 'ANCHOR' | 'CROSS' | 'HOUSE'

type TaxMode = 'LOWEST_POINTS' | 'MOST_SWORDS'

export enum CharacterAbility {
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
