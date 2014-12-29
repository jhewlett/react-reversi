'use strict';

var React = require('React');
var Player = require('../lib/Player');

module.exports = React.createClass({
    getInitialState: function() {
        return {playerHint: Player.None};
    },
    handleClick: function() {
        this.props.onCellClicked(this.props.row, this.props.col);
    },
    handleMouseOver: function() {
        if (this.props.board.canMakeMove(this.props.row, this.props.col, this.props.currentPlayer)) {
            this.setState({playerHint: this.props.currentPlayer});
        }
    },
    handleMouseOut: function() {
        this.setState({playerHint: Player.None});
    },
    render: function() {
        var styles = buildStyles(this.props.owner, this.state.playerHint);

        return <td style={styles} onClick={this.handleClick} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}></td>;
    }
});

function buildStyles(owner, playerHint) {
    return {
        backgroundImage: getBackgroundImage(owner, playerHint),
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '40',
        height: '40',
        border: '1px solid black'
    };
}

function getBackgroundImage(owner, playerHint) {
    if (owner === Player.One || playerHint === Player.One) {
        return 'url("img/red.png")';
    } else if (owner === Player.Two || playerHint === Player.Two) {
        return 'url("img/blue.png")';
    }

    return 'none';
}