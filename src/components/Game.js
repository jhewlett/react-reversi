var React = require('React');
var ReversiBoard = require('./ReversiBoard');
var PlayerInfo = require('./PlayerInfo');
var WinnerMessage = require('./WinnerMessage');
var Game = require('../Game');

module.exports = React.createClass({
    displayName: 'Game',
    handleGameChange: function() {
        this.setState(Game.getState());
    },
    componentDidMount: function() {
        Game.addChangeListener(this.handleGameChange);
    },
    getInitialState: function() {
        return Game.getState()
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
        return <div>
            <PlayerInfo currentPlayer={this.state.currentPlayer} player1Score={this.state.player1Score} player2Score={this.state.player2Score} />
            <WinnerMessage message={this.state.winnerMessage} />
            <ReversiBoard currentPlayer={this.state.currentPlayer} board={this.state.board} onCellClicked={this.handleCellClicked} />
            <div className="button-container">
                <button id="pass-button" className="button" onClick={this.handlePassClicked}>Pass</button>
                <button id="reset-button" className="button" onClick={this.handleResetClicked}>Reset</button>
            </div>
        </div>;
    }
});