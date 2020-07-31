import { List } from 'immutable'

import directions from './direction'
import { Player, Row, Col, CellOwner, GameBoard, Score } from './types'

const _directions = directions()

export function makeMove(board: GameBoard, i: Row, j: Col, color: CellOwner) : GameBoard {
  if (getStatus(board, i, j) !== Player.None) return board

  function makeMoveInAllDirections(board: GameBoard, directions: typeof _directions) : GameBoard {
    if (!directions.length) return board

    const head = directions[0]
    const tail = directions.slice(1)

    if (surroundsOppositePlayer(board, i, j, color, head)) {
      const boardWithMove = colorCapturedCells(board, i, j, color, head)

      return makeMoveInAllDirections(boardWithMove, tail)
    }

    return makeMoveInAllDirections(board, tail)
  }

  return makeMoveInAllDirections(board, _directions)
}

function colorCapturedCells(board: GameBoard, i: Row, j: Col, color: CellOwner, direction: typeof _directions[number]) : GameBoard {
  const boardWithMove = setCell(board, i, j, color)

  const next = direction.getNext(i, j)

  if (!next || getStatus(boardWithMove, next.row, next.col) === color) {
    return boardWithMove
  }

  return colorCapturedCells(boardWithMove, next.row, next.col, color, direction)
}

export function canMakeMove(board: GameBoard, i: Row, j: Col, color: CellOwner) : boolean {
  return (
    getStatus(board, i, j) === Player.None &&
    _directions.some(d => surroundsOppositePlayer(board, i, j, color, d))
  )
}

function surroundsOppositePlayer(board: GameBoard, i: Row, j: Col, color: CellOwner, direction: typeof _directions[number]) : boolean {
  const oppositeColor = color === Player.One ? Player.Two : Player.One

  const next = direction.getNext(i, j)

  return (
    !!next &&
    getStatus(board, next.row, next.col) === oppositeColor &&
    lineContainsColor(board, i, j, color, direction)
  )
}

function lineContainsColor(board: GameBoard, i: Row, j: Col, color: CellOwner, direction: typeof _directions[number]) : boolean {
  const next = direction.getNext(i, j)

  if (!next || getStatus(board, next.row, next.col) === Player.None) {
    return false
  }

  if (getStatus(board, next.row, next.col) === color) {
    return true
  }

  return lineContainsColor(board, next.row, next.col, color, direction)
}

export function getScore(board: GameBoard) : Score {
  return {
    player1: board.count(item => item === Player.One),
    player2: board.count(item => item === Player.Two)
  }
}

export function getStatus(board: GameBoard, i: Row, j: Col) : CellOwner {
  return board.get(i * 8 + j)
}

export function setCell(board: GameBoard, i: Row, j: Col, color: CellOwner) : GameBoard {
  return board.set(i * 8 + j, color)
}

// prettier-ignore
export const newGameBoard : GameBoard = List([
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 2, 1, 0, 0, 0,
  0, 0, 0, 1, 2, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0
])
