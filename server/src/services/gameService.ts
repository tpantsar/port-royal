import { GameStatus } from '#types.js'
import { gameStatus } from '#utils/state.js'

const getStatus = (): GameStatus => {
  console.log('Game status:', gameStatus)
  return gameStatus
}

export default {
  getStatus,
}
