import Player from '../lib/Player';
import Board from '../lib/Board';
import isEndOfGame from '../lib/isEndOfGame';
import { Stack, Map } from 'immutable';
import { SWITCH_PLAYER, MAKE_MOVE, CHECK_OVERLAY_HINT, REMOVE_HINT, UNDO, RESET } from '../constants/ActionTypes';
import Dispatcher from '../Dispatcher'

const subject = new Rx.ReplaySubject(1)

let _state = newGame()

function newGame() {
   return {
      currentPlayer: Player.One,
      board: Board.newGameBoard,
      boardHistory: Stack().push(Board.newGameBoard),
      playerHint: Map()
   };
}

subject.onNext(_state)

function switchPlayer() {
   const nextPlayer = _state.currentPlayer === Player.One
      ? Player.Two
      : Player.One;

   _state = {
      ..._state,
      currentPlayer: nextPlayer,
      boardHistory: _state.boardHistory.push(_state.board)
   };
   subject.onNext(_state)
}

function makeMove(action) {
   const newBoard = Board.makeMove(_state.board, action.row, action.col, _state.currentPlayer);

   if (newBoard !== _state.board) {
      const newHistory = _state.boardHistory.push(newBoard)
      const score = Board.getScore(newBoard);

      if (!isEndOfGame(score.player1, score.player2)) {
         const nextPlayer = _state.currentPlayer === Player.One
            ? Player.Two
            : Player.One;

         _state = {
            ..._state,
            boardHistory: newHistory,
            board: newBoard,
            currentPlayer: nextPlayer
         };
         subject.onNext(_state)
      }

      _state = {
         ..._state,
         boardHistory: newHistory,
         board: newBoard
      };
      subject.onNext(_state)
   }
}

function checkOverlayHint(action) {
   if (Board.canMakeMove(_state.board, action.row, action.col, _state.currentPlayer)) {
      _state = {
         ..._state,
         playerHint: Map({ row: action.row, col: action.col, player: _state.currentPlayer})
      };
      subject.onNext(_state)
   }
}

function removeHint() {
   if (!_state.playerHint.equals(Map())) {
     _state = {
        ..._state,
        playerHint: Map()
     };
     subject.onNext(_state)
  }
}

function undo() {
   const previousBoardHistory = _state.boardHistory.pop();
   const nextPlayer = _state.currentPlayer === Player.One
      ? Player.Two
      : Player.One;

   _state = {
      ..._state,
      board: previousBoardHistory.peek(),
      boardHistory: previousBoardHistory,
      currentPlayer: nextPlayer
   };
   subject.onNext(_state)
}

function reset() {
   _state = newGame();
   subject.onNext(_state)
}

Dispatcher.subscribe(action => {
  const handlers = {
     [SWITCH_PLAYER]: switchPlayer,
     [MAKE_MOVE]: makeMove,
     [CHECK_OVERLAY_HINT]: checkOverlayHint,
     [REMOVE_HINT]: removeHint,
     [UNDO]: undo,
     [RESET]: reset
  };

  if (handlers[action.type])
    handlers[action.type](action)
})

export default subject
