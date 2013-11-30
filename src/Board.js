var Reversi = Reversi || {};

Reversi.Player1 = "Player 1"
Reversi.Player2 = "Player 2";
Reversi.Empty = "Empty";

Reversi.Direction = function(rowIncrement, colIncrement){
    var getNext = function(i, j) {
        var nextI = i + rowIncrement;
        var nextJ = j + colIncrement;

        if (nextI < 0 || nextI > 7 || nextJ < 0 || nextJ > 7) {
            return false;
        }

        return { row: i + rowIncrement, col: j + colIncrement };
    };

    var containsColor = function(i, j, color, board) {
        var next = getNext(i, j);

        if (next === false || board[next.row][next.col] === Reversi.Empty) {
            return false;
        }

        if (board[next.row][next.col] === color) {
            return true;
        }

        return containsColor(next.row, next.col, color, board);
    };

    return {
        getNext: getNext,
        containsColor: containsColor
    };
};

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

    for (var i = 0; i < 8; i++) {
        _board[i] = new Array(8);

        for (var j = 0; j < 8; j++) {
            _board[i][j] = Reversi.Empty;
        }
    }

    _board[3][3] = Reversi.Player2;
    _board[4][4] = Reversi.Player2;

    _board[3][4] = Reversi.Player1;
    _board[4][3] = Reversi.Player1;

    var makeMove = function(i, j, color) {
        var success = false;
        if (_board[i][j] == Reversi.Empty) {
            var oppositeColor = color == Reversi.Player1
                ? Reversi.Player2
                : Reversi.Player1;

            for (var d = 0; d < _directions.length; d++) {
                var next = _directions[d].getNext(i, j);

                if (next !== false && _board[next.row][next.col] === oppositeColor && _directions[d].containsColor(i, j, color, _board)) {
                    _board[i][j] = color;
                    success = true;
                    while (next !== false && _board[next.row][next.col] !== color) {
                        _board[next.row][next.col] = color;
                        next = _directions[d].getNext(next.row, next.col);
                    }
                }
            }
        }

        return success;
    };

    var canMakeMove = function(i, j, color) {
        if (_board[i][j] === Reversi.Empty) {
            var oppositeColor = color === Reversi.Player1
                ? Reversi.Player2
                : Reversi.Player1;

            for (var d = 0; d < _directions.length; d++) {
                var next = _directions[d].getNext(i, j);

                if (next !== false && _board[next.row][next.col] === oppositeColor && _directions[d].containsColor(i, j, color, _board)) {
                    return true;
                }
            }
        }

        return false;
    };

    var getStatus = function(i, j) {
        return _board[i][j];
    };

    var set =  function (i, j, color) {
        _board[i][j] = color;
    };

    return {
        getStatus: getStatus,
        canMakeMove: canMakeMove,
        makeMove: makeMove,
        set: set //for testing
    };
};