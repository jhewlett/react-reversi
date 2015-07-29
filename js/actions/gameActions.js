import { SWITCH_PLAYER, MAKE_MOVE, CHECK_OVERLAY_HINT, REMOVE_HINT, UNDO, RESET } from '../constants/ActionTypes';
import Dispatcher from '../Dispatcher'

export function switchPlayer() {
   Dispatcher.onNext({
      type: SWITCH_PLAYER
   });
}

export function makeMove(row, col) {
   Dispatcher.onNext({
      type: MAKE_MOVE,
      row,
      col
   });
}

export function checkOverlayHint(row, col) {
   Dispatcher.onNext({
      type: CHECK_OVERLAY_HINT,
      row,
      col
   });
}

export function removeHint() {
   Dispatcher.onNext({
      type: REMOVE_HINT
   });
}

export function undo() {
   Dispatcher.onNext({
      type: UNDO
   });
}

export function reset() {
   Dispatcher.onNext({
      type: RESET
   });
}
