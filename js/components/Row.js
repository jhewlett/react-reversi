import React from 'react';
import Cell from './Cell';
import Board from '../lib/Board.js';
import { List, Map } from 'immutable';

export default function Row(props) {
  return (
    <tr>
      {[0,1,2,3,4,5,6,7].map(c =>
        <Cell row={props.row} col={c} owner={Board.getStatus(props.board, props.row, c)} playerHint={props.playerHint} key={c} />
      )}
    </tr>
  );
}

Row.propTypes = {
  row: React.PropTypes.number.isRequired,
  board: React.PropTypes.instanceOf(List).isRequired,
  playerHint: React.PropTypes.instanceOf(Map).isRequired,
}
