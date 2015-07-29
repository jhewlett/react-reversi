import React from 'react';

import Board from './Board';
import PlayerInfo from './PlayerInfo';
import WinnerMessage from './WinnerMessage';
import ButtonGroup from './ButtonGroup';
import Player from '../lib/Player';
import { Stack, Map, List } from 'immutable';

export default class Game {
   static propTypes = {
      boardHistory: React.PropTypes.instanceOf(Stack).isRequired,
      playerHint: React.PropTypes.instanceOf(Map).isRequired,
      board: React.PropTypes.instanceOf(List).isRequired,
      currentPlayer: React.PropTypes.number.isRequired,
      score: React.PropTypes.shape({
         player1: React.PropTypes.number.isRequired,
         player2: React.PropTypes.number.isRequired
      }).isRequired
   }
   render() {
      return (
         <div>
            <PlayerInfo currentPlayer={this.props.currentPlayer} score={this.props.score} />
            <WinnerMessage score={this.props.score} />
            <Board board={this.props.board} playerHint={this.props.playerHint} />
            <ButtonGroup score={this.props.score} boardHistory={this.props.boardHistory} />
         </div>
      );
   }
}
