import { CharacterAbility, ResearchCard, ResearchMode } from '#types.js'
import { handleResearchPurchase } from '#utils/common.js'
import { GameServer } from '#utils/state.js'
import { describe, expect, it } from 'vitest'

describe('handleResearchPurchase', () => {
  it('should buy research card with enough abilities', () => {
    // Initial game status
    const gameServer = new GameServer()
    gameServer.resetGame()

    // Mock current player abilities
    gameServer.currentPlayer.abilities = [
      CharacterAbility.ANCHOR,
      CharacterAbility.ANCHOR,
      CharacterAbility.HOUSE,
    ]
    gameServer.currentPlayer.cards = []

    const researchCard: ResearchCard = {
      id: 118,
      type: 'research',
      name: 'Research',
      displayImage: false,
      researchMode: [ResearchMode.ANCHOR, ResearchMode.ANCHOR, ResearchMode.HOUSE],
      coinsAmount: 3,
      victoryPoints: 6,
      imageName: 'research_4.png',
    }

    const response = handleResearchPurchase(researchCard)

    expect(response).toBeDefined()
    expect(response.statusCode).toBe(200)
    expect(response.message).toBe('Card purchased successfully')

    const data = response.data

    expect(data).toBeDefined()
    console.log(data?.currentPlayer.cards)
    //expect(data?.currentPlayer.cards).toContainEqual(researchCard)
    expect(data?.currentPlayer.abilities).toStrictEqual([])
    expect(data?.currentPlayer.score).toBe(6)
  })
})
