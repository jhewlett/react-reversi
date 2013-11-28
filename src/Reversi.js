var Game = Game || {};

Game.BLACK = "Black";
Game.WHITE = "White";
Game.EMPTY = "Empty";

Game.Reversi = function() {

    var _board = [];

    for (var i = 0; i < 8; i++) {
        _board[i] = new Array(8);

        for (var j = 0; j < 8; j++) {
            _board[i][j] = Game.EMPTY;
        }
    }

    _board[3][3] = Game.WHITE;
    _board[4][4] = Game.WHITE;

    _board[3][4] = Game.BLACK;
    _board[4][3] = Game.BLACK;

    var toggle = function(i, j, status) {
        if (_board[i][j] == Game.EMPTY && bordersOtherCells(i, j, status)) {
            _board[i][j] = status;

            // find everything in between
        }
    };

    var bordersOtherCells = function(i, j, newStatus) {
        var above = i == 0 ? Game.EMPTY : _board[i - 1][j];
        var left = j == 0 ? Game.EMPTY : _board[i][j - 1];
        var right = j == 7 ? Game.EMPTY : _board[i][j + 1];
        var below = i == 7 ? Game.EMPTY : _board[i + 1][j];

        var oppositeStatus = newStatus == Game.BLACK ? Game.WHITE : Game.BLACK;

        return above === oppositeStatus || left === oppositeStatus || right === oppositeStatus || below === oppositeStatus;
    };

    var getStatus = function(i, j) {
        return _board[i][j];
    };

    return {
        toggle: toggle,
        getStatus: getStatus
    };
};