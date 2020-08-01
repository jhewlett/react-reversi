import { State } from '../store'
import * as Board from '../domain/board'

export function getGame(state: State) {
    const { game } = state
    const score = Board.getScore(game.board)
  
    return {
      score,
      ...game
    }
  }
  