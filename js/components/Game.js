import React from 'react';
import Board from './Board';
import PlayerInfo from './PlayerInfo';
import WinnerMessage from './WinnerMessage';
import ButtonGroup from './ButtonGroup';
import Player from '../lib/Player';
import { getScore } from '../lib/Board';
import { Stack, Map, List } from 'immutable';
import { connect } from 'redux/react';
import { bindActionCreators } from 'redux';
import * as gameActions from '../actions/gameActions';

@connect(state => ({
      boardHistory: state.game.boardHistory,
      playerHint: state.game.playerHint,
      board: state.game.board,
      currentPlayer: state.game.currentPlayer
}))
export default class Game {
   static propTypes = {
      boardHistory: React.PropTypes.instanceOf(Stack).isRequired,
      playerHint: React.PropTypes.instanceOf(Map).isRequired,
      board: React.PropTypes.instanceOf(List).isRequired,
      currentPlayer: React.PropTypes.number.isRequired
   }
   render() {
      const score = getScore(this.props.board);
      const actions = bindActionCreators(gameActions, this.props.dispatch);

      return (
         <div>
            <PlayerInfo currentPlayer={this.props.currentPlayer} score={score} />
            <WinnerMessage score={score} />
            <Board actions={actions} board={this.props.board} playerHint={this.props.playerHint} />
            <ButtonGroup actions={actions} score={score} boardHistory={this.props.boardHistory} />
         </div>
      );
   }
}
