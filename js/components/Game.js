var React = require('react');
var Reflux = require('reflux');
var Board = require('./Board');
var PlayerInfo = require('./PlayerInfo');
var WinnerMessage = require('./WinnerMessage');
var ButtonGroup = require('./ButtonGroup');
var Player = require('../lib/Player');

var getScore = require('../lib/Board').getScore;

var GameActions = require('../actions/GameActions');
var GameStore = require('../stores/GameStore');

var _ = require('lodash');

module.exports = React.createClass({
   getInitialState() {
      return GameStore.getState();
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
      const score = getScore(this.state.board);

      return (
         <div>
            <PlayerInfo currentPlayer={this.state.currentPlayer} score={score} />
            <WinnerMessage score={score} />
            <Board currentPlayer={this.state.currentPlayer} board={this.state.board} playerHint={this.state.playerHint} />
            <ButtonGroup score={score} boardHistory={this.state.boardHistory} />
         </div>
      );
   }
});
