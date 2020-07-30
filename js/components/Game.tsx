import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../actions/gameActions'
import Board from './Board'
import PlayerInfo from './PlayerInfo'
import WinnerMessage from './WinnerMessage'
import ButtonGroup from './ButtonGroup'
import { getGame, PlayerType, GameBoard, GameBoardHistory, PlayerHint, Score, Row, Col } from '../reducers/game'

type GameProps = {
  boardHistory: GameBoardHistory
  playerHint: PlayerHint | null
  board: GameBoard
  currentPlayer: PlayerType
  actions: {
    switchPlayer: () => {},
    undo: () => {},
    reset: () => {}
    makeMove: (row: Row, col: Col) => {},
    checkOverlayHint: (row: Row, col: Col) => {},
    removeHint: () => {}
  }
  score: Score
}

class Game extends React.Component<GameProps> {
  render() {
    return (
      <div>
        <PlayerInfo
          currentPlayer={this.props.currentPlayer}
          score={this.props.score}
        />
        <WinnerMessage score={this.props.score} />
        <Board
          actions={this.props.actions}
          board={this.props.board}
          playerHint={this.props.playerHint}
        />
        <ButtonGroup
          actions={this.props.actions}
          score={this.props.score}
          boardHistory={this.props.boardHistory}
        />
      </div>
    )
  }
}

export default connect(getGame, dispatch => ({
  actions: bindActionCreators(actions, dispatch)
}))(Game)
