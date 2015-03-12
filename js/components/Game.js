var React = require('react');
var Board = require('./Board');
var PlayerInfo = require('./PlayerInfo');
var WinnerMessage = require('./WinnerMessage');
var PassButton = require('./PassButton');

var extend = require('object-assign');
var buttonStyle = require('../styles/button');

var Game = require('../lib/Game');

module.exports = React.createClass({
    getInitialState () {
        return Game.getState()
    },
    componentDidMount() {
        Game.addChangeListener(this.handleGameChange);
    },
    componentWillUnmount() {
        Game.removeChangeListener(this.handleGameChange());
    },
    handleGameChange() {
        this.setState(Game.getState());
    },
    handleCellClicked(row, col) {
        Game.makeMove(row, col);
    },
    handlePassClicked() {
        Game.switchPlayer();
    },
    handleResetClicked() {
        Game.reset();
    },
    render() {
        const styles = buildStyles();

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
