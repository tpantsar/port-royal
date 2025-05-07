// Common properties for all cards
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
