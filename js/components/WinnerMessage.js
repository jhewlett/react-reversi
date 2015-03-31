import React from 'react';

var getWinnerMessage = function(score) {
   if (score.player1 === 0) {
      return 'Player 2 wins!';
   } else if (score.player2 === 0) {
      return 'Player 1 wins!';
   } else if (score.player1 + score.player2 === 64) {
      if (score.player1 === score.player2) {
         return 'Tie!';
      } else if (score.player1 > score.player2) {
         return 'Player 1 wins!';
      } else {
         return 'Player 2 wins!';
      }
   }

   return '';
};

export default React.createClass({
   render() {
      const styles = {
         textAlign: 'center',
         fontWeight: 'bold',
         fontSize: 19,
         height: 22
      };

      return <p style={styles}>{getWinnerMessage(this.props.score)}</p>;
   }
});
