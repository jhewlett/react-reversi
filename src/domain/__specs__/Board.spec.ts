import * as Board from '../board'

import { Player, Row, Col, GameBoard } from '../types'

const board = Board.newGameBoard

describe('Board', function() {
  it('should initialize the board', function() {
    expect(Board.getStatus(board, 3, 4)).toEqual(Player.One)
    expect(Board.getStatus(board, 4, 3)).toEqual(Player.One)

    expect(Board.getStatus(board, 3, 3)).toEqual(Player.Two)
    expect(Board.getStatus(board, 4, 4)).toEqual(Player.Two)

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if ((i < 3 || i > 4) && (j < 3 || j > 4)) {
          expect(Board.getStatus(board, i as Row, j as Col)).toEqual(Player.None)
        }
      }
    }
  })
})

describe('canMakeMove', function() {
  it('should return true for valid move', function() {
    expect(Board.canMakeMove(board, 2, 3, Player.One)).toEqual(true)
  })

  it('should return false for invalid move', function() {
    expect(Board.canMakeMove(board, 2, 3, Player.Two)).toEqual(false)
  })
})

describe('makeMove', function() {
  describe('valid position with right player', function() {
    let newBoard: GameBoard
    let valid: boolean
    beforeEach(function() {
      valid = Board.canMakeMove(board, 2, 3, Player.One)
      newBoard = Board.makeMove(board, 2, 3, Player.One)
    })

    it('should toggle the selected cell', function() {
      expect(Board.getStatus(newBoard, 2, 3)).toEqual(Player.One)
    })

    it('should toggle the cells in between', function() {
      expect(Board.getStatus(newBoard, 3, 3)).toEqual(Player.One)
    })

    it('should return true', function() {
      expect(valid).toEqual(true)
    })
  })

  describe('valid position with wrong player', function() {
    let newBoard: GameBoard
    let valid: boolean
    beforeEach(function() {
      valid = Board.canMakeMove(board, 2, 3, Player.Two)
      newBoard = Board.makeMove(board, 2, 3, Player.Two)
    })

    it('should NOT toggle the selected cell', function() {
      expect(newBoard).toEqual(board)
    })

    it('should return false', function() {
      expect(valid).toEqual(false)
    })
  })

  describe('toggling a cell that does not surround a row', function() {
    let newBoard: GameBoard
    let board2: GameBoard
    beforeEach(function() {
      board2 = Board.setCell(board, 1, 1, Player.One)

      newBoard = Board.makeMove(board2, 2, 1, Player.Two)
    })

    it('should NOT toggle the selected cell', function() {
      expect(newBoard).toEqual(board2)
    })
  })

  describe('toggling a cell with an empty space on the end', function() {
    let newBoard: GameBoard
    let board2: GameBoard
    beforeEach(function() {
      board2 = Board.setCell(board, 0, 0, Player.One)
      board2 = Board.setCell(board2, 0, 2, Player.Two)
      board2 = Board.setCell(board2, 0, 3, Player.Two)

      newBoard = Board.makeMove(board2, 0, 4, Player.One)
    })

    it('should NOT toggle any cells', function() {
      expect(newBoard).toEqual(board2)
    })
  })

  describe('can capture in all directions in one turn', function() {
    let newBoard: GameBoard

    beforeEach(function() {
      let board2 = Board.setCell(board, 0, 0, Player.One)
      board2 = Board.setCell(board2, 0, 2, Player.One)
      board2 = Board.setCell(board2, 0, 4, Player.One)
      board2 = Board.setCell(board2, 4, 0, Player.One)
      board2 = Board.setCell(board2, 4, 4, Player.One)

      board2 = Board.setCell(board2, 1, 1, Player.Two)
      board2 = Board.setCell(board2, 3, 3, Player.Two)
      board2 = Board.setCell(board2, 3, 1, Player.Two)
      board2 = Board.setCell(board2, 1, 3, Player.Two)

      board2 = Board.setCell(board2, 1, 2, Player.Two)
      board2 = Board.setCell(board2, 2, 0, Player.One)
      board2 = Board.setCell(board2, 2, 1, Player.Two)
      board2 = Board.setCell(board2, 2, 3, Player.Two)
      board2 = Board.setCell(board2, 2, 4, Player.One)
      board2 = Board.setCell(board2, 3, 2, Player.Two)
      board2 = Board.setCell(board2, 4, 2, Player.One)

      newBoard = Board.makeMove(board2, 2, 2, Player.One)
    })

    it('should capture all the correct cells', function() {
      expect(Board.getStatus(newBoard, 1, 2)).toEqual(Player.One)
      expect(Board.getStatus(newBoard, 2, 1)).toEqual(Player.One)
      expect(Board.getStatus(newBoard, 2, 3)).toEqual(Player.One)
      expect(Board.getStatus(newBoard, 3, 2)).toEqual(Player.One)
      expect(Board.getStatus(newBoard, 1, 1)).toEqual(Player.One)
      expect(Board.getStatus(newBoard, 3, 1)).toEqual(Player.One)
      expect(Board.getStatus(newBoard, 1, 3)).toEqual(Player.One)
      expect(Board.getStatus(newBoard, 3, 3)).toEqual(Player.One)
      expect(Board.getStatus(newBoard, 2, 2)).toEqual(Player.One)
    })
  })

  describe('When trying to toggle an occupied cell', function() {
    let newBoard: GameBoard
    let board2: GameBoard

    beforeEach(function() {
      board2 = Board.setCell(board, 2, 3, Player.One)

      newBoard = Board.makeMove(board2, 2, 3, Player.Two)
    })

    it('should not toggle the cell', function() {
      expect(newBoard).toEqual(board2)
    })
  })
})
