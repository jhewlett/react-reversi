import {
  SWITCH_PLAYER,
  MAKE_MOVE,
  CHECK_OVERLAY_HINT,
  REMOVE_HINT,
  UNDO,
  RESET
} from '../constants/ActionTypes'

export function switchPlayer() {
  return {
    type: SWITCH_PLAYER
  }
}

export function makeMove(row, col) {
  return {
    type: MAKE_MOVE,
    row,
    col
  }
}

export function checkOverlayHint(row, col) {
  return {
    type: CHECK_OVERLAY_HINT,
    row,
    col
  }
}

export function removeHint() {
  return {
    type: REMOVE_HINT
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
