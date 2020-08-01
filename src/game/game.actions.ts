import { Row, Col } from "../domain/types"

export type CheckOverlayHintAction = { type: 'CHECK_OVERLAY_HINT', row: Row, col: Col }
export type MakeMoveAction = | { type: 'MAKE_MOVE', row: Row, col: Col }
export type SwitchPlayerAction = { type: 'SWITCH_PLAYER' }
export type RemoveHintAction = { type: 'REMOVE_HINT' }
export type UndoAction = { type: 'UNDO' }
export type ResetAction = { type: 'RESET' }

export type GameAction =
| SwitchPlayerAction
| MakeMoveAction
| CheckOverlayHintAction
| RemoveHintAction
| UndoAction
| ResetAction

export function switchPlayer() : SwitchPlayerAction {
  return {
    type: 'SWITCH_PLAYER'
  }
}

export function makeMove(row: Row, col: Col) : MakeMoveAction {
  return {
    type: 'MAKE_MOVE',
    row,
    col
  }
}

export function checkOverlayHint(row: Row, col: Col) : CheckOverlayHintAction {
  return {
    type: 'CHECK_OVERLAY_HINT',
    row,
    col
  }
}

export function removeHint() : RemoveHintAction {
  return {
    type: 'REMOVE_HINT'
  }
}

export function undo() : UndoAction {
  return {
    type: 'UNDO'
  }
}

export function reset() : ResetAction {
  return {
    type: 'RESET'
  }
}
