import { expect } from 'chai'

import { newGameBoard, default as Board } from '../../lib/Board'
import { newGame, default as game } from '../game'
import Player from '../../lib/Player'
import * as gameActions from '../../actions/gameActions'

describe('game', () => {
  describe('when making a move', () => {
    let state
    before(() => {
      state = game(undefined, gameActions.makeMove(2, 3))
    })

    it('should have new game state', () => {
      const score = Board.getScore(state.board)

      expect(state.currentPlayer).to.equal(Player.Two)
      expect(score.player1).to.equal(4)
      expect(score.player2).to.equal(1)
      expect(state.boardHistory.size).to.equal(2)
    })
  })

  describe('when undoing a move', () => {
    let state
    before(() => {
      state = game(undefined, gameActions.makeMove(2, 3))
      state = game(state, gameActions.undo())
    })

    it('should have original game state', () => {
      const score = Board.getScore(state.board)

      expect(state.currentPlayer).to.equal(Player.One)
      expect(score.player1).to.equal(2)
      expect(score.player2).to.equal(2)
      expect(state.board).to.equal(newGameBoard)
      expect(state.boardHistory.size).to.equal(1)
    })
  })

  describe('when undoing a pass', () => {
    let state
    before(() => {
      state = game(undefined, gameActions.switchPlayer())
      state = game(state, gameActions.undo())
    })

    it('should have original game state', () => {
      const score = Board.getScore(state.board)

      expect(state.currentPlayer).to.equal(Player.One)
      expect(score.player1).to.equal(2)
      expect(score.player2).to.equal(2)
      expect(state.board).to.equal(newGameBoard)
      expect(state.boardHistory.size).to.equal(1)
    })
  })
})
