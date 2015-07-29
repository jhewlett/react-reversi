import React from 'react';
import Button from './Button';
import isEndOfGame from '../lib/isEndOfGame';
import { Stack } from 'immutable';
import * as gameActions from '../actions/gameActions';

export default class ButtonGroup {
   static propTypes = {
      score: React.PropTypes.shape({
         player1: React.PropTypes.number.isRequired,
         player2: React.PropTypes.number.isRequired
      }).isRequired,
      boardHistory: React.PropTypes.instanceOf(Stack).isRequired
   }
   render() {
      const gameOver = isEndOfGame(this.props.score.player1, this.props.score.player2);
      const hasMoves = this.props.boardHistory.size > 1;
      const styles = {
         textAlign: 'center',
         marginTop: 30
      };

      return (
         <div style={styles}>
            <Button action={gameActions.switchPlayer} disabled={gameOver}>Pass</Button>
            <Button action={gameActions.undo} disabled={!hasMoves || gameOver}>Undo</Button>
            <Button action={gameActions.reset} disabled={!hasMoves}>Reset</Button>
         </div>
      );
   }
}
