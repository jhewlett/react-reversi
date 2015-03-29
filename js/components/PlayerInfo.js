var React = require('react');
var Player = require('../lib/Player');
var extend = require('object-assign');
var cellStyle = require('../styles/cell');
var globals = require('../styles/globals');

module.exports = React.createClass({
   render() {
      const styles = buildStyles(this.props.currentPlayer);

      return (
         <table style={styles.playerTable}>
            <tr>
               <td style={styles.player1.label}>Player 1</td>
                  <td style={styles.player1.score}>{this.props.score.player1}</td>
               </tr>
            <tr>
               <td style={styles.player2.label}>Player 2</td>
               <td style={styles.player2.score}>{this.props.score.player2}</td>
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
            width: 120,
            fontSize: globals.fontSize
         },
         score: extend({
            color: 'white',
            fontSize: globals.fontSize,
            textAlign: 'center'
         }, cellStyle(Player.One))
      },
      player2: {
         label: {
            fontWeight: currentPlayer === Player.Two ? 'bold' : 'normal',
            width: 120,
            fontSize: globals.fontSize
         },
         score: extend({
            color: 'white',
            fontSize: globals.fontSize,
            textAlign: 'center'
         }, cellStyle(Player.Two))
      }
   };
}
