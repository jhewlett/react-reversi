'use strict';

var React = require('React');
var Board = require('./Board');
var PlayerInfo = require('./PlayerInfo');
var WinnerMessage = require('./WinnerMessage');
var PassButton = require('./PassButton');

var extend = require('object-assign');
var buttonStyle = require('../styles/button');

var Game = require('../lib/Game');

module.exports = React.createClass({
    getInitialState: function() {
        return Game.getState()
    },
    componentDidMount: function() {
        Game.addChangeListener(this.handleGameChange);
    },
    componentWillUnmount: function() {
        Game.removeChangeListener(this.handleGameChange());
    },
    handleGameChange: function() {
        this.setState(Game.getState());
    },
    handleCellClicked: function(row, col) {
        Game.makeMove(row, col);
    },
    handlePassClicked: function() {
        Game.switchPlayer();
    },
    handleResetClicked: function() {
        Game.reset();
    },
    render: function() {
        var styles = buildStyles();

        return (
            <div>
                <PlayerInfo currentPlayer={this.state.currentPlayer} player1Score={this.state.player1Score} player2Score={this.state.player2Score} />
                <WinnerMessage message={this.state.winnerMessage} />
                <Board currentPlayer={this.state.currentPlayer} board={this.state.board} onCellClicked={this.handleCellClicked} />
                <div style={styles.buttonContainer}>
                    <PassButton gameOver={this.state.winnerMessage !== ''} onPassClicked={this.handlePassClicked} />
                    <button style={styles.reset} onClick={this.handleResetClicked}>Reset</button>
                </div>
            </div>
        );
    }
});

function buildStyles() {
    return {
        buttonContainer: {
            textAlign: 'center',
            marginTop: 30
        },
        reset: extend({
            cursor: 'pointer'
        }, buttonStyle)
    };
}