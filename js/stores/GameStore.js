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
   init() {
      this.state = newGame();
   },
   getState() {
      return this.state;
   },
   onSwitchPlayer() {
      const nextPlayer = this.state.currentPlayer === Player.One
         ? Player.Two
         : Player.One;

      this.update({
         currentPlayer: nextPlayer,
         boardHistory: this.state.boardHistory.push(this.state.board)
      });
   },
   onMakeMove(row, col) {
      const newBoard = Board.makeMove(this.state.board, row, col, this.state.currentPlayer);

      if (newBoard !== this.state.board) {
         this.update({
            boardHistory: this.state.boardHistory.push(newBoard),
            board: newBoard
         });

         const score = Board.getScore(newBoard);

         if (!isEndOfGame(score.player1, score.player2)) {
            const nextPlayer = this.state.currentPlayer === Player.One
               ? Player.Two
               : Player.One;

            this.update({currentPlayer: nextPlayer});
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
   onUndo() {
      const previousBoardHistory = this.state.boardHistory.pop();
      const nextPlayer = this.state.currentPlayer === Player.One
         ? Player.Two
         : Player.One;

      this.update({
         board: previousBoardHistory.peek(),
         boardHistory: previousBoardHistory,
         currentPlayer: nextPlayer
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
