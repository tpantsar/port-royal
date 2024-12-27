import { Card } from './Card'
import { GameStatus } from './GameStatus'
import { Player } from './Player'

type Cards = {
  primaryPile: Card[]
  tablePile: Card[]
  discardPile: Card[]
  researchPile: Card[]
}

export type GameStatusInfo = {
  players: Player[]
  cards: Cards
  currentPlayer: Player
  duplicateColoredShips: boolean
  status: GameStatus
}
