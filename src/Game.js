var Reversi = Reversi || {};

Reversi.Game = function() {
    var _currentPlayer = Reversi.Cell.Player1;
    var _board = new Reversi.Board();

    var makeMove = function(i, j, drawCallback) {
        var result = _board.makeMove(i, j, _currentPlayer, drawCallback);

        if (result) {
            switchPlayer();
        }

        return result;
    };

    var switchPlayer = function () {
        _currentPlayer = _currentPlayer === Reversi.Cell.Player1
            ? Reversi.Cell.Player2
            : Reversi.Cell.Player1;
    };

    var getScore = function(endOfGameCallback) {
        var score = {
            Player1: getScoreForPlayer(Reversi.Cell.Player1),
            Player2: getScoreForPlayer(Reversi.Cell.Player2)
        };

        checkEndOfGame(score, endOfGameCallback);

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

    var checkEndOfGame = function(score, endOfGameCallback) {
        if (score.Player1 === 0) {
            endOfGameCallback('Player 2 wins!');
        } else if (score.Player2 === 0) {
            endOfGameCallback('Player 1 wins!');
        } else if (score.Player1 + score.Player2 === 64) {
            if (score.Player1 === score.Player2) {
                endOfGameCallback('Tie!');
            } else if (score.Player1 > score.Player2) {
                endOfGameCallback('Player 1 wins!');
            } else {
                endOfGameCallback('Player 2 wins!');
            }
        }
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