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

Reversi.Direction.Up = function() { return new Reversi.Direction(-1, 0); };
Reversi.Direction.Down = function() { return new Reversi.Direction(1, 0); };
Reversi.Direction.Left = function() { return new Reversi.Direction(0, -1); };
Reversi.Direction.Right = function() { return new Reversi.Direction(0, 1); };
Reversi.Direction.UpLeft = function() { return new Reversi.Direction(-1, -1); };
Reversi.Direction.UpRight = function() { return new Reversi.Direction(-1, 1); };
Reversi.Direction.DownLeft = function() { return new Reversi.Direction(1, -1); };
Reversi.Direction.DownRight = function() { return new Reversi.Direction(1, 1); };

Reversi.Direction.AllDirections = function() {
    return [
        new Reversi.Direction.Up(),
        new Reversi.Direction.Down(),
        new Reversi.Direction.Left(),
        new Reversi.Direction.Right(),
        new Reversi.Direction.UpLeft(),
        new Reversi.Direction.UpRight(),
        new Reversi.Direction.DownLeft(),
        new Reversi.Direction.DownRight()
    ];
};