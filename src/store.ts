import { createStore, combineReducers } from 'redux'
import game, { GameState } from './game/game.reducer'

export type State = {
  game: GameState
}

export default createStore(combineReducers({ game }))
