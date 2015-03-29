var List = require('immutable').List;

var directions = require('./Direction');
var Player = require('./Player');

var _directions = directions();

var makeMove = function(board, i, j, color) {
   if (getStatus(board, i, j) === Player.None) {
      _directions.forEach((direction) => {
         if (surroundsOppositePlayer(board, i, j, color, direction)) {
            board = colorCapturedCells(board, i, j, color, direction);
         }
      });
   }

   return board;
};

var colorCapturedCells = function(board, i, j, color, direction) {
   board = setCell(board, i, j, color);

   var next = direction.getNext(i, j);

   while (next !== false && getStatus(board, next.row, next.col) !== color) {
      board = setCell(board, next.row, next.col, color);
      next = direction.getNext(next.row, next.col);
   }

   return board;
};

var canMakeMove = function(board, i, j, color) {
   if (getStatus(board, i, j) === Player.None) {
      for (var d = 0; d < _directions.length; d++) {
         if (surroundsOppositePlayer(board, i, j, color, _directions[d])) {
            return true;
         }
      }
   }

   return false;
};

var surroundsOppositePlayer = function(board, i, j, color, direction) {
   var oppositeColor = color === Player.One ? Player.Two : Player.One;

   var next = direction.getNext(i, j);

   return next !== false && getStatus(board, next.row, next.col) === oppositeColor && lineContainsColor(board, i, j, color, direction)
};

var lineContainsColor = function(board, i, j, color, direction) {
   var next = direction.getNext(i, j);

   if (next === false || getStatus(board, next.row, next.col) === Player.None) {
      return false;
   }

   if (getStatus(board, next.row, next.col) === color) {
      return true;
   }

   return lineContainsColor(board, next.row, next.col, color, direction);
};

var getScore = function(board) {
   return {
      player1: board.count(item => item === Player.One),
      player2: board.count(item => item === Player.Two)
   };
};

var getStatus = function(board, i, j) {
   return board.get(i * 8 + j);
};

var setCell = function(board, i, j, color) {
   return board.set(i * 8 + j, color);
};

var newGameBoard = List(
   [0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 2, 1, 0, 0, 0,
    0, 0, 0, 1, 2, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0
]);

module.exports = {
   getStatus: getStatus,
   canMakeMove: canMakeMove,
   makeMove: makeMove,
   setCell: setCell,
   getScore: getScore,
   newGameBoard: newGameBoard
};
