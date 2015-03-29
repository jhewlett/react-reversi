var Board = require('../js/lib/Board');
var newGameBoard = Board.newGameBoard;
var GameStore = require('../js/stores/GameStore');
var Player = require('../js/lib/Player');

describe('GameStore', function() {
   describe('when making a move', function() {
      beforeEach(function() {
         GameStore.onReset();
         GameStore.onMakeMove(2, 3);
      });

      it('should have new game state', function() {
         var state = GameStore.getState();

         expect(state.currentPlayer).toEqual(Player.Two);
         expect(Board.getScoreForPlayer(state.board, Player.One)).toEqual(4);
         expect(Board.getScoreForPlayer(state.board, Player.Two)).toEqual(1);
         expect(state.boardHistory.size).toEqual(2);
      });
   });

   describe('when undoing a move', function() {
      beforeEach(function() {
         GameStore.onReset();
         GameStore.onMakeMove(2, 3);
         GameStore.onUndo();
      });

      it('should have original game state', function() {
         var state = GameStore.getState();

         expect(state.currentPlayer).toEqual(Player.One);
         expect(Board.getScoreForPlayer(state.board, Player.One)).toEqual(2);
         expect(Board.getScoreForPlayer(state.board, Player.Two)).toEqual(2);
         expect(state.board).toEqual(newGameBoard);
         expect(state.boardHistory.size).toEqual(1);
      });
   });

   describe('when undoing a pass', function() {
      beforeEach(function() {
         GameStore.onReset();
         GameStore.onSwitchPlayer();
         GameStore.onUndo();
      });

      it('should have original game state', function() {
         var state = GameStore.getState();

         expect(state.currentPlayer).toEqual(Player.One);
         expect(Board.getScoreForPlayer(state.board, Player.One)).toEqual(2);
         expect(Board.getScoreForPlayer(state.board, Player.Two)).toEqual(2);
         expect(state.board).toEqual(newGameBoard);
         expect(state.boardHistory.size).toEqual(1);
      });
   });
});
