import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import * as actions from '../actions/gameActions'
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
    <Board actions={props.actions} board={props.board} playerHint={props.playerHint} />
    <ButtonGroup actions={props.actions} score={props.score} boardHistory={props.boardHistory} />
  </div>
);

Game.propTypes = {
  boardHistory: React.PropTypes.instanceOf(Stack).isRequired,
  playerHint: React.PropTypes.instanceOf(Map).isRequired,
  board: React.PropTypes.instanceOf(List).isRequired,
  currentPlayer: React.PropTypes.number.isRequired,
  actions: React.PropTypes.object.isRequired
};

export default connect(getGame, (dispatch) => ({ actions: bindActionCreators(actions, dispatch) }))(Game)
