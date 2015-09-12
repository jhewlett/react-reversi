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

function Game(props) {
  const score = getScore(props.board);

  return (
    <div>
      <PlayerInfo currentPlayer={props.currentPlayer} score={score} />
      <WinnerMessage score={score} />
      <Board board={props.board} playerHint={props.playerHint} />
      <ButtonGroup score={score} boardHistory={props.boardHistory} />
    </div>
  );
}

Game.propTypes = {
  boardHistory: React.PropTypes.instanceOf(Stack).isRequired,
  playerHint: React.PropTypes.instanceOf(Map).isRequired,
  board: React.PropTypes.instanceOf(List).isRequired,
  currentPlayer: React.PropTypes.number.isRequired
}

export default connect(state => state.game)(Game)
