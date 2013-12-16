var Reversi = Reversi || {};

Reversi.Board = function() {
    var _board = [];

    var _directions = [
        new Reversi.Direction(1, 0),
        new Reversi.Direction(0, 1),
        new Reversi.Direction(-1, 0),
        new Reversi.Direction(0, -1),
        new Reversi.Direction(-1, -1),
        new Reversi.Direction(1, 1),
        new Reversi.Direction(-1, 1),
        new Reversi.Direction(1, -1)
    ];

    setupBoard();

    function setupBoard() {
        for (var i = 0; i < 8; i++) {
            _board[i] = new Array(8);

            for (var j = 0; j < 8; j++) {
                _board[i][j] = Reversi.Player.None;
            }
        }

        _board[3][4] = Reversi.Player.One;
        _board[4][3] = Reversi.Player.One;

        _board[3][3] = Reversi.Player.Two;
        _board[4][4] = Reversi.Player.Two;
    }

    var makeMove = function(i, j, color) {
        var success = false;

        if (_board[i][j] === Reversi.Player.None) {
            for (var d = 0; d < _directions.length; d++) {
                if (surroundsOppositePlayer(i, j, color, _directions[d])) {
                    colorCapturedCells(i, j, color, _directions[d]);

                    success = true;
                }
            }
        }

        return success;
    };

    var colorCapturedCells = function(i, j, color, direction) {
        setCell(i, j, color);

        var next = direction.getNext(i, j);

        while (next !== false && _board[next.row][next.col] !== color) {
            setCell(next.row, next.col, color);
            next = direction.getNext(next.row, next.col);
        }
    };

    var canMakeMove = function(i, j, color) {
        if (_board[i][j] === Reversi.Player.None) {
            for (var d = 0; d < _directions.length; d++) {
                if (surroundsOppositePlayer(i, j, color, _directions[d])) {
                    return true;
                }
            }
        }

        return false;
    };

    var surroundsOppositePlayer = function(i, j, color, direction) {
        var oppositeColor = color === Reversi.Player.One
            ? Reversi.Player.Two
            : Reversi.Player.One;

        var next = direction.getNext(i, j);

        return next !== false && _board[next.row][next.col] === oppositeColor && lineContainsColor(i, j, color, direction)
    };

    var lineContainsColor = function(i, j, color, direction) {
        var next = direction.getNext(i, j);

        if (next === false || _board[next.row][next.col] === Reversi.Player.None) {
            return false;
        }

        if (_board[next.row][next.col] === color) {
            return true;
        }

        return lineContainsColor(next.row, next.col, color, direction);
    };

    var getStatus = function(i, j) {
        return _board[i][j];
    };

    var setCell =  function (i, j, color) {
        _board[i][j] = color;
        radio('cellChanged').broadcast(i, j, color);
    };

    return {
        getStatus: getStatus,
        canMakeMove: canMakeMove,
        makeMove: makeMove,
        setCell: setCell
    };
};