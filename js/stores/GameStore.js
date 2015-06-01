import Player from '../lib/Player';
import Board from '../lib/Board';
import isEndOfGame from '../lib/isEndOfGame';
import { Stack, Map } from 'immutable';
import { EventEmitter } from 'events';
import merge from '../util/merge';

function newGame() {
   return {
      currentPlayer: Player.One,
      board: Board.newGameBoard,
      boardHistory: Stack().push(Board.newGameBoard),
      playerHint: Map()
   };
};

const GameStore = {
   initial() {
      return newGame();
   },
   reducers: {
      switchPlayer(state, payload) {
         const nextPlayer = state.currentPlayer === Player.One
            ? Player.Two
            : Player.One;

         return merge(state, {
            currentPlayer: nextPlayer,
            boardHistory: state.boardHistory.push(state.board)
         });
      },
      makeMove(state, {row, col}) {
         const newBoard = Board.makeMove(state.board, row, col, state.currentPlayer);

         if (newBoard !== state.board) {
            const newHistory = state.boardHistory.push(newBoard)
            const score = Board.getScore(newBoard);

            if (!isEndOfGame(score.player1, score.player2)) {
               const nextPlayer = state.currentPlayer === Player.One
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
      },
      checkOverlayHint(state, {row, col}) {
         if (Board.canMakeMove(state.board, row, col, state.currentPlayer)) {
            return merge(state, {
               playerHint: Map({ row, col, player: state.currentPlayer})
            });
         }

         return state;
      },
      removeHint(state, {row, col}) {
         if (state.playerHint.equals(Map())) return state;

         return merge(state, {
            playerHint: Map()
         });
      },
      undo(state, payload) {
         const previousBoardHistory = state.boardHistory.pop();
         const nextPlayer = state.currentPlayer === Player.One
            ? Player.Two
            : Player.One;

         return merge(state, {
            board: previousBoardHistory.peek(),
            boardHistory: previousBoardHistory,
            currentPlayer: nextPlayer
         });
      },
      reset(state, payload) {
         return newGame();
      }
   }
};

export default GameStore;
