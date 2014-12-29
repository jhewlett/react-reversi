var React = require('React');
var Board = require('./Board');
var PlayerInfo = require('./PlayerInfo');
var WinnerMessage = require('./WinnerMessage');
var Game = require('../Game');

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
        var buttonContainer = {
            textAlign: 'center',
            marginTop: 30
        };

        var resetButtonStyle = {
            width: 100,
            height: 40,
            cursor: 'pointer'
        };

        var passButtonStyle = {
            width: 100,
            height: 40,
            cursor: this.state.winnerMessage === ''
                ? 'pointer'
                : 'default'
        };

        var passButton = this.state.winnerMessage === ''
            ? <button style={passButtonStyle} onClick={this.handlePassClicked}>Pass</button>
            : <button style={passButtonStyle} disabled>Pass</button>

        return <div>
            <PlayerInfo currentPlayer={this.state.currentPlayer} player1Score={this.state.player1Score} player2Score={this.state.player2Score} />
            <WinnerMessage message={this.state.winnerMessage} />
            <Board currentPlayer={this.state.currentPlayer} board={this.state.board} onCellClicked={this.handleCellClicked} />
            <div style={buttonContainer}>
                {passButton}
                <button style={resetButtonStyle} onClick={this.handleResetClicked}>Reset</button>
            </div>
        </div>;
    }
});