import React from 'react';
import Cell from './Cell';
import Board from '../lib/Board.js';
import { List, Map } from 'immutable';

export default class Row {
   static propTypes = {
      row: React.PropTypes.number.isRequired,
      board: React.PropTypes.instanceOf(List),
      playerHint: React.PropTypes.instanceOf(Map),
      actions: React.PropTypes.object.isRequired
   }
   render() {
      return (
         <tr>
            {[0,1,2,3,4,5,6,7].map(c =>
               <Cell actions={this.props.actions} row={this.props.row} col={c} owner={Board.getStatus(this.props.board, this.props.row, c)} playerHint={this.props.playerHint} key={c} />
            )}
         </tr>
      );
   }
}
