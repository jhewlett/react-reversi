import { List } from 'immutable';

import directions from './Direction';
import Player from './Player';

const _directions = directions();

export function makeMove(board, i, j, color) {
   if (getStatus(board, i, j) !== Player.None) return board;

   function makeMoveInAllDirections(board, directions) {
      if (!directions.length) return board;

      const head = directions[0];
      const tail = directions.slice(1);

      if (surroundsOppositePlayer(board, i, j, color, head)) {
         const boardWithMove = colorCapturedCells(board, i, j, color, head);

         return makeMoveInAllDirections(boardWithMove, tail);
      }

      return makeMoveInAllDirections(board, tail);
   }

   return makeMoveInAllDirections(board, _directions);
}

function colorCapturedCells(board, i, j, color, direction) {
   const boardWithMove = setCell(board, i, j, color);

   const next = direction.getNext(i, j);

   if (!next || getStatus(boardWithMove, next.row, next.col) === color) {
      return boardWithMove;
   }

   return colorCapturedCells(boardWithMove, next.row, next.col, color, direction);
}

export function canMakeMove(board, i, j, color) {
   return getStatus(board, i, j) === Player.None
      && _directions.some(d => surroundsOppositePlayer(board, i, j, color, d))
}

function surroundsOppositePlayer(board, i, j, color, direction) {
   const oppositeColor = color === Player.One
      ? Player.Two
      : Player.One;

   const next = direction.getNext(i, j);

   return next
      && getStatus(board, next.row, next.col) === oppositeColor
      && lineContainsColor(board, i, j, color, direction)
}

function lineContainsColor(board, i, j, color, direction) {
   const next = direction.getNext(i, j);

   if (!next || getStatus(board, next.row, next.col) === Player.None) {
      return false;
   }

   if (getStatus(board, next.row, next.col) === color) {
      return true;
   }

   return lineContainsColor(board, next.row, next.col, color, direction);
}

export function getScore(board) {
   return {
      player1: board.count(item => item === Player.One),
      player2: board.count(item => item === Player.Two)
   };
}

export function getStatus(board, i, j) {
   return board.get(i * 8 + j);
}

export function setCell(board, i, j, color) {
   return board.set(i * 8 + j, color);
}

export const newGameBoard = List(
   [0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 2, 1, 0, 0, 0,
    0, 0, 0, 1, 2, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0
]);
