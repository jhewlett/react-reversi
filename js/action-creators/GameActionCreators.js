import { SWITCH_PLAYER, MAKE_MOVE, CHECK_OVERLAY_HINT, REMOVE_HINT, UNDO, RESET } from '../actions/GameActions';

export function switchPlayer() {
   return {
      type: SWITCH_PLAYER
   }
}

export function makeMove(row, col) {
   return {
      type: MAKE_MOVE,
      payload: {
         row,
         col
      }
   }
}

export function checkOverlayHint(row, col) {
   return {
      type: CHECK_OVERLAY_HINT,
      payload: {
         row,
         col
      }
   }
}

export function removeHint(row, col) {
   return {
      type: REMOVE_HINT,
      payload: {
         row,
         col
      }
   }
}

export function undo() {
   return {
      type: UNDO
   }
}

export function reset() {
   return {
      type: RESET
   }
}
