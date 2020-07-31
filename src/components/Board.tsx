import * as React from 'react'

import Row from './Row'
import { GameBoard, PlayerHint } from '../domain/types'

const styles = {
  marginLeft: 'auto',
  marginRight: 'auto',
  backgroundColor: '#EEEEEE',
  border: '1px solid black'
}

type BoardProps = {
  board: GameBoard
  playerHint: PlayerHint | null
}

const Board = (props: BoardProps) => (
  <table style={styles}>
    <tbody>
      {([0, 1, 2, 3, 4, 5, 6, 7] as const).map(r => (
        <Row
          row={r}
          board={props.board}
          playerHint={props.playerHint}
          key={r}
        />
      ))}
    </tbody>
  </table>
)

export default Board
