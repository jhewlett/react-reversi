import React from 'react'
import Cell from './Cell'
import * as Board from '../lib/Board.js'
import { List, Map } from 'immutable'

const range = [0, 1, 2, 3, 4, 5, 6, 7]

const Row = props => (
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

Row.propTypes = {
  row: React.PropTypes.number.isRequired,
  board: React.PropTypes.instanceOf(List).isRequired,
  playerHint: React.PropTypes.instanceOf(Map).isRequired,
  actions: React.PropTypes.object.isRequired
}
