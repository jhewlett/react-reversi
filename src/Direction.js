var Reversi = Reversi || {};

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