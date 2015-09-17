import React from 'react';
import Row from './Row';
import { List, Map } from 'immutable';

const styles = {
   marginLeft: 'auto',
   marginRight: 'auto',
   backgroundColor: '#EEEEEE',
   border: '1px solid black'
};

const Board = (props) => (
  <table style={styles}>
    <tbody>
      {[0,1,2,3,4,5,6,7].map(r =>
        <Row row={r} board={props.board} actions={props.actions} playerHint={props.playerHint} key={r}/>
      )}
    </tbody>
  </table>
);

export default Board;

Board.propTypes = {
   board: React.PropTypes.instanceOf(List).isRequired,
   playerHint: React.PropTypes.instanceOf(Map).isRequired,
   actions: React.PropTypes.object.isRequired
};
