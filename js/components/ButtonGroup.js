var React = require('react');
var Button = require('./Button');

var GameActions = require('../actions/GameActions');
var isEndOfGame = require('../lib/isEndOfGame');

module.exports = React.createClass({
   render() {
      const gameOver = isEndOfGame(this.props.score.player1, this.props.score.player2);
      const styles = {
         textAlign: 'center',
         marginTop: 30
      };

      return (
         <div style={styles}>
            <Button action={GameActions.switchPlayer} disabled={gameOver}>Pass</Button>
            <Button action={GameActions.undo} disabled={this.props.boardHistory.size === 1 || gameOver}>Undo</Button>
            <Button action={GameActions.reset} disabled={this.props.boardHistory.size === 1}>Reset</Button>
         </div>
      );
   }
});
