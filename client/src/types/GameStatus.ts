import { CardBase } from './Card'
import { Player } from './Player'

export interface Cards {
  primaryPile: CardBase[]
  tablePile: CardBase[]
  discardPile: CardBase[]
  researchPile: CardBase[]
}

type GameStatusEnum = 'IN_PROGRESS' | 'FINISHED'

export type GameStatus = {
  players: Player[]
  cards: Cards
  currentPlayer: Player
  duplicateColoredShips: boolean
  status: GameStatusEnum
}
