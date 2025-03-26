import { GameStatus } from '#types.js'
import { loadState } from '#utils/state.js'

const getStatus = (): GameStatus => {
  const gameStatus: GameStatus = loadState()
  console.log('Game status:', gameStatus)
  return gameStatus
}

export default {
  getStatus,
}
