var Reflux = require('reflux');
var Player = require('../lib/Player');
var Board = require('../lib/Board');
var GameActions = require('../actions/GameActions');
var merge = require('object-assign');

var getScoreForPlayer = function(player, board) {
  var score = 0;

  for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
          if (board.getStatus(i, j) === player) {
              score += 1;
          }
      }
  }

  return score;
}

var checkEndOfGame = function(player1Score, player2Score, cb) {
  if (player1Score === 0) {
      cb({ winnerMessage: "Player 2 wins!" });
  } else if (player2Score === 0) {
      cb({ winnerMessage: "Player 1 wins!" });
  } else if (player1Score + player2Score === 64) {
      if (player1Score === player2Score) {
          cb({ winnerMessage: "Tie!" });
      } else if (player1Score > player2Score) {
          cb({ winnerMessage: "Player 1 wins!" });
      } else {
          cb({ winnerMessage: "Player 2 wins!" });
      }
  } else {
      return false;
  }

  return true;
}

var newGame = function() {
  return {
    currentPlayer: Player.One,
    player1Score: 2,
    player2Score: 2,
    board: new Board(),
    winnerMessage: ''
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
        this.update({
          currentPlayer: this.state.currentPlayer === Player.One
            ? Player.Two
            : Player.One });
    },
    onMakeMove(row, col) {
      var result = this.state.board.makeMove(row, col, this.state.currentPlayer);

      if (result) {
          this.update({
            player1Score: getScoreForPlayer(Player.One, this.state.board),
            player2Score: getScoreForPlayer(Player.Two, this.state.board)
          });

          var gameEnded = checkEndOfGame(this.state.player1Score, this.state.player2Score, (newState) => this.update(newState));

          if (!gameEnded) {
              GameActions.switchPlayer();
          }
      }
    },
    onReset() {
      this.update(newGame());
    },
    update(newState) {
      this.state = merge(this.state, newState);
      this.trigger(this.state);
    }
});
