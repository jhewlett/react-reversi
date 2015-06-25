import Player from '../lib/Player';
import Board from '../lib/Board';
import isEndOfGame from '../lib/isEndOfGame';
import { Stack, Map } from 'immutable';
import merge from '../util/merge';
import { SWITCH_PLAYER, MAKE_MOVE, CHECK_OVERLAY_HINT, REMOVE_HINT, UNDO, RESET } from '../constants/ActionTypes';

function newGame() {
   return {
      currentPlayer: Player.One,
      board: Board.newGameBoard,
      boardHistory: Stack().push(Board.newGameBoard),
      playerHint: Map()
   };
};

export default function gameStore(state = newGame(), action) {
   switch(action.type) {
      case SWITCH_PLAYER:
         const nextPlayer = state.currentPlayer === Player.One
            ? Player.Two
            : Player.One;

         return merge(state, {
            currentPlayer: nextPlayer,
            boardHistory: state.boardHistory.push(state.board)
         });
      case MAKE_MOVE:
         const newBoard = Board.makeMove(state.board, action.row, action.col, state.currentPlayer);

         if (newBoard !== state.board) {
            const newHistory = state.boardHistory.push(newBoard)
            const score = Board.getScore(newBoard);

            if (!isEndOfGame(score.player1, score.player2)) {
               let nextPlayer = state.currentPlayer === Player.One
                  ? Player.Two
                  : Player.One;

               return merge(state, {
                  boardHistory: newHistory,
                  board: newBoard,
                  currentPlayer: nextPlayer
               });
            }

            return merge(state, {
               boardHistory: newHistory,
               board: newBoard
            });
         }

         return state;
      case CHECK_OVERLAY_HINT:
         if (Board.canMakeMove(state.board, action.row, action.col, state.currentPlayer)) {
            return merge(state, {
               playerHint: Map({ row: action.row, col: action.col, player: state.currentPlayer})
            });
         }

         return state;
      case REMOVE_HINT:
         if (state.playerHint.equals(Map())) return state;

         return merge(state, {
            playerHint: Map()
         });
      case UNDO:
         const previousBoardHistory = state.boardHistory.pop();
         const nextPlayer2 = state.currentPlayer === Player.One
            ? Player.Two
            : Player.One;

         return merge(state, {
            board: previousBoardHistory.peek(),
            boardHistory: previousBoardHistory,
            currentPlayer: nextPlayer2
         });
      case RESET:
         return newGame();
      default:
         return state;
   }
}
