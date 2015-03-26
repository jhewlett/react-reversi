var Reflux = require('reflux');
var Player = require('../lib/Player');
var Board = require('../lib/Board');
var GameActions = require('../actions/GameActions');
var merge = require('object-assign');
var isEndOfGame = require('../lib/isEndOfGame');
var Stack = require('immutable').Stack;

var newGame = function() {
   return {
      currentPlayer: Player.One,
      board: Board.newGameBoard,
      boardHistory: Stack().push(Board.newGameBoard),
      playerHint: []
   };
};

module.exports = Reflux.createStore({
   listenables: [GameActions],
   init: function() {
      this.state = newGame();
   },
   getState: function() {
      return this.state;
   },
   onSwitchPlayer: function() {
      var nextPlayer = this.state.currentPlayer === Player.One ? Player.Two : Player.One;

      this.update({
         currentPlayer: nextPlayer
      });
   },
   onMakeMove: function(row, col) {
      var newBoard = Board.makeMove(this.state.board, row, col, this.state.currentPlayer);

      if (newBoard !== this.state.board) {
         this.update({
            boardHistory: this.state.boardHistory.push(newBoard),
            board: newBoard
         });

         const player1Score = Board.getScoreForPlayer(this.state.board, Player.One);
         const player2Score = Board.getScoreForPlayer(this.state.board, Player.Two);

         if (!isEndOfGame(player1Score, player2Score)) {
            this.onSwitchPlayer();
         }
      }
   },
   onCheckOverlayHint: function(row, col) {
      if (Board.canMakeMove(this.state.board, row, col, this.state.currentPlayer)) {
         this.update({
            playerHint: [row, col]
         });
      }
   },
   onRemoveHint: function(row, col) {
      this.update({
         playerHint: []
      });
   },
   onUndo: function() {
      var newBoardHistory = this.state.boardHistory.pop();
      var previousBoard = newBoardHistory.peek();

      this.update({
         board: newBoardHistory.peek(),
         boardHistory: newBoardHistory,
      });

      this.onSwitchPlayer();
   },
   onReset: function() {
      this.update(newGame());
   },
   update: function(newState) {
      this.state = merge(this.state, newState);
      this.trigger(this.state);
   }
});
