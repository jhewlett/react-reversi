import * as React from 'react'
import { useSelector } from 'react-redux'

import Board from './Board'
import PlayerInfo from './PlayerInfo'
import WinnerMessage from './WinnerMessage'
import ButtonGroup from './ButtonGroup'
import { getGame } from '../game.selectors'

const Game = () => {
  const {
    currentPlayer,
    score,
    board,
    playerHint,
    boardHistory
  } = useSelector(getGame)

  return (
    <div>
      <PlayerInfo
        currentPlayer={currentPlayer}
        score={score}
      />
      <WinnerMessage score={score} />
      <Board
        board={board}
        playerHint={playerHint}
      />
      <ButtonGroup
        score={score}
        boardHistory={boardHistory}
      />
    </div>
  )
}

export default Game
