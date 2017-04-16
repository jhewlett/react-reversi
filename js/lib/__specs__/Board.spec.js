var expect = require('chai').expect

var Board = require('../Board')
var getStatus = Board.getStatus
var canMakeMove = Board.canMakeMove
var makeMove = Board.makeMove
var setCell = Board.setCell

var Player = require('../Player')
var board = Board.newGameBoard

describe('Board', function() {
  it('should initialize the board', function() {
    expect(getStatus(board, 3, 4)).to.equal(Player.One)
    expect(getStatus(board, 4, 3)).to.equal(Player.One)

    expect(getStatus(board, 3, 3)).to.equal(Player.Two)
    expect(getStatus(board, 4, 4)).to.equal(Player.Two)

    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        if ((i < 3 || i > 4) && (j < 3 || j > 4)) {
          expect(getStatus(board, i, j)).to.equal(Player.None)
        }
      }
    }
  })
})

describe('canMakeMove', function() {
  it('should return true for valid move', function() {
    expect(canMakeMove(board, 2, 3, Player.One)).to.equal(true)
  })

  it('should return false for invalid move', function() {
    expect(canMakeMove(board, 2, 3, Player.Two)).to.equal(false)
  })
})

describe('makeMove', function() {
  describe('valid position with right player', function() {
    var newBoard
    var valid
    beforeEach(function() {
      valid = canMakeMove(board, 2, 3, Player.One)
      newBoard = makeMove(board, 2, 3, Player.One)
    })

    it('should toggle the selected cell', function() {
      expect(getStatus(newBoard, 2, 3)).to.equal(Player.One)
    })

    it('should toggle the cells in between', function() {
      expect(getStatus(newBoard, 3, 3)).to.equal(Player.One)
    })

    it('should return true', function() {
      expect(valid).to.equal(true)
    })
  })

  describe('valid position with wrong player', function() {
    var newBoard
    var valid
    beforeEach(function() {
      valid = canMakeMove(board, 2, 3, Player.Two)
      newBoard = makeMove(board, 2, 3, Player.Two)
    })

    it('should NOT toggle the selected cell', function() {
      expect(newBoard).to.equal(board)
    })

    it('should return false', function() {
      expect(valid).to.equal(false)
    })
  })

  describe('toggling a cell that does not surround a row', function() {
    var newBoard
    var board2
    beforeEach(function() {
      board2 = setCell(board, 1, 1, Player.One)

      newBoard = makeMove(board2, 2, 1, Player.Two)
    })

    it('should NOT toggle the selected cell', function() {
      expect(newBoard).to.equal(board2)
    })
  })

  describe('toggling a cell with an empty space on the end', function() {
    var newBoard
    var board2
    beforeEach(function() {
      board2 = setCell(board, 0, 0, Player.One)
      board2 = setCell(board2, 0, 2, Player.Two)
      board2 = setCell(board2, 0, 3, Player.Two)

      newBoard = makeMove(board2, 0, 4, Player.One)
    })

    it('should NOT toggle any cells', function() {
      expect(newBoard).to.equal(board2)
    })
  })

  describe('can capture in all directions in one turn', function() {
    var newBoard
    beforeEach(function() {
      var board2 = setCell(board, 0, 0, Player.One)
      board2 = setCell(board2, 0, 2, Player.One)
      board2 = setCell(board2, 0, 4, Player.One)
      board2 = setCell(board2, 4, 0, Player.One)
      board2 = setCell(board2, 4, 4, Player.One)

      board2 = setCell(board2, 1, 1, Player.Two)
      board2 = setCell(board2, 3, 3, Player.Two)
      board2 = setCell(board2, 3, 1, Player.Two)
      board2 = setCell(board2, 1, 3, Player.Two)

      board2 = setCell(board2, 1, 2, Player.Two)
      board2 = setCell(board2, 2, 0, Player.One)
      board2 = setCell(board2, 2, 1, Player.Two)
      board2 = setCell(board2, 2, 3, Player.Two)
      board2 = setCell(board2, 2, 4, Player.One)
      board2 = setCell(board2, 3, 2, Player.Two)
      board2 = setCell(board2, 4, 2, Player.One)

      newBoard = makeMove(board2, 2, 2, Player.One)
    })

    it('should capture all the correct cells', function() {
      expect(getStatus(newBoard, 1, 2)).to.equal(Player.One)
      expect(getStatus(newBoard, 2, 1)).to.equal(Player.One)
      expect(getStatus(newBoard, 2, 3)).to.equal(Player.One)
      expect(getStatus(newBoard, 3, 2)).to.equal(Player.One)
      expect(getStatus(newBoard, 1, 1)).to.equal(Player.One)
      expect(getStatus(newBoard, 3, 1)).to.equal(Player.One)
      expect(getStatus(newBoard, 1, 3)).to.equal(Player.One)
      expect(getStatus(newBoard, 3, 3)).to.equal(Player.One)
      expect(getStatus(newBoard, 2, 2)).to.equal(Player.One)
    })
  })

  describe('When trying to toggle an occupied cell', function() {
    var newBoard
    var board2
    beforeEach(function() {
      board2 = setCell(board, 2, 3, Player.One)

      newBoard = makeMove(board2, 2, 3, Player.Two)
    })

    it('should not toggle the cell', function() {
      expect(newBoard).to.equal(board2)
    })
  })
})
