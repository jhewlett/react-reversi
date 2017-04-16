import React from 'react'

const styles = {
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: 19,
  height: 22
}

const WinnerMessage = props => (
  <p style={styles}>{getWinnerMessage(props.score)}</p>
)

export default WinnerMessage

WinnerMessage.propTypes = {
  score: React.PropTypes.shape({
    player1: React.PropTypes.number.isRequired,
    player2: React.PropTypes.number.isRequired
  }).isRequired
}

function getWinnerMessage(score) {
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
