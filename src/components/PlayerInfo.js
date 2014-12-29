'use strict';

var React = require('React');
var Player = require('../Player');

module.exports = React.createClass({
    render: function() {
        var styles = buildStyles(this.props.currentPlayer);

        return (
            <table style={styles.playerTable}>
                <tr>
                    <td style={styles.player1.label}>Player 1</td>
                    <td style={styles.player1.score}>{this.props.player1Score}</td>
                </tr>
                <tr>
                    <td style={styles.player2.label}>Player 2</td>
                    <td style={styles.player2.score}>{this.props.player2Score}</td>
                </tr>
            </table>
        );
    }
});

function buildStyles(currentPlayer) {
    return {
        playerTable: {
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 30
        },
        player1: {
            label: {
                fontWeight: currentPlayer === Player.One ? 'bold' : 'normal',
                width: '120',
                fontSize: '24'
            },
            score: {
                backgroundImage: 'url("red.png")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                color: 'white',
                fontSize: '18pt',
                textAlign: 'center',
                width: 40,
                height: 40
            }
        },
        player2: {
            label: {
                fontWeight: currentPlayer === Player.Two ? 'bold' : 'normal',
                width: '120',
                fontSize: '24'
            },
            score: {
                backgroundImage: 'url("blue.png")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                color: 'white',
                fontSize: '18pt',
                textAlign: 'center',
                width: 40,
                height: 40
            }
        }
    };
}
