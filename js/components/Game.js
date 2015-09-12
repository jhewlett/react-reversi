import React from 'react';
import { connect } from 'react-redux';

import Board from './Board';
import PlayerInfo from './PlayerInfo';
import WinnerMessage from './WinnerMessage';
import ButtonGroup from './ButtonGroup';
import Player from '../lib/Player';
import { Stack, Map, List } from 'immutable';
import { getGame } from '../reducers/game'

const Game = (props) => (
  <div>
    <PlayerInfo currentPlayer={props.currentPlayer} score={props.score} />
    <WinnerMessage score={props.score} />
    <Board board={props.board} playerHint={props.playerHint} />
    <ButtonGroup score={props.score} boardHistory={props.boardHistory} />
  </div>
);

Game.propTypes = {
  boardHistory: React.PropTypes.instanceOf(Stack).isRequired,
  playerHint: React.PropTypes.instanceOf(Map).isRequired,
  board: React.PropTypes.instanceOf(List).isRequired,
  currentPlayer: React.PropTypes.number.isRequired
};

export default connect(getGame)(Game)
