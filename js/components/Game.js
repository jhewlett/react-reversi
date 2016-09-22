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

class Game extends React.Component {
  static propTypes = {
    boardHistory: React.PropTypes.instanceOf(Stack).isRequired,
    playerHint: React.PropTypes.instanceOf(Map).isRequired,
    board: React.PropTypes.instanceOf(List).isRequired,
    currentPlayer: React.PropTypes.number.isRequired,
    actions: React.PropTypes.object.isRequired
  }; 

  render() {
    return (
      <div>
        <PlayerInfo currentPlayer={this.props.currentPlayer} score={this.props.score} />
        <WinnerMessage score={this.props.score} />
        <Board actions={this.props.actions} board={this.props.board} playerHint={this.props.playerHint} />
        <ButtonGroup actions={this.props.actions} score={this.props.score} boardHistory={this.props.boardHistory} />
      </div>
    )
  }
}

export default connect(getGame, (dispatch) => ({ actions: bindActionCreators(actions, dispatch) }))(Game)
