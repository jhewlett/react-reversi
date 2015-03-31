import React from 'react';
import Player from '../lib/Player';
import cellStyle from '../styles/cell';
import extend from 'object-assign';

import GameActions from '../actions/GameActions';

export default React.createClass({
   handleClick() {
      GameActions.makeMove(this.props.row, this.props.col);
   },
   handleMouseOver() {
      GameActions.checkOverlayHint(this.props.row, this.props.col);
   },
   handleMouseOut() {
      GameActions.removeHint(this.props.row, this.props.col);
   },
   render() {
      const styles = buildStyles(this.props.owner, this.props.playerHint, this.props.row, this.props.col, this.props.currentPlayer);

      return <td style = {styles} onClick={this.handleClick} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}></td>;
   }
});

function buildStyles(owner, playerHint, row, col, currentPlayer) {
   const isHint = playerHint[0] === row && playerHint[1] === col;

   let cellAppearance;

   if (owner !== Player.None) {
      cellAppearance = owner;
   } else if (isHint) {
      cellAppearance = currentPlayer;
   } else {
      cellAppearance = Player.None;
   }

   return extend({
      border: '1px solid black',
      opacity: isHint ? 0.6 : 1
   }, cellStyle(cellAppearance));
}
