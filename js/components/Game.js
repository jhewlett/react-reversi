import React from 'react';
import { connect } from 'react-redux';

import Board from './Board';
import PlayerInfo from './PlayerInfo';
import WinnerMessage from './WinnerMessage';
import ButtonGroup from './ButtonGroup';
import Player from '../lib/Player';
import { getScore } from '../lib/Board';
import { Stack, Map, List } from 'immutable';
import store from '../store';

@connect(state => state.game)
export default class Game {
   static propTypes = {
      boardHistory: React.PropTypes.instanceOf(Stack).isRequired,
      playerHint: React.PropTypes.instanceOf(Map).isRequired,
      board: React.PropTypes.instanceOf(List).isRequired,
      currentPlayer: React.PropTypes.number.isRequired
   }
   render() {
      const score = getScore(this.props.board);

      return (
         <div>
            <PlayerInfo currentPlayer={this.props.currentPlayer} score={score} />
            <WinnerMessage score={score} />
            <Board board={this.props.board} playerHint={this.props.playerHint} />
            <ButtonGroup score={score} boardHistory={this.props.boardHistory} />
         </div>
      );
   }
}
