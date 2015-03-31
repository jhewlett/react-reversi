import React from 'react';
import Button from './Button';

import GameActions from '../actions/GameActions';
import isEndOfGame from '../lib/isEndOfGame';

export default React.createClass({
   render() {
      const gameOver = isEndOfGame(this.props.score.player1, this.props.score.player2);
      const hasMoves = this.props.boardHistory.size > 1;
      const styles = {
         textAlign: 'center',
         marginTop: 30
      };

      return (
         <div style={styles}>
            <Button action={GameActions.switchPlayer} disabled={gameOver}>Pass</Button>
            <Button action={GameActions.undo} disabled={!hasMoves || gameOver}>Undo</Button>
            <Button action={GameActions.reset} disabled={!hasMoves}>Reset</Button>
         </div>
      );
   }
});
