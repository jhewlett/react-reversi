var Reflux = require('reflux');
var Player = require('../lib/Player');

var Board = require('../lib/Board');

var GameActions = require('../actions/GameActions');

var merge = require('object-assign');

module.exports = Reflux.createStore({
    listenables: [GameActions],
    init() {
      this.state = this.newGame();
    },
    getInitialState() {
        return this.state;
    },
    onSwitchPlayer() {
        this.update({
          currentPlayer: this.state.currentPlayer === Player.One
            ? Player.Two
            : Player.One });
    },
    onMakeMove(row, col) {
      var result = this.state.board.makeMove(row, col, this.state.currentPlayer);

      if (result) {
          this.updateScores();

          var gameEnded = this.checkEndOfGame();

          if (!gameEnded) {
              GameActions.switchPlayer();
          }
      }
    },
    onReset() {
      this.update(this.newGame());
    },
    newGame() {
      return {
          currentPlayer: Player.One,
          player1Score: 2,
          player2Score: 2,
          board: new Board(),
          winnerMessage: ''
      };
    },
    updateScores() {
        this.update({
          player1Score: this.getScoreForPlayer(Player.One),
          player2Score: this.getScoreForPlayer(Player.Two)
        });
    },
    getScoreForPlayer(player) {
      var score = 0;

      for (var i = 0; i < 8; i++) {
          for (var j = 0; j < 8; j++) {
              if (this.state.board.getStatus(i, j) === player) {
                  score += 1;
              }
          }
      }

      return score;
    },
    checkEndOfGame() {
      if (this.state.player1Score === 0) {
          this.update({ winnerMessage: "Player 2 wins!" });
      } else if (this.state.player2Score === 0) {
          this.update({ winnerMessage: "Player 1 wins!" });
      } else if (this.state.player1Score + this.state.player2Score === 64) {
          if (this.state.player1Score === this.state.player2Score) {
              this.update({ winnerMessage: "Tie!" });
          } else if (this.state.player1Score > this.state.player2Score) {
              this.update({ winnerMessage: "Player 1 wins!" });
          } else {
              this.update({ winnerMessage: "Player 2 wins!" });
          }
      } else {
          return false;
      }

      return true;
    },
    update(newState) {
      this.state = merge(this.state, newState);
      this.trigger(this.state);
    }
});
