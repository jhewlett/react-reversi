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

    var toggle = function(i, j, color) {
        if (_board[i][j] == Game.EMPTY) {
            var oppositeColor = color == Game.BLACK
                ? Game.WHITE
                : Game.BLACK;

            if (canPlayAbove(i, j, color, oppositeColor)) {
                for (var p = i; p >= 0 && _board[p][j] !== color; p--) {
                    _board[p][j] = color;
                }
            }
            if (canPlayLeft(i, j, color, oppositeColor)) {
                for (var p = j; p >= 0 && _board[i][p] !== color; p--) {
                    _board[i][p] = color;
                }
            }
            if (canPlayRight(i, j, color, oppositeColor)) {
                for (var p = j; p < 8 && _board[i][p] !== color; p++) {
                    _board[i][p] = color;
                }
            }
            if (canPlayBelow(i, j, color, oppositeColor)) {
                for (var p = i; p < 8 && _board[p][j] !== color; p++) {
                    _board[p][j] = color;
                }
            }
        }
    };

    var canPlayAbove = function(i, j, color, oppositeColor) {
        var above = i == 0 ? Game.EMPTY : _board[i - 1][j];

        return above === oppositeColor && columnContainsColor(i, 0, i - 1, color);
    };

    var canPlayBelow = function(i, j, color, oppositeColor) {
        var below = i == 7 ? Game.EMPTY : _board[i + 1][j];

        return below === oppositeColor && columnContainsColor(j, i + 1, 7, color);
    };

    var canPlayLeft = function(i, j, color, oppositeColor) {
        var left = j == 0 ? Game.EMPTY : _board[i][j - 1];

        return left === oppositeColor && rowContainsColor(i, 0, j - 1, color);
    };

    var canPlayRight = function(i ,j, color, oppositeColor) {
        var right = j == 7 ? Game.EMPTY : _board[i][j + 1];

        return right === oppositeColor && rowContainsColor(i, j + 1, 7, color);
    }

    var columnContainsColor = function(j, a, b, color) {
        for (var p = a; p <= b; p++) {
            if (_board[p][j] === color) {
                return true;
            }
        }

        return false;
    };

    var rowContainsColor = function(i, a, b, color) {
        for (var p = a; p <= b; p++) {
            if (_board[i][p] === color) {
                return true;
            }
        }

        return false;
    };

    var getStatus = function(i, j) {
        return _board[i][j];
    };

    return {
        toggle: toggle,
        getStatus: getStatus
    };
};