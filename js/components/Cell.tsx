import * as React from 'react'
import cellStyle from '../styles/cell'
import { Row, PlayerHint, Col, Player, CellOwner } from '../domain-types'

type CellProps = {
  row: Row
  col: Col
  owner: 0 | 1 | 2
  playerHint: PlayerHint | null
  actions: {
    makeMove: (row: Row, col: Col) => {},
    checkOverlayHint: (row: Row, col: Col) => {},
    removeHint: () => {}
   }
}

export default function Cell(props: CellProps) {
  const styles = buildStyles(
    props.owner,
    props.playerHint,
    props.row,
    props.col
  )

  return (
    <td
      style={styles}
      onClick={() => props.actions.makeMove(props.row, props.col)}
      onMouseOver={() => props.actions.checkOverlayHint(props.row, props.col)}
      onMouseOut={() => props.actions.removeHint()}
    />
  )
}

function buildStyles(owner: CellOwner, playerHint: PlayerHint | null, row: Row, col: Col) {
  const isHint = playerHint && playerHint.get('row') === row && playerHint.get('col') === col

  let cellAppearance
  let opacity

  if (owner !== Player.None) {
    cellAppearance = owner
    opacity = 1
  } else if (isHint) {
    cellAppearance = playerHint!.get('player')  //todo: better
    opacity = 0.6
  } else {
    cellAppearance = Player.None
    opacity = 1
  }

  return {
    border: '1px solid black',
    opacity,
    ...cellStyle(cellAppearance)
  }
}
