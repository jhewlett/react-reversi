var Reversi = Reversi || {};

Reversi.Cell = {
    Player1: "Player 1",
    Player2: "Player 2",
    Empty: "Empty"
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

    setupBoard();

    function setupBoard() {
        for (var i = 0; i < 8; i++) {
            _board[i] = new Array(8);

            for (var j = 0; j < 8; j++) {
                _board[i][j] = Reversi.Cell.Empty;
            }
        }

        _board[3][4] = Reversi.Cell.Player1;
        _board[4][3] = Reversi.Cell.Player1;

        _board[3][3] = Reversi.Cell.Player2;
        _board[4][4] = Reversi.Cell.Player2;
    }

    var makeMove = function(i, j, color) {
        var tasks = new Reversi.TaskCollection();

        if (_board[i][j] === Reversi.Cell.Empty) {
            for (var d = 0; d < _directions.length; d++) {
                tasks.addTask(createTask(i, j, color, d));
            }

            tasks.waitAll();

            radio('endOfTurn').broadcast();
        }

        //todo: dont hardcode
        return true;
    };

    var createTask = function(i, j, color, d) {
        return function() {
            captureCells(i, j, color, d)
        }
    };

    var captureCells = function(i, j, color, d) {
        if (surroundsOppositePlayer(i, j, color, _directions[d])) {
            setCell(i, j, color);
            colorCapturedCell(i, j, color, d);
        } else {
            radio('taskFinished').broadcast();
        }
    };

//    var waitUntilFinished = function() {
//        if (!allDirectionsAreFinished()) {
//            setTimeout(waitUntilFinished, 100);
//        }
//    };

//    var allDirectionsAreFinished = function() {
//        for (var d = 0; d < _directions.length; d++) {
//            if (_directionFinished[d] !== true) {
//                return false;
//            }
//        }
//
//        return true;
//    };

    var colorCapturedCell = function(i, j, color, d) {
        var next = _directions[d].getNext(i, j);

        if (next === false || _board[next.row][next.col] === color) {
            radio('taskFinished').broadcast();

            return;
        }

        setCell(next.row, next.col, color);

        setTimeout(function() {
            colorCapturedCell(next.row, next.col, color, d);
        }, 200);
    };

    var canMakeMove = function(i, j, color) {
        if (_board[i][j] === Reversi.Cell.Empty) {
            for (var d = 0; d < _directions.length; d++) {
                if (surroundsOppositePlayer(i, j, color, _directions[d])) {
                    return true;
                }
            }
        }

        return false;
    };

    var surroundsOppositePlayer = function(i, j, color, direction) {
        var oppositeColor = color === Reversi.Cell.Player1
            ? Reversi.Cell.Player2
            : Reversi.Cell.Player1;

        var next = direction.getNext(i, j);

        return next !== false && _board[next.row][next.col] === oppositeColor && lineContainsColor(i, j, color, direction)
    };

    var lineContainsColor = function(i, j, color, direction) {
        var next = direction.getNext(i, j);

        if (next === false || _board[next.row][next.col] === Reversi.Cell.Empty) {
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