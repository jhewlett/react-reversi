import { createStore, combineReducers } from 'redux'
import game from './reducers/game'

export default createStore(combineReducers({ game }))
