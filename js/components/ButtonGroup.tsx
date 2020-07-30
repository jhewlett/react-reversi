import * as React from 'react'
import Button from './Button'
import isEndOfGame from '../lib/isEndOfGame'
import { GameBoardHistory, Score } from '../reducers/game'

const styles = {
  textAlign: 'center',
  marginTop: 30
} as const

type ButtonGroupProps = {
  score: Score,
  boardHistory: GameBoardHistory,
  actions: {
    switchPlayer: () => { } //todo: better?
    undo: () => { }
    reset: () => { }
  }
}

export default function ButtonGroup(props: ButtonGroupProps) {
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
