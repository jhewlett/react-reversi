import React from 'react';
import Reflux from 'reflux';
import Board from './Board';
import PlayerInfo from './PlayerInfo';
import WinnerMessage from './WinnerMessage';
import ButtonGroup from './ButtonGroup';
import Player from '../lib/Player';
import { getScore } from '../lib/Board';

import GameActions from '../actions/GameActions';
import GameStore from '../stores/GameStore';

import lodash from 'lodash';

export default React.createClass({
   getInitialState() {
      return GameStore.getState();
   },
   componentDidMount() {
      this.unsubscribe = GameStore.listen(this.onStateChange);
   },
   componentWillUnmount() {
      this.unsubscribe();
   },
   onStateChange(state) {
      this.setState(state);
   },
   shouldComponentUpdate(nextProps, nextState) {
      return this.state.boardHistory !== nextState.boardHistory
         || !_.isEqual(this.state.playerHint, nextState.playerHint);
   },
   render() {
      const score = getScore(this.state.board);

      return (
         <div>
            <PlayerInfo currentPlayer={this.state.currentPlayer} score={score} />
            <WinnerMessage score={score} />
            <Board currentPlayer={this.state.currentPlayer} board={this.state.board} playerHint={this.state.playerHint} />
            <ButtonGroup score={score} boardHistory={this.state.boardHistory} />
         </div>
      );
   }
});
