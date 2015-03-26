var React = require('react');

module.exports = React.createClass({
   getWinnerMessage() {
      if (this.props.player1Score === 0) {
         return 'Player 2 wins!';
      } else if (this.props.player2Score === 0) {
         return 'Player 1 wins!';
      } else if (this.props.player1Score + this.props.player2Score === 64) {
         if (this.props.player1Score === this.props.player2Score) {
            return 'Tie!';
         } else if (this.props.player1Score > this.props.player2Score) {
            return 'Player 1 wins!';
         } else {
            return 'Player 2 wins!';
         }
      }

      return '';
   },
   render() {
      const styles = {
         textAlign: 'center',
         fontWeight: 'bold',
         fontSize: 19,
         height: 22
      };

      return <p style={styles}>{this.getWinnerMessage()}</p>;
   }
});
