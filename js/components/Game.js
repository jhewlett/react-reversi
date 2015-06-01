import React from 'react';
import Board from './Board';
import PlayerInfo from './PlayerInfo';
import WinnerMessage from './WinnerMessage';
import ButtonGroup from './ButtonGroup';
import Player from '../lib/Player';
import { getScore } from '../lib/Board';

import connectToStore from '../stores/connectToStore';

import { Stack, Map, List } from 'immutable';

const Game = React.createClass({
   propTypes: {
      boardHistory: React.PropTypes.instanceOf(Stack).isRequired,
      playerHint: React.PropTypes.instanceOf(Map).isRequired,
      board: React.PropTypes.instanceOf(List).isRequired,
      currentPlayer: React.PropTypes.number.isRequired
   },
   shouldComponentUpdate(nextProps, nextState) {
      return this.props.boardHistory !== nextProps.boardHistory
         || this.props.playerHint !== nextProps.playerHint;
   },
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
});

export default connectToStore(Game);
