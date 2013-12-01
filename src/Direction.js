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

    return {
        getNext: getNext
    };
};