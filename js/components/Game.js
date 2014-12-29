'use strict';

var React = require('React');
var Board = require('./Board');
var PlayerInfo = require('./PlayerInfo');
var WinnerMessage = require('./WinnerMessage');
var Game = require('../lib/Game');

module.exports = React.createClass({
    getInitialState: function() {
        return Game.getState()
    },
    componentDidMount: function() {
        Game.addChangeListener(this.handleGameChange);
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
        var gameOver = this.state.winnerMessage !== '';

        var styles = buildStyles(gameOver);

        var passButton = gameOver
            ? <button style={styles.pass} disabled>Pass</button>
            : <button style={styles.pass} onClick={this.handlePassClicked}>Pass</button>;

        return (
            <div>
                <PlayerInfo currentPlayer={this.state.currentPlayer} player1Score={this.state.player1Score} player2Score={this.state.player2Score} />
                <WinnerMessage message={this.state.winnerMessage} />
                <Board currentPlayer={this.state.currentPlayer} board={this.state.board} onCellClicked={this.handleCellClicked} />
                <div style={styles.buttonContainer}>
                    {passButton}
                    <button style={styles.reset} onClick={this.handleResetClicked}>Reset</button>
                </div>
            </div>
        );
    }
});

function buildStyles(gameOver) {
    return {
        buttonContainer: {
            textAlign: 'center',
            marginTop: 30
        },
        reset: {
            width: 100,
            height: 40,
            cursor: 'pointer'
        },
        pass: {
            width: 100,
            height: 40,
            cursor: gameOver ? 'default' : 'pointer'
        }
    };
}