var Direction = function(rowIncrement, colIncrement){
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

var Up = function() { return new Direction(-1, 0); };
var Down = function() { return new Direction(1, 0); };
var Left = function() { return new Direction(0, -1); };
var Right = function() { return new Direction(0, 1); };
var UpLeft = function() { return new Direction(-1, -1); };
var UpRight = function() { return new Direction(-1, 1); };
var DownLeft = function() { return new Direction(1, -1); };
var DownRight = function() { return new Direction(1, 1); };

export default function() {
    return [
        new Up(),
        new Down(),
        new Left(),
        new Right(),
        new UpLeft(),
        new UpRight(),
        new DownLeft(),
        new DownRight()
    ];
};
