import { CardBase, CharacterAbility } from './Card'

export interface Player {
  id: number
  name: string
  coins: number
  score: number
  cards: CardBase[]
  abilities: CharacterAbility[]
}
