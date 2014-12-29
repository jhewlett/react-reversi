var React = require('React');
var Player = require('../Player');

module.exports = React.createClass({
    render: function() {
        var player1Label = {
            fontWeight: this.props.currentPlayer === Player.One ? 'bold' : 'normal',
            width: '120',
            fontSize: '24'
        };

        var player1Score = {
            backgroundImage: 'url("red.png")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            color: 'white',
            fontSize: '18pt',
            textAlign: 'center',
            width: 40,
            height: 40
        };

        var player2Label = {
            fontWeight: this.props.currentPlayer === Player.Two ? 'bold' : 'normal',
            width: '120',
            fontSize: '24'
        };

        var player2Score = {
            backgroundImage: 'url("blue.png")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            color: 'white',
            fontSize: '18pt',
            textAlign: 'center',
            width: 40,
            height: 40
        };

        var playerTable = {
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 30
        };

        return <table style={playerTable}>
            <tr>
                <td style={player1Label}>Player 1</td>
                <td style={player1Score}>{this.props.player1Score}</td>
            </tr>
            <tr>
                <td style={player2Label}>Player 2</td>
                <td style={player2Score}>{this.props.player2Score}</td>
            </tr>
        </table>;
    }
});
