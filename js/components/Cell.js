import React from 'react';
import Player from '../lib/Player';
import cellStyle from '../styles/cell';
import extend from 'object-assign';

import { List, Map } from 'immutable';

import fluce from '../fluce';

export default React.createClass({
   propTypes: {
      row: React.PropTypes.number.isRequired,
      col: React.PropTypes.number.isRequired,
      owner: React.PropTypes.number.isRequired,
      playerHint: React.PropTypes.instanceOf(Map).isRequired
   },
   handleClick() {
      fluce.actions.makeMove({row: this.props.row, col: this.props.col});
   },
   handleMouseOver() {
      fluce.actions.checkOverlayHint({row: this.props.row, col: this.props.col});
   },
   handleMouseOut() {
      fluce.actions.removeHint({row: this.props.row, col: this.props.col});
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
