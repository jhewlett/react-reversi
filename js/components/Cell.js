import PropTypes from 'prop-types'
import React from 'react'
import Player from '../lib/Player'
import cellStyle from '../styles/cell'
import extend from 'object-assign'
import { List, Map } from 'immutable'

export default function Cell(props) {
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

Cell.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  owner: PropTypes.number.isRequired,
  playerHint: PropTypes.instanceOf(Map).isRequired,
  actions: PropTypes.object.isRequired
}

function buildStyles(owner, playerHint, row, col) {
  const isHint = playerHint.get('row') === row && playerHint.get('col') === col

  let cellAppearance
  let opacity

  if (owner !== Player.None) {
    cellAppearance = owner
    opacity = 1
  } else if (isHint) {
    cellAppearance = playerHint.get('player')
    opacity = 0.6
  } else {
    cellAppearance = Player.None
    opacity = 1
  }

  return extend(
    {
      border: '1px solid black',
      opacity
    },
    cellStyle(cellAppearance)
  )
}
