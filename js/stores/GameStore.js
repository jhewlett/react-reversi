var Reflux = require('reflux');
var Player = require('../lib/Player');
var Board = require('../lib/Board');
var GameActions = require('../actions/GameActions');
var newGameBoard = require('../lib/newGameBoard');
var merge = require('object-assign');

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
    board: newGameBoard,
    winnerMessage: '',
    playerHint: []
  };
};

module.exports = Reflux.createStore({
    listenables: [GameActions],
    init() {
      this.state = newGame();
    },
    getInitialState() {
        return merge(this.state, {});
    },
    onSwitchPlayer() {
        this.update({
          currentPlayer: this.state.currentPlayer === Player.One
            ? Player.Two
            : Player.One });
    },
    onMakeMove(row, col) {
      var newBoard = Board.makeMove(this.state.board, row, col, this.state.currentPlayer);

      if (newBoard !== this.state.board) {
        this.update({
            player1Score: Board.getScoreForPlayer(newBoard, Player.One),
            player2Score: Board.getScoreForPlayer(newBoard, Player.Two),
            board: newBoard
          });

           var gameEnded = checkEndOfGame(this.state.player1Score, this.state.player2Score, (newState) => this.update(newState));

           if (!gameEnded) {
               GameActions.switchPlayer();
           }
      }
    },
    onCheckOverlayHint(row, col) {
      if (Board.canMakeMove(this.state.board, row, col, this.state.currentPlayer)) {
           this.update({ playerHint: [row, col] });
       }
    },
    onRemoveHint(row, col) {
      this.update({ playerHint: [] });
    },
    onReset() {
      this.update(newGame());
    },
    update(newState) {
       this.state = merge(this.state, newState);
       this.trigger(this.state);
    }
});
