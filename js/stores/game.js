import Player from '../lib/Player';
import Board from '../lib/Board';
import isEndOfGame from '../lib/isEndOfGame';
import { Stack, Map } from 'immutable';
import { SWITCH_PLAYER, MAKE_MOVE, CHECK_OVERLAY_HINT, REMOVE_HINT, UNDO, RESET } from '../constants/ActionTypes';

function newGame() {
   return {
      currentPlayer: Player.One,
      board: Board.newGameBoard,
      boardHistory: Stack().push(Board.newGameBoard),
      playerHint: Map()
   };
}

function switchPlayer(state) {
   const nextPlayer = state.currentPlayer === Player.One
      ? Player.Two
      : Player.One;

   return {
      ...state,
      currentPlayer: nextPlayer,
      boardHistory: state.boardHistory.push(state.board)
   };
}

function makeMove(state, action) {
   const newBoard = Board.makeMove(state.board, action.row, action.col, state.currentPlayer);

   if (newBoard !== state.board) {
      const newHistory = state.boardHistory.push(newBoard)
      const score = Board.getScore(newBoard);

      if (!isEndOfGame(score.player1, score.player2)) {
         const nextPlayer = state.currentPlayer === Player.One
            ? Player.Two
            : Player.One;

         return {
            ...state,
            boardHistory: newHistory,
            board: newBoard,
            currentPlayer: nextPlayer
         };
      }

      return {
         ...state,
         boardHistory: newHistory,
         board: newBoard
      };
   }

   return state;
}

function checkOverlayHint(state, action) {
   if (Board.canMakeMove(state.board, action.row, action.col, state.currentPlayer)) {
      return {
         ...state,
         playerHint: Map({ row: action.row, col: action.col, player: state.currentPlayer})
      };
   }

   return state;
}

function removeHint(state) {
   if (state.playerHint.equals(Map())) return state;

   return {
      ...state,
      playerHint: Map()
   };
}

function undo(state) {
   const previousBoardHistory = state.boardHistory.pop();
   const nextPlayer = state.currentPlayer === Player.One
      ? Player.Two
      : Player.One;

   return {
      ...state,
      board: previousBoardHistory.peek(),
      boardHistory: previousBoardHistory,
      currentPlayer: nextPlayer
   };
}

function reset() {
   return newGame();
}

export default function gameStore(state = newGame(), action) {
   const handlers = {
      [SWITCH_PLAYER]: switchPlayer,
      [MAKE_MOVE]: makeMove,
      [CHECK_OVERLAY_HINT]: checkOverlayHint,
      [REMOVE_HINT]: removeHint,
      [UNDO]: undo,
      [RESET]: reset
   };

   return handlers[action.type]
      ? handlers[action.type](state, action)
      : state;
}
