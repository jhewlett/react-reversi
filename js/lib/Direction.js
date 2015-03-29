var direction = function(rowIncrement, colIncrement){
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

var up = function() { return direction(-1, 0); };
var down = function() { return direction(1, 0); };
var left = function() { return direction(0, -1); };
var right = function() { return direction(0, 1); };
var upLeft = function() { return direction(-1, -1); };
var upRight = function() { return direction(-1, 1); };
var downLeft = function() { return direction(1, -1); };
var downRight = function() { return direction(1, 1); };

module.exports = function() {
   return [
      up(),
      down(),
      left(),
      right(),
      upLeft(),
      upRight(),
      downLeft(),
      downRight()
   ];
};
