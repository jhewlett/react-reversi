import * as Board from '../domain/board'
import isEndOfGame from '../domain/isEndOfGame'
import { Stack } from 'immutable'
import { MakeMoveAction, CheckOverlayHintAction, GameAction } from './game.actions'
import { PlayerType, GameBoard, PlayerHint, GameBoardHistory, Player } from '../domain/types'

export type GameState = {
  currentPlayer: PlayerType
  board: GameBoard
  boardHistory: GameBoardHistory
  playerHint: PlayerHint | null
}

function newGame() : GameState {
  return {
    currentPlayer: Player.One,
    board: Board.newGameBoard,
    boardHistory: Stack<GameBoard>().push(Board.newGameBoard),
    playerHint: null
  }
}

function switchPlayer(state: GameState) {
  const nextPlayer = state.currentPlayer === Player.One
    ? Player.Two
    : Player.One

  return {
    ...state,
    currentPlayer: nextPlayer,
    boardHistory: state.boardHistory.push(state.board)
  }
}

function makeMove(state: GameState, action: MakeMoveAction) {
  const newBoard = Board.makeMove(
    state.board,
    action.row,
    action.col,
    state.currentPlayer
  )

  if (newBoard !== state.board) {
    const newHistory = state.boardHistory.push(newBoard)
    const score = Board.getScore(newBoard)

    if (!isEndOfGame(score.player1, score.player2)) {
      const nextPlayer = state.currentPlayer === Player.One
        ? Player.Two
        : Player.One

      return {
        ...state,
        boardHistory: newHistory,
        board: newBoard,
        currentPlayer: nextPlayer
      }
    }

    return {
      ...state,
      boardHistory: newHistory,
      board: newBoard
    }
  }

  return state
}

function checkOverlayHint(state: GameState, action: CheckOverlayHintAction) {
  if (
    Board.canMakeMove(state.board, action.row, action.col, state.currentPlayer)
  ) {
    return {
      ...state,
      playerHint: new PlayerHint({
        row: action.row,
        col: action.col,
        player: state.currentPlayer
      })
    }
  }

  return state
}

function removeHint(state: GameState) {
  if (state.playerHint === null) return state

  return {
    ...state,
    playerHint: null
  }
}

function undo(state: GameState) {
  const previousBoardHistory = state.boardHistory.pop()
  const nextPlayer = state.currentPlayer === Player.One
    ? Player.Two
    : Player.One

  return {
    ...state,
    board: previousBoardHistory.peek(),
    boardHistory: previousBoardHistory,
    currentPlayer: nextPlayer
  }
}

function reset() {
  return newGame()
}

export default function game(state = newGame(), action: GameAction) {
  switch (action.type) {
    case "SWITCH_PLAYER": return switchPlayer(state)
    case "MAKE_MOVE": return makeMove(state, action)
    case "CHECK_OVERLAY_HINT": return checkOverlayHint(state, action)
    case "REMOVE_HINT": return removeHint(state)
    case "UNDO": return undo(state)
    case "RESET": return reset()
    default: return state
  }
}
