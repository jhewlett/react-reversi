import React from 'react';
import Row from './Row';
import { List, Map } from 'immutable';

export default class Board {
   static propTypes = {
      board: React.PropTypes.instanceOf(List).isRequired,
      playerHint: React.PropTypes.instanceOf(Map).isRequired
   }
   render() {
      const styles = {
         marginLeft: 'auto',
         marginRight: 'auto',
         backgroundColor: '#EEEEEE',
         border: '1px solid black'
      };

      return (
         <table style={styles}>
            <tbody>
               {[0,1,2,3,4,5,6,7].map(r =>
                  <Row row={r} board={this.props.board} playerHint={this.props.playerHint} key={r}/>
               )}
            </tbody>
         </table>
      );
   }
}
