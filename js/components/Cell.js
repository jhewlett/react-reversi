import React from 'react';
import Player from '../lib/Player';
import cellStyle from '../styles/cell';
import extend from 'object-assign';

import GameActions from '../actions/GameActions';

export default React.createClass({
   getInitialState() {
      return {
         playerHint: Player.None
      };
   },
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
   let cellAppearance;
   let hint;

   if (owner !== Player.None) {
      cellAppearance = owner;
      hint = false;
   } else if (playerHint[0] === row && playerHint[1] === col) {
      cellAppearance = currentPlayer;
      hint = true;
   } else {
      cellAppearance = Player.None;
   }

   return extend({
      border: '1px solid black',
      opacity: hint ? 0.6 : 1
   }, cellStyle(cellAppearance));
}
