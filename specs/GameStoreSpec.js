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
         var score = Board.getScore(state.board);

         expect(state.currentPlayer).toEqual(Player.Two);
         expect(score.player1).toEqual(4);
         expect(score.player2).toEqual(1);
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
         var score = Board.getScore(state.board);

         expect(state.currentPlayer).toEqual(Player.One);
         expect(score.player1).toEqual(2);
         expect(score.player2).toEqual(2);
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
         var score = Board.getScore(state.board);

         expect(state.currentPlayer).toEqual(Player.One);
         expect(score.player1).toEqual(2);
         expect(score.player2).toEqual(2);
         expect(state.board).toEqual(newGameBoard);
         expect(state.boardHistory.size).toEqual(1);
      });
   });
});
