var React = require('react');
var extend = require('object-assign');
var buttonStyle = require('../styles/button');

var GameActions = require('../actions/GameActions');

module.exports = React.createClass({
   render() {
      const styles = extend({
         cursor: this.props.gameOver ? 'default' : 'pointer'
      }, buttonStyle);

      const passButton = this.props.boardHistory.size > 1
         ? <button style={styles} onClick={GameActions.undo}>Undo</button>
         : <button style={styles} disabled>Undo</button>;

      return passButton;
   }
});
