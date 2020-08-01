import * as React from 'react'

import Cell from './Cell'
import * as Board from '../../domain/board'
import { Row, PlayerHint, GameBoard, Col } from '../../domain/types'

const range = [0, 1, 2, 3, 4, 5, 6, 7] as const

type RowProps = {
  row: Row
  board: GameBoard
  playerHint: PlayerHint | null
}

const Row = (props: RowProps) => (
  <tr>
    {range.map(c => (
      <Cell
        row={props.row}
        col={c}
        owner={Board.getStatus(props.board, props.row, c)}
        playerHint={props.playerHint}
        key={c}
      />
    ))}
  </tr>
)

export default Row
