import * as React from 'react'
import { useDispatch } from 'react-redux'

import Button from './Button'
import isEndOfGame from '../../domain/isEndOfGame'
import { GameBoardHistory, Score } from '../../domain/types'
import { switchPlayer, undo, reset } from '../game.actions'

const styles = {
  textAlign: 'center',
  marginTop: 30
} as const

type ButtonGroupProps = {
  score: Score
  boardHistory: GameBoardHistory
}

export default function ButtonGroup(props: ButtonGroupProps) {
  const gameOver = isEndOfGame(props.score.player1, props.score.player2)    //todo: make this a selector?
  const hasMoves = props.boardHistory.size > 1

  const dispatch = useDispatch()

  return (
    <div style={styles}>
      <Button action={() => dispatch(switchPlayer())} disabled={gameOver}>
        Pass
      </Button>
      <Button action={() => dispatch(undo())} disabled={!hasMoves || gameOver}>
        Undo
      </Button>
      <Button action={() => dispatch(reset())} disabled={!hasMoves}>
        Reset
      </Button>
    </div>
  )
}
