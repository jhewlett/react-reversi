import * as React from 'react'
import globals from '../styles/globals'
import { PlayerType, Score } from '../reducers/game'
import cellStyle from '../styles/cell'

type PlayerInfoProps = {
  currentPlayer: PlayerType,
  score: Score
}

export default function PlayerInfo(props: PlayerInfoProps) {
  const styles = buildStyles(props.currentPlayer)

  return (
    <table style={styles.playerTable}>
      <tbody>
        <tr>
          <td style={styles.player1.label}>Player 1</td>
          <td style={styles.player1.score}>{props.score.player1}</td>
        </tr>
        <tr>
          <td style={styles.player2.label}>Player 2</td>
          <td style={styles.player2.score}>{props.score.player2}</td>
        </tr>
      </tbody>
    </table>
  )
}

function buildStyles(currentPlayer: PlayerType) {
  return {
    playerTable: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 30
    },
    player1: {
      label: {
        fontWeight: currentPlayer === 1 ? 'bold' : 'normal',
        width: 120,
        fontSize: globals.fontSize
      },
      score: {
        color: 'white',
        fontSize: globals.fontSize,
        textAlign: 'center',
        ...cellStyle(1)
      }
    },
    player2: {
      label: {
        fontWeight: currentPlayer === 2 ? 'bold' : 'normal',
        width: 120,
        fontSize: globals.fontSize
      },
      score: {
        color: 'white',
        fontSize: globals.fontSize,
        textAlign: 'center',
        ...cellStyle(2)
      }
    }
  } as const
}
