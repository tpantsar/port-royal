//jIn-memory based state management for a game
// This module handles loading and saving the game state to a runtime variable.
import allCards from '#data/cards.js'
import { Card, Cards, GameStatus, GameStatusEnum, Player } from '#types.js'

export class GameServer {
  private state: GameStatus

  constructor() {
    this.state = this.startNewGame()
  }

  get status(): GameStatus {
    return this.state
  }

  get cards(): Cards {
    return this.state.cards
  }

  get players(): Player[] {
    return this.state.players
  }

  get currentPlayer(): Player {
    return this.state.currentPlayer
  }

  set currentPlayer(player: Player) {
    this.state.currentPlayer = player
  }

  get duplicateColoredShips(): boolean {
    return this.state.duplicateColoredShips
  }

  set duplicateColoredShips(value: boolean) {
    this.state.duplicateColoredShips = value
  }

  public resetGame(): void {
    console.log('Resetting game state...')
    this.state = this.startNewGame()
  }

  private assignInitialPlayerCards(primaryPile: Card[]): [Player[], Card[]] {
    const shuffled = [...primaryPile].sort(() => Math.random() - 0.5)
    const player1Cards = shuffled.slice(0, 3)
    const player2Cards = shuffled.slice(3, 6)
    const remainingCards = shuffled.slice(6)

    const players: Player[] = [
      {
        id: 1,
        name: 'Player 1',
        score: 0,
        cards: player1Cards,
        coins: 3,
        abilities: [],
      },
      {
        id: 2,
        name: 'Player 2',
        score: 0,
        cards: player2Cards,
        coins: 3,
        abilities: [],
      },
    ]

    return [players, remainingCards]
  }

  private startNewGame(): GameStatus {
    const clonedCards = structuredClone(allCards)
    const [players, remainingPrimaryPile] = this.assignInitialPlayerCards(clonedCards as Card[])

    return {
      cards: {
        primaryPile: remainingPrimaryPile,
        tablePile: [],
        discardPile: [],
        researchPile: [],
      },
      players,
      currentPlayer: players[0],
      duplicateColoredShips: false,
      status: GameStatusEnum.IN_PROGRESS,
    }
  }
}

export const gameServer = new GameServer()
