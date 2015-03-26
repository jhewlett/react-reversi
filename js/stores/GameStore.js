var Reflux = require('reflux');
var Player = require('../lib/Player');
var Board = require('../lib/Board');
var GameActions = require('../actions/GameActions');
var merge = require('object-assign');
var isEndOfGame = require('../lib/isEndOfGame');

var newGame = function() {
   return {
      currentPlayer: Player.One,
      player1Score: 2,
      player2Score: 2,
      board: Board.newGameBoard,
      playerHint: []
   };
};

module.exports = Reflux.createStore({
   listenables: [GameActions],
   init() {
      this.state = newGame();
   },
   getInitialState() {
      return this.state;
   },
   onSwitchPlayer() {
      var nextPlayer = this.state.currentPlayer === Player.One ? Player.Two : Player.One;

      this.update({
         currentPlayer: nextPlayer
      });
   },
   onMakeMove(row, col) {
      var newBoard = Board.makeMove(this.state.board, row, col, this.state.currentPlayer);

      if (newBoard !== this.state.board) {
         this.update({
            player1Score: Board.getScoreForPlayer(newBoard, Player.One),
            player2Score: Board.getScoreForPlayer(newBoard, Player.Two),
            board: newBoard
         });

         if (!isEndOfGame(this.state.player1Score, this.state.player2Score)) {
            GameActions.switchPlayer();
         }
      }
   },
   onCheckOverlayHint(row, col) {
      if (Board.canMakeMove(this.state.board, row, col, this.state.currentPlayer)) {
         this.update({
            playerHint: [row, col]
         });
      }
   },
   onRemoveHint(row, col) {
      this.update({
         playerHint: []
      });
   },
   onReset() {
      this.update(newGame());
   },
   update(newState) {
      this.state = merge(this.state, newState);
      this.trigger(this.state);
   }
});
