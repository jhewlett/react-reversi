import React from 'react';
import Button from './Button';
import isEndOfGame from '../lib/isEndOfGame';
import { Stack } from 'immutable';

export default class ButtonGroup {
   static propTypes = {
      score: React.PropTypes.shape({
         player1: React.PropTypes.number.isRequired,
         player2: React.PropTypes.number.isRequired
      }),
      boardHistory: React.PropTypes.instanceOf(Stack).isRequired,
      actions: React.PropTypes.shape({
         switchPlayer: React.PropTypes.func.isRequired,
         undo: React.PropTypes.func.isRequired,
         reset: React.PropTypes.func.isRequired
      })
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
            <Button action={this.props.actions.switchPlayer} disabled={gameOver}>Pass</Button>
            <Button action={this.props.actions.undo} disabled={!hasMoves || gameOver}>Undo</Button>
            <Button action={this.props.actions.reset} disabled={!hasMoves}>Reset</Button>
         </div>
      );
   }
}
