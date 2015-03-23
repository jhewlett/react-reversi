var React = require('react');
var Player = require('../lib/Player');
var cellStyle = require('../styles/cell');
var extend = require('object-assign');

var GameActions = require('../actions/GameActions');

module.exports = React.createClass({
    getInitialState() {
        return { playerHint: Player.None };
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

        return <td style={styles} onClick={this.handleClick} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}></td>;
    }
});

function buildStyles(owner, playerHint, row, col, currentPlayer) {
    let cellAppearance;
    if (owner !== Player.None) {
        cellAppearance = owner;
    } else if (playerHint[0] === row && playerHint[1] === col) {
        cellAppearance = currentPlayer;
    } else {
        cellAppearance = Player.None;
    }

    return extend({
        border: '1px solid black'
    }, cellStyle(cellAppearance));
}
