var Reversi = Reversi || {};

Reversi.Game = function() {
    var _currentPlayer = Reversi.Cell.Player1;
    var _board = new Reversi.Board();

    var makeMove = function(i, j) {
        var result = _board.makeMove(i, j, _currentPlayer);

        if (result) {
            radio('endOfTurn').broadcast();

            var gameEnded = checkEndOfGame();

            if (!gameEnded) {
                switchPlayer();
            }
        }
    };

    var switchPlayer = function () {
        _currentPlayer = _currentPlayer === Reversi.Cell.Player1
            ? Reversi.Cell.Player2
            : Reversi.Cell.Player1;

        radio('switchedPlayers').broadcast();
    };

    var getScore = function() {
        var score = {
            Player1: getScoreForPlayer(Reversi.Cell.Player1),
            Player2: getScoreForPlayer(Reversi.Cell.Player2)
        };

        return score;
    };

    var getScoreForPlayer = function(player) {
        var score = 0;

        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if (_board.getStatus(i, j) === player) {
                    score += 1;
                }
            }
        }

        return score;
    };

    var checkEndOfGame = function() {
        var score = getScore();

        var message = "";

        if (score.Player1 === 0) {
            message = "Player 2 wins!";
        } else if (score.Player2 === 0) {
            message = "Player 1 wins!";
        } else if (score.Player1 + score.Player2 === 64) {
            if (score.Player1 === score.Player2) {
                message = "Tie!";
            } else if (score.Player1 > score.Player2) {
                message = "Player 1 wins!";
            } else {
                message = "Player 2 wins!";
            }
        } else {
            return false;
        }

        radio('endOfGame').broadcast(message);

        return true;
    };

    var getStatus = function(i, j) {
        return _board.getStatus(i, j);
    };

    var canMakeMove = function(i, j) {
        return _board.canMakeMove(i, j, _currentPlayer);
    };

    var getCurrentPlayer = function() {
        return _currentPlayer;
    };

    var reset = function() {
        _board = new Reversi.Board();
        _currentPlayer = Reversi.Cell.Player1;
    };

    return {
        getCurrentPlayer: getCurrentPlayer,
        makeMove: makeMove,
        switchPlayer: switchPlayer,
        getStatus: getStatus,
        getScore: getScore,
        canMakeMove: canMakeMove,
        reset: reset
    };
};