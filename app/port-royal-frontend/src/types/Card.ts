import { CharacterAbility } from './CharacterAbility'

export type Card = {
  // All cards
  id: number
  name: string
  type: string
  displayImage: boolean
  imageName: string

  // Character and researh cards
  victoryPoints: number

  // Character cards
  characterCost: number
  abilities: CharacterAbility[]

  // Research cards
  researchMode: ResearchMode[]
  coinsAmount: number

  // Ship cards
  shipWeapons: number
  shipCoins: number

  // Tax cards
  taxMode: TaxMode
}

type ResearchMode = 'ANCHOR' | 'CROSS' | 'HOUSE'

type TaxMode = 'LOWEST_POINTS' | 'MOST_SWORDS'
