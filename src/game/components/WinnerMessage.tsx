import * as React from 'react'
import { Score } from '../../domain/types'

const styles = {
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: 19,
  height: 22
} as const

type Props = {
  score: Score
}

const WinnerMessage = (props: Props) => (
  <p style={styles}>{getWinnerMessage(props.score)}</p>
)

export default WinnerMessage

function getWinnerMessage(score: Score) {
  if (score.player1 === 0) {
    return 'Player 2 wins!'
  } else if (score.player2 === 0) {
    return 'Player 1 wins!'
  } else if (score.player1 + score.player2 === 64) {
    if (score.player1 === score.player2) {
      return 'Tie!'
    } else if (score.player1 > score.player2) {
      return 'Player 1 wins!'
    } else {
      return 'Player 2 wins!'
    }
  }

  return ''
}
