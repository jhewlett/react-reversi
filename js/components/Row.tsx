import * as React from 'react'
import Cell from './Cell'
import * as Board from '../lib/Board'
import { Row, PlayerHint, GameBoard, Col } from '../reducers/game'

const range = [0, 1, 2, 3, 4, 5, 6, 7] as const

type RowProps = {
  row: Row,
  board: GameBoard,
  playerHint: PlayerHint | null,
  actions: {
    makeMove: (row: Row, col: Col) => {},
    checkOverlayHint: (row: Row, col: Col) => {},
    removeHint: () => {}
  }
}

const Row = (props: RowProps) => (
  <tr>
    {range.map(c => (
      <Cell
        row={props.row}
        col={c}
        owner={Board.getStatus(props.board, props.row, c)}
        playerHint={props.playerHint}
        actions={props.actions}
        key={c}
      />
    ))}
  </tr>
)

export default Row
