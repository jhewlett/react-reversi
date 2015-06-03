var Board = require('../js/lib/Board');
var newGameBoard = Board.newGameBoard;
var GameStore = require('../js/stores/GameStore');
var Player = require('../js/lib/Player');

describe('GameStore', function() {
   describe('when making a move', function() {
      var state;
      beforeEach(function() {
         state = GameStore.reducers.makeMove(GameStore.initial(), {row: 2, col: 3});
      });

      it('should have new game state', function() {
         var score = Board.getScore(state.board);

         expect(state.currentPlayer).toEqual(Player.Two);
         expect(score.player1).toEqual(4);
         expect(score.player2).toEqual(1);
         expect(state.boardHistory.size).toEqual(2);
      });
   });

   describe('when undoing a move', function() {
      var state;
      beforeEach(function() {
         state = GameStore.reducers.makeMove(GameStore.initial(), {row: 2, col: 3});
         state = GameStore.reducers.undo(state);
      });

      it('should have original game state', function() {
         var score = Board.getScore(state.board);

         expect(state.currentPlayer).toEqual(Player.One);
         expect(score.player1).toEqual(2);
         expect(score.player2).toEqual(2);
         expect(state.board).toEqual(newGameBoard);
         expect(state.boardHistory.size).toEqual(1);
      });
   });

   describe('when undoing a pass', function() {
      var state;
      beforeEach(function() {
         state = GameStore.reducers.switchPlayer(GameStore.initial());
         state = GameStore.reducers.undo(state);
      });

      it('should have original game state', function() {
         var score = Board.getScore(state.board);

         expect(state.currentPlayer).toEqual(Player.One);
         expect(score.player1).toEqual(2);
         expect(score.player2).toEqual(2);
         expect(state.board).toEqual(newGameBoard);
         expect(state.boardHistory.size).toEqual(1);
      });
   });
});
