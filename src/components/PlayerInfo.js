var React = require('React');

module.exports = React.createClass({
    render: function() {
        var player1Style = {
            fontWeight: this.props.currentPlayer === 1 ? 'bold' : 'normal',
            width: '120',
            fontSize: '24'
        };

        var player2Style = {
            fontWeight: this.props.currentPlayer === 2 ? 'bold' : 'normal',
            width: '120',
            fontSize: '24'
        };

        return <table id="player-table">
            <tr>
                <td style={player1Style}>Player 1</td>
                <td id="player1-score" className="player1">{this.props.player1Score}</td>
            </tr>
            <tr>
                <td style={player2Style}>Player 2</td>
                <td id="player2-score" className="player2">{this.props.player2Score}</td>
            </tr>
        </table>;
    }
});
