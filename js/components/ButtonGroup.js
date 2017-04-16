import React from 'react'
import Button from './Button'
import isEndOfGame from '../lib/isEndOfGame'
import { Stack } from 'immutable'

const styles = {
  textAlign: 'center',
  marginTop: 30
}

export default function ButtonGroup(props) {
  const gameOver = isEndOfGame(props.score.player1, props.score.player2)
  const hasMoves = props.boardHistory.size > 1

  return (
    <div style={styles}>
      <Button action={props.actions.switchPlayer} disabled={gameOver}>
        Pass
      </Button>
      <Button action={props.actions.undo} disabled={!hasMoves || gameOver}>
        Undo
      </Button>
      <Button action={props.actions.reset} disabled={!hasMoves}>Reset</Button>
    </div>
  )
}

ButtonGroup.propTypes = {
  score: React.PropTypes.shape({
    player1: React.PropTypes.number.isRequired,
    player2: React.PropTypes.number.isRequired
  }).isRequired,
  boardHistory: React.PropTypes.instanceOf(Stack).isRequired,
  actions: React.PropTypes.object.isRequired
}
