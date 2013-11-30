var Reversi = Reversi || {};

Reversi.Game = function() {
    var _currentPlayer = Reversi.Player1;
    var _board = new Reversi.Board();

    var makeMove = function(i, j) {
        var result = _board.makeMove(i, j, _currentPlayer);

        if (result) {
            switchPlayer();
        }

        return result;
    };

    var switchPlayer = function () {
        _currentPlayer = _currentPlayer === Reversi.Player1
            ? Reversi.Player2
            : Reversi.Player1;
    };

    var getScore = function(player) {
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

    var getStatus = function(i, j) {
        return _board.getStatus(i, j);
    };

    var canMakeMove = function(i, j) {
        return _board.canMakeMove(i, j, _currentPlayer);
    };

    var getCurrentPlayer = function() {
        return _currentPlayer;
    };

    return {
        getCurrentPlayer: getCurrentPlayer,
        makeMove: makeMove,
        switchPlayer: switchPlayer,
        getStatus: getStatus,
        getScore: getScore,
        canMakeMove: canMakeMove
    };
};