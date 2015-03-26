var React = require('react');
var Board = require('./Board');
var PlayerInfo = require('./PlayerInfo');
var WinnerMessage = require('./WinnerMessage');
var PassButton = require('./PassButton');

var extend = require('object-assign');
var buttonStyle = require('../styles/button');

var GameActions = require('../actions/GameActions');
var GameStore = require('../stores/GameStore');

var _ = require('lodash');

var Reflux = require('reflux');

var isEndOfGame = require('../lib/isEndOfGame');

module.exports = React.createClass({
   getInitialState() {
      return GameStore.getInitialState();
   },
   componentDidMount() {
      this.unsubscribe = GameStore.listen(this.onStateChange);
   },
   componentWillUnmount() {
      this.unsubscribe();
   },
   onStateChange(state) {
      this.setState(state);
   },
   shouldComponentUpdate(nextProps, nextState) {
      return this.state.board !== nextState.board
         || this.state.currentPlayer !== nextState.currentPlayer
         || !_.isEqual(this.state.playerHint, nextState.playerHint);
   },
   render() {
      const styles = buildStyles();

      return (
         <div>
            <PlayerInfo currentPlayer={this.state.currentPlayer} player1Score={this.state.player1Score} player2Score={this.state.player2Score} />
            <WinnerMessage player1Score={this.state.player1Score} player2Score={this.state.player2Score} />
            <Board currentPlayer={this.state.currentPlayer} board={this.state.board} playerHint={this.state.playerHint} />
            <div style={styles.buttonContainer}>
               <PassButton gameOver={isEndOfGame(this.state.player1Score, this.state.player2Score)} />
               <button style={styles.reset} onClick={GameActions.reset}>Reset</button>
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
