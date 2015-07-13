import React from 'react';
import Board from './Board';
import PlayerInfo from './PlayerInfo';
import WinnerMessage from './WinnerMessage';
import ButtonGroup from './ButtonGroup';
import Player from '../lib/Player';
import { getScore } from '../lib/Board';
import { Stack, Map, List } from 'immutable';
import createConnector from '../stores/connectToStore';
import redux from '../redux';

const { connect, connectToStore } = createConnector(redux)

@connectToStore('game')
export default class Game {
   // static propTypes = {
   //    boardHistory: React.PropTypes.instanceOf(Stack).isRequired,
   //    playerHint: React.PropTypes.instanceOf(Map).isRequired,
   //    board: React.PropTypes.instanceOf(List).isRequired,
   //    currentPlayer: React.PropTypes.number.isRequired
   // }
   render() {
      const score = getScore(this.props.game.board);

      return (
         <div>
            <PlayerInfo currentPlayer={this.props.game.currentPlayer} score={score} />
            <WinnerMessage score={score} />
            <Board board={this.props.game.board} playerHint={this.props.game.playerHint} />
            <ButtonGroup score={score} boardHistory={this.props.game.boardHistory} />
         </div>
      );
   }
}
