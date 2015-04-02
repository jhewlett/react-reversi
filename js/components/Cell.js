import React from 'react';
import Player from '../lib/Player';
import cellStyle from '../styles/cell';
import extend from 'object-assign';

import GameActions from '../actions/GameActions';

import { List } from 'immutable';

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
      const styles = buildStyles(this.props.owner, this.props.playerHint, this.props.row, this.props.col);

      return <td style={styles} onClick={this.handleClick} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}></td>;
   }
});

function buildStyles(owner, playerHint, row, col) {
   const isHint = playerHint.get('row') === row && playerHint.get('col') === col;

   let cellAppearance;
   let opacity;

   if (owner !== Player.None) {
      cellAppearance = owner;
      opacity = 1;
   } else if (isHint) {
      cellAppearance = playerHint.get('player');
      opacity = 0.6;
   } else {
      cellAppearance = Player.None;
      opacity = 1;
   }

   return extend({
      border: '1px solid black',
      opacity
   }, cellStyle(cellAppearance));
}
