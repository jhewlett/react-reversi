import Player from '../lib/Player';
import Board from '../lib/Board';
import merge from 'object-assign';
import isEndOfGame from '../lib/isEndOfGame';
import { Stack, Map } from 'immutable';

import { EventEmitter } from 'events';

const emitter = new EventEmitter();

let _state = newGame();

function newGame() {
   return {
      currentPlayer: Player.One,
      board: Board.newGameBoard,
      boardHistory: Stack().push(Board.newGameBoard),
      playerHint: Map()
   };
};

function getState() {
   return _state;
};

function switchPlayer() {
   const nextPlayer = _state.currentPlayer === Player.One
      ? Player.Two
      : Player.One;

   update({
      currentPlayer: nextPlayer,
      boardHistory: _state.boardHistory.push(_state.board)
   });
};

function makeMove(row, col) {
   const newBoard = Board.makeMove(_state.board, row, col, _state.currentPlayer);

   if (newBoard !== _state.board) {
      update({
         boardHistory: _state.boardHistory.push(newBoard),
         board: newBoard
      });

      const score = Board.getScore(newBoard);

      if (!isEndOfGame(score.player1, score.player2)) {
         const nextPlayer = _state.currentPlayer === Player.One
            ? Player.Two
            : Player.One;

         update({currentPlayer: nextPlayer});
      }
   }
};

function checkOverlayHint(row, col) {
   if (Board.canMakeMove(_state.board, row, col, _state.currentPlayer)) {
      update({
         playerHint: Map({ row, col, player: _state.currentPlayer})
      });
   }
};

function removeHint(row, col) {
   update({
      playerHint: Map()
   });
};

function undo() {
   const previousBoardHistory = _state.boardHistory.pop();
   const nextPlayer = _state.currentPlayer === Player.One
      ? Player.Two
      : Player.One;

   update({
      board: previousBoardHistory.peek(),
      boardHistory: previousBoardHistory,
      currentPlayer: nextPlayer
   });
};

function reset() {
   update(newGame());
};

function subscribe(callback) {
   emitter.addListener('change', callback);
};

function unsubscribe(callback) {
   emitter.removeListener(callback);
};

function update(newState) {
   _state = merge(_state, newState);

   emitter.emit('change', _state);
};

export default {
   getState,
   switchPlayer,
   makeMove,
   checkOverlayHint,
   removeHint,
   undo,
   reset,
   subscribe,
   unsubscribe
};
