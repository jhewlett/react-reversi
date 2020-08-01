import * as Board from '../../domain/board'
import game, { GameState } from '../game.reducer'
import { Player } from '../../domain/types'
import * as gameActions from '../game.actions'

describe('game', () => {
  describe('when making a move', () => {
    let state: GameState
    beforeAll(() => {
      state = game(undefined, gameActions.makeMove(2, 3))
    })

    it('should have new game state', () => {
      const score = Board.getScore(state.board)

      expect(state.currentPlayer).toEqual(Player.Two)
      expect(score.player1).toEqual(4)
      expect(score.player2).toEqual(1)
      expect(state.boardHistory.size).toEqual(2)
    })
  })

  describe('when undoing a move', () => {
    let state: GameState
    beforeAll(() => {
      state = game(undefined, gameActions.makeMove(2, 3))
      state = game(state, gameActions.undo())
    })

    it('should have original game state', () => {
      const score = Board.getScore(state.board)

      expect(state.currentPlayer).toEqual(Player.One)
      expect(score.player1).toEqual(2)
      expect(score.player2).toEqual(2)
      expect(state.board).toEqual(Board.newGameBoard)
      expect(state.boardHistory.size).toEqual(1)
    })
  })

  describe('when undoing a pass', () => {
    let state: GameState
    beforeAll(() => {
      state = game(undefined, gameActions.switchPlayer())
      state = game(state, gameActions.undo())
    })

    it('should have original game state', () => {
      const score = Board.getScore(state.board)

      expect(state.currentPlayer).toEqual(Player.One)
      expect(score.player1).toEqual(2)
      expect(score.player2).toEqual(2)
      expect(state.board).toEqual(Board.newGameBoard)
      expect(state.boardHistory.size).toEqual(1)
    })
  })
})
